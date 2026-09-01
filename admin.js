/* Navegação */
function navegarAdmin(nomeTela) {
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
  document.querySelectorAll('.aba').forEach(a => a.classList.remove('ativa'));
  document.getElementById(`tela-${nomeTela}`).classList.add('ativa');
  document.querySelector(`.aba[data-tela="${nomeTela}"]`).classList.add('ativa');

  if (nomeTela === 'visao-geral') carregarVisaoGeral();
  if (nomeTela === 'usuarios') carregarUsuarios();
  if (nomeTela === 'pacientes') carregarPacientesAdmin();
  if (nomeTela === 'consultas') carregarConsultasAdmin();
  if (nomeTela === 'pagamentos') carregarPagamentosAdmin();
  if (nomeTela === 'biblioteca') carregarBibliotecaAdmin();
}

document.querySelectorAll('.aba').forEach(aba => {
  aba.addEventListener('click', () => navegarAdmin(aba.dataset.tela));
});

/* Data */
const dias = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const agora = new Date();
document.getElementById('admin-data').textContent = `${dias[agora.getDay()]}, ${agora.getDate()} de ${meses[agora.getMonth()]} de ${agora.getFullYear()}`;

/* Botão "Ver como Doutor" */
document.getElementById('btn-ver-como-doutor').addEventListener('click', () => {
  sessionStorage.setItem('verComoDoutor', 'true');
  window.location.href = 'index.html';
});

/* Sair */
document.getElementById('btn-sair').addEventListener('click', () => {
  window.location.href = 'index.html';
});

/* Visão Geral */
async function carregarVisaoGeral() {
  const snapshotUsuarios = await db.collection('usuarios').get();
  const snapshotPacientes = await db.collection('pacientes').get();
  const snapshotConsultas = await db.collection('consultas').get();
  const snapshotPagamentos = await db.collection('pagamentos').get();
  const snapshotBiblioteca = await db.collection('biblioteca').get();

  document.getElementById('stat-admin-usuarios').textContent = snapshotUsuarios.size;
  document.getElementById('stat-admin-pacientes').textContent = snapshotPacientes.size;
  document.getElementById('stat-admin-consultas').textContent = snapshotConsultas.size;
  document.getElementById('stat-admin-pagamentos').textContent = snapshotPagamentos.size;
  document.getElementById('stat-admin-biblioteca').textContent = snapshotBiblioteca.size;
}

/* Usuários */
async function carregarUsuarios() {
  const snapshot = await db.collection('usuarios').get();
  const lista = document.getElementById('lista-admin-usuarios');

  if (snapshot.empty) {
    lista.innerHTML = '<p class="vazio">Nenhum usuário cadastrado.</p>';
    return;
  }

  lista.innerHTML = `
    <table class="admin-tabela">
      <thead>
        <tr>
          <th>Nome</th>
          <th>E-mail</th>
          <th>ID</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        ${snapshot.docs.map(doc => {
          const u = doc.data();
          return `
            <tr>
              <td>${u.nome || '—'}</td>
              <td>${u.email || '—'}</td>
              <td style="font-size:11px;color:var(--texto2)">${doc.id}</td>
              <td>
                <button class="btn-excluir-usuario btn-excluir-perfil" data-id="${doc.id}" style="font-size:12px;padding:4px 10px;">Excluir</button>
              </td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>
  `;

  document.querySelectorAll('.btn-excluir-usuario').forEach(btn => {
    btn.addEventListener('click', async () => {
      const confirmar = confirm('Excluir este usuário e todos os seus dados?');
      if (!confirmar) return;
      const uid = btn.dataset.id;
      await excluirUsuarioEDados(uid);
      carregarUsuarios();
    });
  });
}

async function excluirUsuarioEDados(uid) {
  const collections = ['pacientes', 'consultas', 'anotacoes', 'pagamentos', 'configuracoes'];
  for (const col of collections) {
    const snapshot = await db.collection(col).where('usuarioId', '==', uid).get();
    for (const doc of snapshot.docs) {
      await doc.ref.delete();
    }
  }
  await db.collection('usuarios').doc(uid).delete();
}

/* Pacientes */
async function carregarPacientesAdmin() {
  const snapshotPacientes = await db.collection('pacientes').get();
  const snapshotUsuarios = await db.collection('usuarios').get();
  const lista = document.getElementById('lista-admin-pacientes');

  const mapaUsuarios = {};
  snapshotUsuarios.docs.forEach(doc => mapaUsuarios[doc.id] = doc.data().nome);

  if (snapshotPacientes.empty) {
    lista.innerHTML = '<p class="vazio">Nenhum paciente cadastrado.</p>';
    return;
  }

  const pacientes = snapshotPacientes.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  pacientes.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));

  function renderTabela(lista, dados) {
    lista.innerHTML = dados.length === 0 ? '<p class="vazio">Nenhum resultado encontrado.</p>' : `
      <table class="admin-tabela">
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Data de nascimento</th>
            <th>Telefone</th>
            <th>Modalidade</th>
            <th>Frequência</th>
            <th>Horário</th>
            <th>Valor sessão</th>
            <th>Profissional</th>
            <th>Usuário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${dados.map(p => {
            const valorExibir = p.valorSessao ? (() => {
              const limpo = String(p.valorSessao).replace(/R\$\s?/g, '').trim().replace(/\./g, '').replace(',', '.');
              const num = parseFloat(limpo);
              return isNaN(num) ? 'NaN' : 'R$ ' + num.toFixed(2).replace('.', ',');
            })() : '—';
            return `
              <tr>
                <td>${p.nome || '—'}</td>
                <td>${p.cpf || '—'}</td>
                <td>${p.dataNascimento ? new Date(p.dataNascimento + 'T12:00:00').toLocaleDateString('pt-BR') : '—'}</td>
                <td>${p.telefone || '—'}</td>
                <td>${p.modalidade === 'online' ? 'Online' : p.modalidade === 'hibrida' ? 'Híbrida' : 'Presencial'}</td>
                <td>${p.frequencia || '—'}</td>
                <td>${p.horarioFixo || '—'}</td>
                <td style="color:${valorExibir.includes('NaN') ? 'var(--vermelho)' : 'inherit'}">${valorExibir}</td>
                <td>${p.profissional || '—'}</td>
                <td>${mapaUsuarios[p.usuarioId] || '—'}</td>
                <td style="display:flex;gap:4px;">
                  <button class="btn-excluir-paciente btn-excluir-perfil" data-id="${p.id}" style="font-size:12px;padding:4px 10px;">Excluir</button>
                </td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    `;

    lista.querySelectorAll('.btn-excluir-paciente').forEach(btn => {
      btn.addEventListener('click', async () => {
        const confirmar = confirm('Excluir este paciente e todos os seus dados?');
        if (!confirmar) return;
        const id = btn.dataset.id;
        const cols = ['consultas', 'anotacoes', 'pagamentos'];
        for (const col of cols) {
          const snap = await db.collection(col).where('pacienteId', '==', id).get();
          for (const doc of snap.docs) await doc.ref.delete();
        }
        await db.collection('pacientes').doc(id).delete();
        carregarPacientesAdmin();
      });
    });
  }

  renderTabela(lista, pacientes);

  document.getElementById('busca-admin-pacientes').addEventListener('input', (e) => {
    const filtro = e.target.value.toLowerCase();
    const filtrados = pacientes.filter(p =>
      (p.nome || '').toLowerCase().includes(filtro) ||
      (p.cpf || '').toLowerCase().includes(filtro) ||
      (p.profissional || '').toLowerCase().includes(filtro)
    );
    renderTabela(lista, filtrados);
  });
}

/* Consultas */
async function carregarConsultasAdmin() {
  const snapshotConsultas = await db.collection('consultas').get();
  const snapshotPacientes = await db.collection('pacientes').get();
  const lista = document.getElementById('lista-admin-consultas');

  const mapaPacientes = {};
  snapshotPacientes.docs.forEach(doc => mapaPacientes[doc.id] = doc.data().nome);

  if (snapshotConsultas.empty) {
    lista.innerHTML = '<p class="vazio">Nenhuma consulta registrada.</p>';
    return;
  }

  const consultas = snapshotConsultas.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  consultas.sort((a, b) => (mapaPacientes[a.pacienteId] || '').localeCompare(mapaPacientes[b.pacienteId] || '', 'pt-BR'));

  function renderTabela(lista, dados) {
    lista.innerHTML = dados.length === 0 ? '<p class="vazio">Nenhum resultado encontrado.</p>' : `
      <table class="admin-tabela">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Data</th>
            <th>Hora</th>
            <th>Duração</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${dados.map(c => `
            <tr>
              <td>${mapaPacientes[c.pacienteId] || '—'}</td>
              <td>${c.data ? new Date(c.data + 'T12:00:00').toLocaleDateString('pt-BR') : '—'}</td>
              <td>${c.hora || '—'}</td>
              <td>${c.duracao ? c.duracao + ' min' : '—'}</td>
              <td><span class="badge ${c.status}">${c.status ? c.status.charAt(0).toUpperCase() + c.status.slice(1) : '—'}</span></td>
              <td>
                <button class="btn-excluir-consulta btn-excluir-perfil" data-id="${c.id}" style="font-size:12px;padding:4px 10px;">Excluir</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    lista.querySelectorAll('.btn-excluir-consulta').forEach(btn => {
      btn.addEventListener('click', async () => {
        const confirmar = confirm('Excluir esta consulta?');
        if (!confirmar) return;
        await db.collection('consultas').doc(btn.dataset.id).delete();
        carregarConsultasAdmin();
      });
    });
  }

  renderTabela(lista, consultas);

  document.getElementById('busca-admin-consultas').addEventListener('input', (e) => {
    const filtro = e.target.value.toLowerCase();
    const filtrados = consultas.filter(c =>
      (mapaPacientes[c.pacienteId] || '').toLowerCase().includes(filtro) ||
      (c.data || '').includes(filtro) ||
      (c.status || '').toLowerCase().includes(filtro)
    );
    renderTabela(lista, filtrados);
  });
}

/* Pagamentos */
async function carregarPagamentosAdmin() {
  const snapshotPagamentos = await db.collection('pagamentos').get();
  const snapshotPacientes = await db.collection('pacientes').get();
  const lista = document.getElementById('lista-admin-pagamentos');

  const mapaPacientes = {};
  snapshotPacientes.docs.forEach(doc => mapaPacientes[doc.id] = doc.data().nome);

  if (snapshotPagamentos.empty) {
    lista.innerHTML = '<p class="vazio">Nenhum pagamento registrado.</p>';
    return;
  }

  const pagamentos = snapshotPagamentos.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  pagamentos.sort((a, b) => (mapaPacientes[a.pacienteId] || '').localeCompare(mapaPacientes[b.pacienteId] || '', 'pt-BR'));
  const nomesMeses = ['', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  function formatarValorAdmin(valor) {
    if (!valor) return '—';
    const limpo = String(valor).replace(/R\$\s?/g, '').trim().replace(/\./g, '').replace(',', '.');
    const num = parseFloat(limpo);
    if (isNaN(num)) return `<span style="color:var(--vermelho)">⚠ ${valor}</span>`;
    return `R$ ${num.toFixed(2).replace('.', ',')}`;
  }

  function renderTabela(lista, dados) {
    lista.innerHTML = dados.length === 0 ? '<p class="vazio">Nenhum resultado encontrado.</p>' : `
      <table class="admin-tabela">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>Mês</th>
            <th>Valor</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          ${dados.map(p => `
            <tr>
              <td>${mapaPacientes[p.pacienteId] || '—'}</td>
              <td>${nomesMeses[p.mes] || '—'} ${p.ano || ''}</td>
              <td>${formatarValorAdmin(p.valor)}</td>
              <td><span class="badge ${p.status}">${p.status ? p.status.charAt(0).toUpperCase() + p.status.slice(1) : '—'}</span></td>
              <td style="display:flex;gap:4px;">
                <button class="btn-editar-valor btn-primario" data-id="${p.id}" data-valor="${p.valor || ''}" style="font-size:12px;padding:4px 10px;">Editar valor</button>
                <button class="btn-excluir-pagamento btn-excluir-perfil" data-id="${p.id}" style="font-size:12px;padding:4px 10px;">Excluir</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;

    lista.querySelectorAll('.btn-editar-valor').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        const valorAtual = btn.dataset.valor;
        const novoValor = prompt('Digite o novo valor (apenas números):', valorAtual);
        if (!novoValor) return;
        const num = parseFloat(novoValor.replace(',', '.'));
        if (isNaN(num)) { alert('Valor inválido!'); return; }
        await db.collection('pagamentos').doc(id).update({ valor: String(num) });
        carregarPagamentosAdmin();
      });
    });

    lista.querySelectorAll('.btn-excluir-pagamento').forEach(btn => {
      btn.addEventListener('click', async () => {
        const confirmar = confirm('Excluir este pagamento?');
        if (!confirmar) return;
        await db.collection('pagamentos').doc(btn.dataset.id).delete();
        carregarPagamentosAdmin();
      });
    });
  }

  renderTabela(lista, pagamentos);

  document.getElementById('busca-admin-pagamentos').addEventListener('input', (e) => {
    const filtro = e.target.value.toLowerCase();
    const filtrados = pagamentos.filter(p =>
      (mapaPacientes[p.pacienteId] || '').toLowerCase().includes(filtro) ||
      (nomesMeses[p.mes] || '').toLowerCase().includes(filtro) ||
      (p.status || '').toLowerCase().includes(filtro)
    );
    renderTabela(lista, filtrados);
  });
}

/* Limpeza de dados órfãos */
async function limparDadosOrfaos() {
  const confirmar = confirm('Isso vai remover consultas, anotações e pagamentos de pacientes que não existem mais. Continuar?');
  if (!confirmar) return;

  const snapshotPacientes = await db.collection('pacientes').get();
  const idsPacientes = new Set(snapshotPacientes.docs.map(doc => doc.id));

  const cols = ['consultas', 'anotacoes', 'pagamentos'];
  let totalRemovidos = 0;

  for (const col of cols) {
    const snapshot = await db.collection(col).get();
    for (const doc of snapshot.docs) {
      const pacienteId = doc.data().pacienteId;
      if (pacienteId && !idsPacientes.has(pacienteId)) {
        await doc.ref.delete();
        totalRemovidos++;
      }
    }
  }

  alert(`Limpeza concluída! ${totalRemovidos} registro(s) órfão(s) removido(s).`);
  carregarVisaoGeral();
}

/* Corrigir valores monetários */
async function corrigirValoresMonetarios() {
  const confirmar = confirm('Isso vai corrigir todos os valores de sessão com formato incorreto. Continuar?');
  if (!confirmar) return;

  const snapshot = await db.collection('pacientes').get();
  let corrigidos = 0;

  for (const doc of snapshot.docs) {
    const valor = doc.data().valorSessao;
    if (!valor) continue;

    const limpo = String(valor).replace(/R\$\s?/g, '').trim();
    const semPontos = limpo.replace(/\./g, '').replace(',', '.');
    const num = parseFloat(semPontos);

    if (isNaN(num)) {
      await doc.ref.update({ valorSessao: '' });
      corrigidos++;
    } else if (String(valor).includes('R$') || String(valor).includes(',')) {
      await doc.ref.update({ valorSessao: String(num) });
      corrigidos++;
    }
  }

  alert(`Correção concluída! ${corrigidos} registro(s) corrigido(s).`);
  carregarVisaoGeral();
}

// Botão para limpar consultas duplicadas
async function limparConsultasDuplicadas() {
  const confirmar = confirm('Isso vai buscar e remover consultas duplicadas (mesmo paciente, data e horário). Deseja continuar?');
  if (!confirmar) return;

  const snapshot = await db.collection('consultas').get();
  const consultas = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const grupos = {};
  consultas.forEach(c => {
    const chave = `${c.pacienteId}_${c.data}_${c.hora}`;
    if (!grupos[chave]) grupos[chave] = [];
    grupos[chave].push(c);
  });

  let totalRemovidas = 0;
  for (const chave in grupos) {
    const grupo = grupos[chave];
    if (grupo.length > 1) {
      const duplicatas = grupo.slice(1);
      for (const dup of duplicatas) {
        await db.collection('consultas').doc(dup.id).delete();
        totalRemovidas++;
      }
    }
  }

  alert(`Concluído! ${totalRemovidas} consulta(s) duplicada(s) removida(s).`);
}

/* Biblioteca */
async function carregarBibliotecaAdmin() {
  const snapshot = await db.collection('biblioteca').get();
  const snapshotUsuarios = await db.collection('usuarios').get();
  const lista = document.getElementById('lista-admin-biblioteca');

  const mapaUsuarios = {};
  snapshotUsuarios.docs.forEach(doc => mapaUsuarios[doc.id] = doc.data().nome);

  if (snapshot.empty) {
    lista.innerHTML = '<p class="vazio">Nenhuma imagem na biblioteca.</p>';
    return;
  }

  const imagens = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  lista.innerHTML = `
    <table class="admin-tabela">
      <thead>
        <tr>
          <th>Miniatura</th>
          <th>Nome</th>
          <th>Usuário</th>
          <th>Data</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        ${imagens.map(img => `
          <tr>
            <td><img src="${img.thumb}" style="width:48px;height:48px;object-fit:cover;border-radius:6px;" /></td>
            <td>${img.nome || '—'}</td>
            <td>${mapaUsuarios[img.usuarioId] || '—'}</td>
            <td>${img.criadoEm ? new Date(img.criadoEm).toLocaleDateString('pt-BR') : '—'}</td>
            <td>
              <button class="btn-excluir-imagem btn-excluir-perfil" data-id="${img.id}" style="font-size:12px;padding:4px 10px;">Excluir</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  document.querySelectorAll('.btn-excluir-imagem').forEach(btn => {
    btn.addEventListener('click', async () => {
      const confirmar = confirm('Excluir esta imagem da biblioteca?');
      if (!confirmar) return;
      await db.collection('biblioteca').doc(btn.dataset.id).delete();
      carregarBibliotecaAdmin();
    });
  });
}

/* Inicialização */
carregarVisaoGeral();