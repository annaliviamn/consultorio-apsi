/* Variáveis Globais */

const telaLogin = document.getElementById('tela-login');
const app = document.getElementById('app');
const inputSenha = document.getElementById('input-senha');
const btnEntrar = document.getElementById('btn-entrar');
const erroLogin = document.getElementById('erro-login');
const btnTema = document.getElementById('btn-tema');
const btnTemaConfig = document.getElementById('btn-tema-config');
const btnFonteMenor = document.getElementById('btn-fonte-menor');
const btnFonteMaior = document.getElementById('btn-fonte-maior');
const telaBoasVindas = document.getElementById('tela-boas-vindas');
const telaCadastro = document.getElementById('tela-cadastro');
const btnIrLogin = document.getElementById('btn-ir-login');
const btnIrCadastro = document.getElementById('btn-ir-cadastro');
const linkIrCadastro = document.getElementById('link-ir-cadastro');
const linkVoltarLogin = document.getElementById('link-voltar-login');
const btnCadastrar = document.getElementById('btn-cadastrar');

let usuarioLogado = null;
let tamanhoFonte = 15;

function mostrarTela(tela) {
    telaBoasVindas.classList.add('escondido');
    telaLogin.classList.add('escondido');
    telaCadastro.classList.add('escondido');
    app.classList.add('escondido');

    tela.classList.remove('escondido');
}

btnIrLogin.addEventListener('click', () => mostrarTela(telaLogin));
btnIrCadastro.addEventListener('click', () => mostrarTela(telaCadastro));
linkIrCadastro.addEventListener('click', () => mostrarTela(telaCadastro));
linkVoltarLogin.addEventListener('click', () => mostrarTela(telaLogin));

/* Saudação e Data */

function atualizarSaudacao() {
    const agora = new Date();
    const hora = agora.getHours();
    const saudacaoTexto = document.getElementById('saudacao-texto');
    const saudacaoData = document.getElementById('saudacao-data');

    let saudacao = '';
    if (hora >= 5 && hora < 12) saudacao = 'Bom dia';
    else if (hora >= 12 && hora < 18) saudacao = 'Boa tarde';
    else saudacao = 'Boa noite';

    saudacaoTexto.textContent = `${saudacao}, ${usuarioLogado?.nome || 'Dr.'}`;

    const dias = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
    const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

    saudacaoData.textContent = `${dias[agora.getDay()]}, ${agora.getDate()} de ${meses[agora.getMonth()]} de ${agora.getFullYear()}`;
}

/* Relógio em tempo real */
function atualizarRelogio() {
  const agora = new Date();
  const horas = String(agora.getHours()).padStart(2, '0');
  const minutos = String(agora.getMinutes()).padStart(2, '0');
  const segundos = String(agora.getSeconds()).padStart(2, '0');
  document.getElementById('relogio').textContent = `${horas}:${minutos}:${segundos}`;
}

atualizarRelogio();
setInterval(atualizarRelogio, 1000);

/* Navegação Entre Abas */
function navegarPara(nomeTela) {
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
  document.querySelectorAll('.aba').forEach(a => a.classList.remove('ativa'));

  document.getElementById(`tela-${nomeTela}`).classList.add('ativa');
  document.querySelector(`.aba[data-tela="${nomeTela}"]`).classList.add('ativa');

  // Carrega os dados da tela quando navegar
  if (nomeTela === 'prontuarios') carregarPacientes();
  if (nomeTela === 'dashboard') carregarDashboard();
}

// Adiciona o clique em cada aba
document.querySelectorAll('.aba').forEach(aba => {
    aba.addEventListener('click', () => {
        navegarPara(aba.dataset.tela);
    });
});

/* Tema Claro & Escuro */
function alternarTema() {
    document.body.classList.toggle('escuro');
    const escuro = document.body.classList.contains('escuro');
    btnTema.textContent = escuro ? '☀️ Modo claro' : '🌙 Modo escuro';
    btnTemaConfig.textContent = escuro ? '☀️ Modo claro' : '🌙 Modo escuro';
    localStorage.setItem('tema', escuro ? 'escuro' : 'claro');
}

btnTema.addEventListener('click', alternarTema);
btnTemaConfig.addEventListener('click', alternarTema);

/* Tamanho da Fonte */
function aplicarFonte(tamanho) {
  const escala = tamanho / 15;
  document.getElementById('app').style.zoom = escala;
  localStorage.setItem('fonte', tamanho);
}

btnFonteMenor.addEventListener('click', () => {
    if (tamanhoFonte > 13) {
        tamanhoFonte--;
        aplicarFonte(tamanhoFonte);
    }
});

btnFonteMaior.addEventListener('click', () => {
    if (tamanhoFonte < 20) {
        tamanhoFonte++;
        aplicarFonte(tamanhoFonte);
    }
});

/* Inicialização */
function inicializar() {
    // Recupera tema salvo
    const temaSalvo = localStorage.getItem('tema');
    if (temaSalvo === 'escuro') {
        document.body.classList.add('escuro');
        btnTema.textContent = '☀️ Modo claro';
        btnTemaConfig.textContent= '☀️ Modo claro';
    }

    // Recupera fonte salva
    const fonteSalva = localStorage.getItem('fonte');
    if (fonteSalva) {
    tamanhoFonte = parseInt(fonteSalva);
    aplicarFonte(tamanhoFonte);
    }

    // Mostra a tela de boas-vindas ao abrir
    mostrarTela(telaBoasVindas);
}

// Roda tudo quando a página carregar
inicializar();

/* Cadastro */
const inputNome = document.getElementById('input-nome');
const inputEmail = document.getElementById('input-email');
const inputSenhaCadastro = document.getElementById('input-senha-cadastro');
const inputSenhaConfirma = document.getElementById('input-senha-confirma');
const erroCadastro = document.getElementById('erro-cadastro');

btnCadastrar.addEventListener('click', async () => {
    const nome = inputNome.value.trim();
    const email = inputEmail.value.trim();
    const senha = inputSenhaCadastro.value;
    const confirma = inputSenhaConfirma.value;

    if (!nome || !email || !senha || !confirma) {
        erroCadastro.textContent = 'Preencha todos os campos.';
        return;
    }

    if (senha !== confirma) {
        erroCadastro.textContent = 'As senhas não coincidem.';
        return;
    }

    if (senha.length < 6) {
        erroCadastro.textContent = 'A senha deve ter pelo menos 6 caracteres.';
        return;
    }

    try {
        const credencial = await auth.createUserWithEmailAndPassword(email, senha);
        const uid = credencial.user.uid;

        await db.collection('usuarios').doc(uid).set({ nome, email });

        inputNome.value = '';
        inputEmail.value = '';
        inputSenhaCadastro.value = '';
        inputSenhaConfirma.value = '';
        erroCadastro.textContent = '';

        mostrarTela(telaLogin);
    } catch (erro) {
        if (erro.code === 'auth/email-already-in-use') {
            erroCadastro.textContent = 'Este e-mail já está cadastrado.';
        } else {
            erroCadastro.textContent = 'Erro ao criar conta. Tente novamente.';
        }
    }
});

/* Login */
const inputSenhaLogin = document.getElementById('input-senha');
const inputEmailLogin = document.getElementById('input-email-login');

btnEntrar.addEventListener('click', async () => {
    const email = document.getElementById('input-email-login').value.trim();
    const senha = inputSenha.value.trim();

    if (!email || !senha) {
        erroLogin.textContent = 'Preencha todos os campos.';
        return;
    }

    // Credenciais admin — preencha aqui
    const ADMIN_EMAIL = 'annaliviamaciel@gmail.com';
    const ADMIN_SENHA = 'kanna0110';

    if (email === ADMIN_EMAIL && senha === ADMIN_SENHA) {
      window.location.href = 'admin.html';
      return;
    }

    try {
        const credencial = await auth.signInWithEmailAndPassword(email, senha);
        const uid = credencial.user.uid;

        const docUsuario = await db.collection('usuarios').doc(uid).get();
        usuarioLogado = { uid, ...docUsuario.data() };

        erroLogin.textContent = '';
        inputSenha.value = '';
        document.getElementById('input-email-login').value = '';

        atualizarSaudacao();
        carregarPacientes();
        carregarConfiguracoes();
        await gerarConsultasTodosPacientes();
        mostrarTela(app);
        navegarPara('dashboard');
        pedirPermissaoNotificacao();
        verificarNotificacoes();
        setInterval(verificarNotificacoes, 30 * 60 * 1000);
    } catch (erro) {
        erroLogin.textContent = 'E-mail ou senha incorretos.';
    }
});

/* Pacientes */
const btnNovoPaciente = document.getElementById('btn-novo-paciente');
const buscaPaciente = document.getElementById('busca-paciente');

async function carregarPacientes(filtro = '') {
    const listaPacientes = document.getElementById('lista-pacientes');

    const snapshot = await db.collection('pacientes')
        .where('usuarioId', '==', usuarioLogado.uid)
        .get();

    let pacientes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    if (filtro) {
        pacientes = pacientes.filter(p =>
            p.nome.toLowerCase().includes(filtro.toLowerCase())
        );
    }

    pacientes.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));

    if (pacientes.length === 0) {
        listaPacientes.innerHTML = '<p class="vazio">Nenhum paciente encontrado.</p>';
        return;
    }

    listaPacientes.innerHTML = pacientes.map(p => {
        const iniciais = p.nome.split(' ').map(n => n[0]).slice(0, 2).join('');
        return `
            <div class="paciente-card" data-id="${p.id}">
                <div class="pac-avatar" style="background:var(--acento2);color:var(--acento)">
                ${iniciais}
                </div>
                <div class="pac-info">
                <div class="pac-nome">${p.nome}</div>
                <div class="pac-detalhe">${p.telefone || 'Sem telefone'} · Desde ${p.dataInicio ? new Date(p.dataInicio + 'T12:00:00').toLocaleDateString('pt-BR') : 'não informado'}</div>
                </div>
                <button class="btn-excluir" data-id="${p.id}">✕</button>
            </div>
        `;
    }).join('');
}

// Busca em tempo real conforme digita
buscaPaciente.addEventListener('input', () => {
    carregarPacientes(buscaPaciente.value);
});

/* Modal de Paciente */
const modalPaciente = document.getElementById('modal-paciente');
const btnFecharModal = document.getElementById('btn-fechar-modal');
const btnSalvarPaciente = document.getElementById('btn-salvar-paciente');
const erroPaciente = document.getElementById('erro-paciente');

function abrirModal() {
    modalPaciente.classList.remove('escondido');
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const caixa = document.querySelector('#modal-paciente .modal-caixa');
            const corpo = document.querySelector('#modal-paciente .modal-corpo');
            if (caixa) caixa.scrollTop = 0;
            if (corpo) corpo.scrollTop = 0;
        });
    });
}

function fecharModal() {
    modalPaciente.classList.add('escondido');
    document.querySelectorAll('#modal-paciente input, #modal-paciente select, #modal-paciente textarea')
        .forEach(el => el.value = '');
    document.querySelector('#modal-paciente .modal-corpo').scrollTop = 0;
    btnSalvarPaciente.textContent = 'Salvar paciente';
    btnSalvarPaciente.dataset.modo = '';
    document.querySelector('.modal-topo h2').textContent = 'Novo paciente';
    erroPaciente.textContent = '';
}

// Abre o modal ao clicar em novo paciente
btnNovoPaciente.addEventListener('click', async () => {
    document.querySelectorAll('#modal-paciente input, #modal-paciente select, #modal-paciente textarea')
        .forEach(el => el.value = '');

    const docConfig = await db.collection('configuracoes').doc(usuarioLogado.uid).get();
    if (docConfig.exists && docConfig.data().nomeProfissional) {
        document.getElementById('pac-profissional').value = docConfig.data().nomeProfissional;
    }

    abrirModal();
});

// Fecha ao clicar no X
btnFecharModal.addEventListener('click', fecharModal);

// Fecha ao clicar no fundo escuro com confirmação
document.querySelector('.modal-fundo').addEventListener('click', () => {
    const confirmar = confirm('Tem certeza que deseja fechar? Os dados não salvos serão perdidos.');
    if (confirmar) fecharModal();
});

// Salva o paciente
btnSalvarPaciente.addEventListener('click', async () => {
    const nome = document.getElementById('pac-nome').value.trim();
    const dataNascimento = document.getElementById('pac-nascimento').value;
    const cpf = document.getElementById('pac-cpf').value.trim();
    const endereco = document.getElementById('pac-endereco').value.trim();
    const telefone = document.getElementById('pac-telefone').value.trim();
    const celular = document.getElementById('pac-celular').value.trim();
    const email = document.getElementById('pac-email').value.trim();
    const estadoCivil = document.getElementById('pac-estado-civil').value;
    const escolaridade = document.getElementById('pac-escolaridade').value;
    const ocupacao = document.getElementById('pac-ocupacao').value.trim();
    const filiacao1Parentesco = document.getElementById('pac-filiacao1-parentesco').value.trim();
    const filiacao1Nome = document.getElementById('pac-filiacao1-nome').value.trim();
    const filiacao2Parentesco = document.getElementById('pac-filiacao2-parentesco').value.trim();
    const filiacao2Nome = document.getElementById('pac-filiacao2-nome').value.trim();
    const responsavelNome = document.getElementById('pac-responsavel-nome').value.trim();
    const responsavelParentesco = document.getElementById('pac-responsavel-parentesco').value;
    const responsavelCpf = document.getElementById('pac-responsavel-cpf').value.trim();
    const responsavelTelefone = document.getElementById('pac-responsavel-telefone').value.trim();
    const responsavelCelular = document.getElementById('pac-responsavel-celular').value.trim();
    const responsavelEmail = document.getElementById('pac-responsavel-email').value.trim();
    const dataInicio = document.getElementById('pac-inicio').value.trim();
    const valorSessao = document.getElementById('pac-valor-sessao').value.trim();
    const formaPagamento = document.getElementById('pac-forma-pagamento').value;
    const profissional = document.getElementById('pac-profissional').value.trim();
    const frequencia = document.getElementById('pac-frequencia').value;
    const diaSemana = document.getElementById('pac-dia-semana').value;
    const horarioFixo = document.getElementById('pac-horario-fixo').value;
    const duracao = document.getElementById('pac-duracao').value;
    const motivo = document.getElementById('pac-motivo').value.trim();
    const observacoes = document.getElementById('pac-observacoes').value.trim();

    if (!nome) {
        erroPaciente.textContent = 'O nome do paciente é obrigatório.';
        return;
    }

    if (!frequencia || !diaSemana || !horarioFixo) {
        erroPaciente.textContent = 'Frequência, dia da semana e horário fixo são obrigatórios.';
        return;
    }

    const dadosPaciente = {
        nome, dataNascimento, cpf, endereco, telefone, celular, email,
        estadoCivil, escolaridade, ocupacao, filiacao1Parentesco, filiacao1Nome, 
        filiacao2Parentesco, filiacao2Nome,
        responsavelNome, responsavelParentesco, responsavelCpf,
        responsavelTelefone, responsavelCelular, responsavelEmail,
        dataInicio, frequencia, diaSemana, horarioFixo, duracao,
        valorSessao, formaPagamento, profissional, motivo, observacoes
    };

    if (btnSalvarPaciente.dataset.modo === 'editar') {
        await db.collection('pacientes').doc(pacienteAtual.id).update(dadosPaciente);

        btnSalvarPaciente.textContent = 'Salvar paciente';
        btnSalvarPaciente.dataset.modo = '';
        document.querySelector('.modal-topo h2').textContent = 'Novo Paciente';
        fecharModal();

        const docAtualizado = await db.collection('pacientes').doc(pacienteAtual.id).get();
        const pacienteAtualizado = { id: docAtualizado.id, ...docAtualizado.data() };
        await gerarConsultasMes(pacienteAtualizado);
        abrirPerfil(pacienteAtualizado);
        return;
    }

    const novoDoc = await db.collection('pacientes').add({
        ...dadosPaciente,
        usuarioId: usuarioLogado.uid
    });

    fecharModal();

    const docSalvo = await db.collection('pacientes').doc(novoDoc.id).get();
    const pacienteSalvo = { id: novoDoc.id, ...docSalvo.data() };
    await gerarConsultasMes(pacienteSalvo);

    const agora = new Date();
    await db.collection('pagamentos').add({
        pacienteId: novoDoc.id,
        usuarioId: usuarioLogado.uid,
        mes: agora.getMonth() + 1,
        ano: agora.getFullYear(),
        valor: valorSessao || '',
        status: 'pendente',
        dataPagamento: null
    });

    document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
    document.querySelectorAll('.aba').forEach(a => a.classList.remove('ativa'));
    document.getElementById('tela-prontuarios').classList.add('ativa');
    document.querySelector('.aba[data-tela="prontuarios"]').classList.add('ativa');
    await carregarPacientes();
    carregarCalendario();
});

// Carrega pacientes ao clicar na aba
document.querySelector('.aba[data-tela="prontuarios"]').addEventListener('click', () => {
  carregarPacientes();
});

/* Excluir Paciente */
document.getElementById('lista-pacientes').addEventListener('click', async (e) => {
    if (e.target.classList.contains('btn-excluir')) {
        const id = e.target.dataset.id;
        const confirmar = confirm('Tem certeza que deseja excluir este paciente?');
        if (confirmar) {
            await db.collection('pacientes').doc(id).delete();
            carregarPacientes();
        }
    }
});

// Cronômetro de Sessão
let cronoInterval = null;
let cronoSegundos = 0;

function iniciarCrono(duracaoMinutos) {
  clearInterval(cronoInterval);
  cronoSegundos = duracaoMinutos * 60;

  const display = document.getElementById('crono-tempo');
  const btnIniciar = document.getElementById('btn-iniciar-sessao');
  const btnPausar = document.getElementById('btn-pausar-sessao');
  const btnResetar = document.getElementById('btn-resetar-sessao');

  btnIniciar.style.display = 'none';
  btnPausar.style.display = 'inline-block';
  btnResetar.style.display = 'inline-block';
  display.classList.remove('encerrado');

  cronoInterval = setInterval(() => {
    cronoSegundos--;

    const min = String(Math.floor(cronoSegundos / 60)).padStart(2, '0');
    const seg = String(cronoSegundos % 60).padStart(2, '0');
    display.textContent = `${min}:${seg}`;

    if (cronoSegundos <= 0) {
      clearInterval(cronoInterval);
      display.textContent = '00:00';
      display.classList.add('encerrado');
      btnPausar.style.display = 'none';
      alert('Sessão encerrada!');
    }
  }, 1000);
}

let cronoPausado = false;

function pausarCrono() {
  const btnPausar = document.getElementById('btn-pausar-sessao');

  if (!cronoPausado) {
    clearInterval(cronoInterval);
    cronoPausado = true;
    btnPausar.textContent = 'Retomar';
  } else {
    cronoPausado = false;
    btnPausar.textContent = 'Pausar';

    cronoInterval = setInterval(() => {
      cronoSegundos--;
      const min = String(Math.floor(cronoSegundos / 60)).padStart(2, '0');
      const seg = String(cronoSegundos % 60).padStart(2, '0');
      document.getElementById('crono-tempo').textContent = `${min}:${seg}`;

      if (cronoSegundos <= 0) {
        clearInterval(cronoInterval);
        document.getElementById('crono-tempo').classList.add('encerrado');
        document.getElementById('btn-pausar-sessao').style.display = 'none';
        alert('Sessao encerrada!');
      }
    }, 1000);
  }
}

function resetarCrono(duracaoMinutos) {
  clearInterval(cronoInterval);
  cronoSegundos = 0;
  const display = document.getElementById('crono-tempo');
  display.textContent = `${String(duracaoMinutos).padStart(2, '0')}:00`;
  display.classList.remove('encerrado');
  document.getElementById('btn-iniciar-sessao').style.display = 'inline-block';
  document.getElementById('btn-pausar-sessao').style.display = 'none';
  document.getElementById('btn-pausar-sessao').textContent = '⏸ Pausar';
  document.getElementById('btn-resetar-sessao').style.display = 'none';
}

/* Perfil do Paciente */

let pacienteAtual = null;

function abrirPerfil(paciente) {
  pacienteAtual = paciente;

  // Avatar com iniciais
  const iniciais = paciente.nome.split(' ').map(n => n[0]).slice(0, 2).join('');
  document.getElementById('perfil-avatar').textContent = iniciais;
  document.getElementById('perfil-nome').textContent = paciente.nome;

  // Idade calculada automaticamente
  let idadeTexto = '';
  if (paciente.dataNascimento) {
    const nascimento = new Date(paciente.dataNascimento + 'T12:00:00');
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;
    idadeTexto = ` · ${idade} anos`;
  }

  document.getElementById('pf-nascimento').textContent = paciente.dataNascimento
    ? new Date(paciente.dataNascimento + 'T12:00:00').toLocaleDateString('pt-BR') + idadeTexto
    : '—';

  // Dados pessoais
  document.getElementById('pf-nascimento').textContent = paciente.dataNascimento
    ? new Date(paciente.dataNascimento + 'T12:00:00').toLocaleDateString('pt-BR') + idadeTexto
    : 'Não informado';
  document.getElementById('pf-cpf').textContent = paciente.cpf || 'Não informado';
  document.getElementById('pf-estado-civil').textContent = paciente.estadoCivil || 'Não informado';
  document.getElementById('pf-escolaridade').textContent = paciente.escolaridade || 'Não informado';
  document.getElementById('pf-ocupacao').textContent = paciente.ocupacao || 'Não informado';
  document.getElementById('pf-telefone').textContent = paciente.telefone || 'Não informado';
  document.getElementById('pf-celular').textContent = paciente.celular || 'Não informado';
  document.getElementById('pf-email').textContent = paciente.email || 'Não informado';
  document.getElementById('pf-endereco').textContent = paciente.endereco || 'Não informado';
  document.getElementById('pf-filiacao1').textContent = paciente.filiacao1Parentesco && paciente.filiacao1Nome
      ? `${paciente.filiacao1Parentesco} — ${paciente.filiacao1Nome}`
      : 'Não informado';
  document.getElementById('pf-filiacao2').textContent = paciente.filiacao2Parentesco && paciente.filiacao2Nome
      ? `${paciente.filiacao2Parentesco} — ${paciente.filiacao2Nome}`
      : 'Não informado';

  // Responsável legal
  document.getElementById('pf-responsavel-nome').textContent = paciente.responsavelNome || 'Não informado';
  document.getElementById('pf-responsavel-parentesco').textContent = paciente.responsavelParentesco || 'Não informado';
  document.getElementById('pf-responsavel-cpf').textContent = paciente.responsavelCpf || 'Não informado';
  document.getElementById('pf-responsavel-telefone').textContent = paciente.responsavelTelefone || 'Não informado';
  document.getElementById('pf-responsavel-celular').textContent = paciente.responsavelCelular || 'Não informado';
  document.getElementById('pf-responsavel-email').textContent = paciente.responsavelEmail || 'Não informado';

  // Dados do atendimento
  document.getElementById('pf-inicio').textContent = paciente.dataInicio
    ? new Date(paciente.dataInicio + 'T12:00:00').toLocaleDateString('pt-BR')
    : 'Não informado';
  document.getElementById('pf-frequencia').textContent = paciente.frequencia || 'Não informado';
  document.getElementById('pf-dia-semana').textContent = paciente.diaSemana
    ? ['', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'][paciente.diaSemana]
    : 'Não informado';
  document.getElementById('pf-horario-fixo').textContent = paciente.horarioFixo || 'Não informado';
  document.getElementById('pf-valor').textContent = paciente.valorSessao ? `R$ ${paciente.valorSessao}` : 'Não informado';
  document.getElementById('pf-pagamento').textContent = paciente.formaPagamento || 'Não informado';
  document.getElementById('pf-profissional').textContent = paciente.profissional || 'Não informado';

  // Informações clínicas
  document.getElementById('pf-motivo').textContent = paciente.motivo || 'Não informado';
  document.getElementById('pf-observacoes').textContent = paciente.observacoes || 'Não informado';

  // Esconde todas as telas e mostra o perfil
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
  document.getElementById('tela-perfil').classList.add('ativa');

  // Cronômetro
  const duracao = parseInt(paciente.duracao) || 50;
  const display = document.getElementById('crono-tempo');
  display.textContent = `${String(duracao).padStart(2, '0')}:00`;
  display.classList.remove('encerrado');
  clearInterval(cronoInterval);

  document.getElementById('btn-iniciar-sessao').style.display = 'inline-block';
  document.getElementById('btn-pausar-sessao').style.display = 'none';
  document.getElementById('btn-pausar-sessao').textContent = 'Pausar';
  document.getElementById('btn-resetar-sessao').style.display = 'none';

  document.getElementById('btn-iniciar-sessao').onclick = () => iniciarCrono(duracao);
  document.getElementById('btn-pausar-sessao').onclick = pausarCrono;
  document.getElementById('btn-resetar-sessao').onclick = () => resetarCrono(duracao);

  carregarAnotacoes(paciente.id);
  carregarPagamentos(paciente.id);
}

// Controle de Pagamentos
async function carregarPagamentos(pacienteId) {
  const snapshot = await db.collection('pagamentos')
    .where('pacienteId', '==', pacienteId)
    .get();

  const pagamentos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  pagamentos.sort((a, b) => {
    if (a.ano !== b.ano) return b.ano - a.ano;
    return b.mes - a.mes;
  });

  const lista = document.getElementById('lista-pagamentos');
  const meses = ['', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const agora = new Date();
  const mesAtualNum = agora.getMonth() + 1;
  const anoAtual = agora.getFullYear();

  if (pagamentos.length === 0) {
    lista.innerHTML = '<p class="vazio">Nenhum pagamento registrado ainda.</p>';
    return;
  }

  lista.innerHTML = pagamentos.map(p => {
    let status = p.status;
    if (status === 'pendente' && (p.ano < anoAtual || (p.ano === anoAtual && p.mes < mesAtualNum))) {
      status = 'atrasado';
    }

    return `
      <div class="pagamento-item">
        <div class="pagamento-mes">${meses[p.mes]} ${p.ano}</div>
        <div class="pagamento-valor">R$ ${p.valor || '—'}</div>
        <button class="pagamento-status ${status}" data-id="${p.id}" data-status="${p.status}">
          ${status === 'pago' ? 'Pago' : status === 'atrasado' ? 'Atrasado' : 'Pendente'}
        </button>
      </div>
    `;
  }).join('');

  document.querySelectorAll('.pagamento-status').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      const statusAtual = btn.dataset.status;
      const novoStatus = statusAtual === 'pago' ? 'pendente' : 'pago';
      const dataPagamento = novoStatus === 'pago' ? new Date().toISOString().split('T')[0] : null;
      await db.collection('pagamentos').doc(id).update({ status: novoStatus, dataPagamento });
      carregarPagamentos(pacienteAtual.id);
    });
  });
}

// Modal de pagamento
const modalPagamento = document.getElementById('modal-pagamento');

document.getElementById('btn-registrar-pagamento').addEventListener('click', () => {
  const agora = new Date();
  document.getElementById('pagamento-mes').value = agora.getMonth() + 1;
  document.getElementById('pagamento-ano').value = agora.getFullYear();
  document.getElementById('pagamento-valor').value = pacienteAtual.valorSessao || '';
  document.getElementById('pagamento-status').value = 'pendente';
  document.getElementById('pagamento-data').value = '';
  document.getElementById('erro-pagamento').textContent = '';
  document.getElementById('pagamento-nome-paciente').textContent = pacienteAtual.nome || '—';
  document.getElementById('pagamento-forma').textContent = pacienteAtual.formaPagamento || '—';
  modalPagamento.classList.remove('escondido');
});

document.getElementById('btn-fechar-pagamento').addEventListener('click', () => {
  modalPagamento.classList.add('escondido');
});

document.getElementById('fundo-pagamento').addEventListener('click', () => {
  modalPagamento.classList.add('escondido');
});

document.getElementById('btn-salvar-pagamento').addEventListener('click', async () => {
  const mes = Number(document.getElementById('pagamento-mes').value);
  const ano = Number(document.getElementById('pagamento-ano').value);
  const valor = document.getElementById('pagamento-valor').value.trim();
  const status = document.getElementById('pagamento-status').value;
  const dataPagamento = document.getElementById('pagamento-data').value;

  if (!valor) {
    document.getElementById('erro-pagamento').textContent = 'O valor é obrigatório.';
    return;
  }

  const snapshotExistente = await db.collection('pagamentos')
    .where('pacienteId', '==', pacienteAtual.id)
    .where('mes', '==', mes)
    .where('ano', '==', ano)
    .get();

  if (!snapshotExistente.empty) {
    document.getElementById('erro-pagamento').textContent = 'Já existe um pagamento registrado para este mês.';
    return;
  }

  await db.collection('pagamentos').add({
    pacienteId: pacienteAtual.id,
    usuarioId: usuarioLogado.uid,
    mes,
    ano,
    valor,
    status,
    dataPagamento: dataPagamento || null
  });

  modalPagamento.classList.add('escondido');
  carregarPagamentos(pacienteAtual.id);
});

// Voltar pra lista de pacientes
document.getElementById('btn-voltar-perfil').addEventListener('click', () => {
  document.querySelectorAll('.tela').forEach(t => t.classList.remove('ativa'));
  document.getElementById('tela-prontuarios').classList.add('ativa');
  document.querySelectorAll('.aba').forEach(a => a.classList.remove('ativa'));
  document.querySelector('.aba[data-tela="prontuarios"]').classList.add('ativa');
  carregarPacientes();
  carregarAnotacoes(paciente.id);
});

// Excluir pelo perfil
document.getElementById('btn-excluir-perfil').addEventListener('click', async () => {
  const confirmar = confirm(`Tem certeza que deseja excluir ${pacienteAtual.nome}? Todos os dados relacionados serão apagados.`);
  if (confirmar) {
    const cols = ['consultas', 'anotacoes', 'pagamentos'];
    for (const col of cols) {
      const snap = await db.collection(col).where('pacienteId', '==', pacienteAtual.id).get();
      for (const doc of snap.docs) await doc.ref.delete();
    }
    await db.collection('pacientes').doc(pacienteAtual.id).delete();
    navegarPara('prontuarios');
  }
});

document.getElementById('btn-exportar-prontuario').addEventListener('click', async () => {
  const snapshot = await db.collection('anotacoes')
    .where('pacienteId', '==', pacienteAtual.id)
    .get();

  const anotacoes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  anotacoes.sort((a, b) => a.data.localeCompare(b.data));

  const agora = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  const linhasAnotacoes = anotacoes.length === 0
    ? '<p style="font-size:13px;color:#6B6760;">Nenhuma sessao registrada.</p>'
    : anotacoes.map(a => `
        <div style="border:1px solid #D8D4CE;border-radius:8px;padding:16px;margin-bottom:16px;">
          <div style="font-size:13px;font-weight:600;color:#5B7FA6;margin-bottom:4px;">${new Date(a.data + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
          <div style="font-size:12px;color:#6B6760;margin-bottom:8px;">Evolucao: ${a.evolucao || 'nao informada'}</div>
          <div style="font-size:13px;line-height:1.6;">${a.texto || '—'}</div>
        </div>
      `).join('');

  const conteudo = document.createElement('div');
  conteudo.style.cssText = 'font-family:Georgia,serif;max-width:800px;padding:40px;color:#2C2A27;background:#ffffff;';
  conteudo.innerHTML = `
    <h1 style="font-size:24px;border-bottom:2px solid #5B7FA6;padding-bottom:8px;color:#5B7FA6;">Prontuario — ${pacienteAtual.nome}</h1>
    <div style="font-size:13px;color:#6B6760;margin-bottom:32px;">Exportado em ${agora}</div>

    <h2 style="font-size:16px;color:#2C2A27;margin:24px 0 12px 0;">Dados pessoais</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;color:#6B6760;width:200px;">Data de nascimento</td><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;">${pacienteAtual.dataNascimento ? new Date(pacienteAtual.dataNascimento + 'T12:00:00').toLocaleDateString('pt-BR') : '—'}</td></tr>
      <tr><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;color:#6B6760;">Telefone</td><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;">${pacienteAtual.telefone || '—'}</td></tr>
      <tr><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;color:#6B6760;">Celular</td><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;">${pacienteAtual.celular || '—'}</td></tr>
      <tr><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;color:#6B6760;">E-mail</td><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;">${pacienteAtual.email || '—'}</td></tr>
      <tr><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;color:#6B6760;">Endereco</td><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;">${pacienteAtual.endereco || '—'}</td></tr>
      <tr><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;color:#6B6760;">Estado civil</td><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;">${pacienteAtual.estadoCivil || '—'}</td></tr>
      <tr><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;color:#6B6760;">Escolaridade</td><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;">${pacienteAtual.escolaridade || '—'}</td></tr>
      <tr><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;color:#6B6760;">Ocupacao</td><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;">${pacienteAtual.ocupacao || '—'}</td></tr>
      <tr><td style="padding:6px 8px;font-size:13px;color:#6B6760;">Filiacao</td><td style="padding:6px 8px;font-size:13px;">${pacienteAtual.filiacao || '—'}</td></tr>
    </table>

    <h2 style="font-size:16px;color:#2C2A27;margin:24px 0 12px 0;">Dados do atendimento</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;color:#6B6760;width:200px;">Inicio do atendimento</td><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;">${pacienteAtual.dataInicio ? new Date(pacienteAtual.dataInicio + 'T12:00:00').toLocaleDateString('pt-BR') : '—'}</td></tr>
      <tr><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;color:#6B6760;">Frequencia</td><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;">${pacienteAtual.frequencia || '—'}</td></tr>
      <tr><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;color:#6B6760;">Horario fixo</td><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;">${pacienteAtual.horarioFixo || '—'}</td></tr>
      <tr><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;color:#6B6760;">Duracao da sessao</td><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;">${pacienteAtual.duracao ? pacienteAtual.duracao + ' min' : '—'}</td></tr>
      <tr><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;color:#6B6760;">Valor da sessao</td><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;">${pacienteAtual.valorSessao ? 'R$ ' + pacienteAtual.valorSessao : '—'}</td></tr>
      <tr><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;color:#6B6760;">Forma de pagamento</td><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;">${pacienteAtual.formaPagamento || '—'}</td></tr>
      <tr><td style="padding:6px 8px;font-size:13px;color:#6B6760;">Profissional responsavel</td><td style="padding:6px 8px;font-size:13px;">${pacienteAtual.profissional || '—'}</td></tr>
    </table>

    <h2 style="font-size:16px;color:#2C2A27;margin:24px 0 12px 0;">Informacoes clinicas</h2>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <tr><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;color:#6B6760;width:200px;">Motivo da consulta</td><td style="padding:6px 8px;font-size:13px;border-bottom:1px solid #EDEAE5;">${pacienteAtual.motivo || '—'}</td></tr>
      <tr><td style="padding:6px 8px;font-size:13px;color:#6B6760;">Observacoes</td><td style="padding:6px 8px;font-size:13px;">${pacienteAtual.observacoes || '—'}</td></tr>
    </table>

    <h2 style="font-size:16px;color:#2C2A27;margin:24px 0 12px 0;">Historico de sessoes</h2>
    ${linhasAnotacoes}
  `;

  document.body.appendChild(conteudo);

  const canvas = await html2canvas(conteudo, { scale: 2, useCORS: true });
  const imgData = canvas.toDataURL('image/png');

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p', 'mm', 'a4');
  const largura = pdf.internal.pageSize.getWidth();
  const altura = (canvas.height * largura) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, largura, altura);
  pdf.save(`prontuario-${pacienteAtual.nome.toLowerCase().replace(/\s+/g, '-')}-${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.pdf`);

  document.body.removeChild(conteudo);
});

// Clique no card abre o perfil
document.getElementById('lista-pacientes').addEventListener('click', async (e) => {
  const card = e.target.closest('.paciente-card');
  if (card && !e.target.classList.contains('btn-excluir')) {
    const id = card.dataset.id;
    const doc = await db.collection('pacientes').doc(id).get();
    if (doc.exists) abrirPerfil({ id: doc.id, ...doc.data() });
  }
});

/* Editar Paciente */
document.getElementById('btn-editar-paciente').addEventListener('click', () => {
    document.getElementById('pac-nome').value = pacienteAtual.nome || '';
    document.getElementById('pac-nascimento').value = pacienteAtual.dataNascimento || '';
    document.getElementById('pac-cpf').value = pacienteAtual.cpf || '';
    document.getElementById('pac-endereco').value = pacienteAtual.endereco || '';
    document.getElementById('pac-telefone').value = pacienteAtual.telefone || '';
    document.getElementById('pac-celular').value = pacienteAtual.celular || '';
    document.getElementById('pac-email').value = pacienteAtual.email || '';
    document.getElementById('pac-estado-civil').value = pacienteAtual.estadoCivil || '';
    document.getElementById('pac-escolaridade').value = pacienteAtual.escolaridade || '';
    document.getElementById('pac-ocupacao').value = pacienteAtual.ocupacao || '';
    document.getElementById('pac-filiacao1-parentesco').value = pacienteAtual.filiacao1Parentesco || '';
    document.getElementById('pac-filiacao1-nome').value = pacienteAtual.filiacao1Nome || '';
    document.getElementById('pac-filiacao2-parentesco').value = pacienteAtual.filiacao2Parentesco || '';
    document.getElementById('pac-filiacao2-nome').value = pacienteAtual.filiacao2Nome || '';
    document.getElementById('pac-responsavel-nome').value = pacienteAtual.responsavelNome || '';
    document.getElementById('pac-responsavel-parentesco').value = pacienteAtual.responsavelParentesco || '';
    document.getElementById('pac-responsavel-cpf').value = pacienteAtual.responsavelCpf || '';
    document.getElementById('pac-responsavel-telefone').value = pacienteAtual.responsavelTelefone || '';
    document.getElementById('pac-responsavel-celular').value = pacienteAtual.responsavelCelular || '';
    document.getElementById('pac-responsavel-email').value = pacienteAtual.responsavelEmail || '';
    document.getElementById('pac-inicio').value = pacienteAtual.dataInicio || '';
    document.getElementById('pac-frequencia').value = pacienteAtual.frequencia || '';
    document.getElementById('pac-dia-semana').value = pacienteAtual.diaSemana || '';
    document.getElementById('pac-horario-fixo').value = pacienteAtual.horarioFixo || '';
    document.getElementById('pac-valor-sessao').value = pacienteAtual.valorSessao || '';
    document.getElementById('pac-forma-pagamento').value = pacienteAtual.formaPagamento || '';
    document.getElementById('pac-profissional').value = pacienteAtual.profissional || '';
    document.getElementById('pac-motivo').value = pacienteAtual.motivo || '';
    document.getElementById('pac-observacoes').value = pacienteAtual.observacoes || '';
    document.getElementById('pac-duracao').value = pacienteAtual.duracao || '50';

    document.querySelector('.modal-topo h2').textContent = 'Editar paciente';
    btnSalvarPaciente.textContent = 'Atualizar paciente';
    btnSalvarPaciente.dataset.modo = 'editar';

    const modalCorpo = document.querySelector('#modal-paciente .modal-corpo');
    modalCorpo.scrollTop = 0;

    abrirModal();
});

/* Configurações da Clínica */

const btnSalvarConfig = document.getElementById('btn-salvar-config');
const configNomeClinica = document.getElementById('config-nome-clinica');
const configNomeProfissional = document.getElementById('config-nome-profissional');

async function carregarConfiguracoes() {
  const doc = await db.collection('configuracoes').doc(usuarioLogado.uid).get();

  if (doc.exists) {
    const config = doc.data();
    configNomeClinica.value = config.nomeClinica || '';
    configNomeProfissional.value = config.nomeProfissional || '';
    aplicarConfiguracoes(config);
  }
}

function aplicarConfiguracoes(config) {
  if (config.nomeClinica) {
    document.querySelector('.app-titulo').textContent = config.nomeClinica;
  }

  if (config.nomeProfissional) {
    const saudacaoTexto = document.getElementById('saudacao-texto');
    if (saudacaoTexto) {
      const saudacao = saudacaoTexto.textContent.split(',')[0];
      saudacaoTexto.textContent = `${saudacao}, ${config.nomeProfissional}`;
    }
  }
}

btnSalvarConfig.addEventListener('click', async () => {
  const nomeClinica = configNomeClinica.value.trim();
  const nomeProfissional = configNomeProfissional.value.trim();

  await db.collection('configuracoes').doc(usuarioLogado.uid).set({
    nomeClinica,
    nomeProfissional,
    usuarioId: usuarioLogado.uid
  }, { merge: true });

  aplicarConfiguracoes({ nomeClinica, nomeProfissional });
  alert('Configurações salvas!');
});

/* Exportar Backup */
document.getElementById('btn-exportar').addEventListener('click', async () => {
  const snapshot = await db.collection('pacientes')
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();

  const pacientes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const agora = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric'
  });

  const linhasPacientes = pacientes.map(p => `
    <div class="pac">
      <h2>${p.nome}</h2>
      <table>
        <tr><td>Data de nascimento</td><td>${p.dataNascimento || '—'}</td></tr>
        <tr><td>Telefone</td><td>${p.telefone || '—'}</td></tr>
        <tr><td>Celular</td><td>${p.celular || '—'}</td></tr>
        <tr><td>E-mail</td><td>${p.email || '—'}</td></tr>
        <tr><td>Endereço</td><td>${p.endereco || '—'}</td></tr>
        <tr><td>Estado civil</td><td>${p.estadoCivil || '—'}</td></tr>
        <tr><td>Escolaridade</td><td>${p.escolaridade || '—'}</td></tr>
        <tr><td>Ocupação</td><td>${p.ocupacao || '—'}</td></tr>
        <tr><td>Filiação</td><td>${p.filiacao || '—'}</td></tr>
        <tr><td>Início do atendimento</td><td>${p.dataInicio || '—'}</td></tr>
        <tr><td>Valor da sessão</td><td>${p.valorSessao ? 'R$ ' + p.valorSessao : '—'}</td></tr>
        <tr><td>Forma de pagamento</td><td>${p.formaPagamento || '—'}</td></tr>
        <tr><td>Profissional responsável</td><td>${p.profissional || '—'}</td></tr>
      </table>
      <h3>Motivo da consulta</h3>
      <p>${p.motivo || '—'}</p>
      <h3>Observações</h3>
      <p>${p.observacoes || '—'}</p>
    </div>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8" />
      <title>Backup — Consultório</title>
      <style>
        body { font-family: Georgia, serif; max-width: 800px; margin: 40px auto; color: #2C2A27; }
        h1 { font-size: 24px; border-bottom: 2px solid #5B7FA6; padding-bottom: 8px; color: #5B7FA6; }
        .data { font-size: 13px; color: #6B6760; margin-bottom: 40px; }
        .pac { border: 1px solid #D8D4CE; border-radius: 8px; padding: 24px; margin-bottom: 32px; page-break-inside: avoid; }
        .pac h2 { font-size: 18px; color: #2C2A27; margin-bottom: 16px; }
        .pac h3 { font-size: 14px; color: #5B7FA6; margin: 16px 0 6px 0; }
        table { width: 100%; border-collapse: collapse; }
        td { padding: 6px 8px; font-size: 13px; border-bottom: 1px solid #EDEAE5; }
        td:first-child { color: #6B6760; width: 200px; }
        p { font-size: 13px; line-height: 1.6; }
        @media print { body { margin: 20px; } }
      </style>
    </head>
    <body>
      <h1>Backup — Consultório</h1>
      <div class="data">Exportado em ${agora} por ${usuarioLogado.nome}</div>
      ${linhasPacientes}
    </body>
    </html>
  `;

  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `backup-consultorio-${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.html`;
  a.click();
  URL.revokeObjectURL(url);
});

/* Alterar Senha */
document.getElementById('btn-alterar-senha').addEventListener('click', async () => {
    const senhaAtual = prompt('Digite sua senha atual:');
    if (!senhaAtual) return;

    const novaSenha = prompt('Digite a nova senha (mínimo 6 caracteres):');
    if (!novaSenha) return;

    if (novaSenha.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres.');
        return;
    }

    const confirmar = prompt('Confirme a nova senha:');
    if (novaSenha !== confirmar) {
        alert('As senhas não coincidem!');
        return;
    }

    try {
        const credencial = firebase.auth.EmailAuthProvider.credential(
            usuarioLogado.email,
            senhaAtual
        );
        await auth.currentUser.reauthenticateWithCredential(credencial);
        await auth.currentUser.updatePassword(novaSenha);
        alert('Senha alterada com sucesso!');
    } catch (erro) {
        alert('Senha atual incorreta!');
    }
});

/* Agenda */

let dataAgenda = new Date();

function formatarData(data) {
  const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  return `${dias[data.getDay()]}, ${data.getDate()} de ${meses[data.getMonth()]} de ${data.getFullYear()}`;
}

function formatarDataISO(data) {
  return data.toISOString().split('T')[0];
}

let mesAtual = new Date();
let diaSelecionado = new Date();

async function carregarCalendario() {
  const ano = mesAtual.getFullYear();
  const mes = mesAtual.getMonth();

  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const snapshotConsultas = await db.collection('consultas')
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();

  const datasComConsulta = new Set(snapshotConsultas.docs.map(doc => doc.data().data));

  const primeiroDia = new Date(ano, mes, 1);
  const inicioPainel = new Date(primeiroDia);
  inicioPainel.setDate(inicioPainel.getDate() - primeiroDia.getDay());

  const hoje = formatarDataISO(new Date());
  const diaSelecionadoISO = formatarDataISO(diaSelecionado);

  const grade = document.getElementById('calendario-grade');

  const cabecalho = `
    <div class="cal-dia-semana">Dom</div>
    <div class="cal-dia-semana">Seg</div>
    <div class="cal-dia-semana">Ter</div>
    <div class="cal-dia-semana">Qua</div>
    <div class="cal-dia-semana">Qui</div>
    <div class="cal-dia-semana">Sex</div>
    <div class="cal-dia-semana">Sáb</div>
  `;

  let diasHTML = '';
  const cursor = new Date(inicioPainel);

  for (let i = 0; i < 42; i++) {
    const dataISO = formatarDataISO(cursor);
    const outroMes = cursor.getMonth() !== mes;
    const ehHoje = dataISO === hoje;
    const ehSelecionado = dataISO === diaSelecionadoISO;
    const temConsulta = datasComConsulta.has(dataISO);

    let classes = 'cal-dia';
    if (outroMes) classes += ' outro-mes';
    if (ehHoje) classes += ' hoje';
    if (ehSelecionado) classes += ' selecionado';

    diasHTML += `
      <div class="${classes}" data-data="${dataISO}">
        ${cursor.getDate()}
        ${temConsulta ? '<div class="cal-indicador"></div>' : ''}
      </div>
    `;

    cursor.setDate(cursor.getDate() + 1);
  }

  grade.innerHTML = `
    <div class="cal-header">
      <button class="btn-nav" id="btn-mes-anterior">←</button>
      <span id="agenda-mes-titulo">${meses[mes]} ${ano}</span>
      <button class="btn-nav" id="btn-proximo-mes">→</button>
    </div>
  ` + cabecalho + diasHTML;

  grade.querySelectorAll('.cal-dia').forEach(el => {
    el.addEventListener('click', () => {
      const partes = el.dataset.data.split('-');
      diaSelecionado = new Date(Number(partes[0]), Number(partes[1]) - 1, Number(partes[2]));
      carregarCalendario();
      carregarAgenda();
    });
  });

  document.getElementById('btn-mes-anterior').addEventListener('click', () => {
    mesAtual.setMonth(mesAtual.getMonth() - 1);
    carregarCalendario();
  });

  document.getElementById('btn-proximo-mes').addEventListener('click', () => {
    mesAtual.setMonth(mesAtual.getMonth() + 1);
    carregarCalendario();
  });
}

async function carregarAgenda() {
  const dataISO = formatarDataISO(diaSelecionado);

  const dias = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  document.getElementById('agenda-dia-titulo').textContent =
    `${dias[diaSelecionado.getDay()]}, ${diaSelecionado.getDate()} de ${meses[diaSelecionado.getMonth()]} de ${diaSelecionado.getFullYear()}`;

  const snapshotConsultas = await db.collection('consultas')
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();

  const consultas = snapshotConsultas.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const consultasDoDia = consultas.filter(c => c.data === dataISO);
  const grade = document.getElementById('grade-agenda');

  const horarios = [];
  for (let h = 7; h <= 20; h++) {
    horarios.push(`${String(h).padStart(2, '0')}:00`);
    horarios.push(`${String(h).padStart(2, '0')}:30`);
  }

  const snapshotPacientes = await db.collection('pacientes')
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();

  const mapaPacientes = {};
  snapshotPacientes.docs.forEach(doc => mapaPacientes[doc.id] = doc.data().nome);

  const consultasSemSlot = consultasDoDia.filter(c => !horarios.includes(c.hora));

  grade.innerHTML = [
    ...consultasSemSlot.map(consulta => {
      const nomePaciente = mapaPacientes[consulta.pacienteId] || 'Paciente';
      return `
        <div class="agenda-slot">
          <div class="slot-hora">${consulta.hora}</div>
          <div class="slot-bloco ${consulta.status}" data-id="${consulta.id}">
            <div class="slot-nome">${nomePaciente}</div>
            <div class="slot-tipo">${consulta.duracao} min · ${consulta.status}</div>
          </div>
          <button class="btn-editar-consulta-agenda btn-nav" data-id="${consulta.id}">✎ Editar</button>
        </div>
      `;
    }),
    ...horarios.map(hora => {
      const consulta = consultasDoDia.find(c => c.hora === hora);
      if (consulta) {
        const nomePaciente = mapaPacientes[consulta.pacienteId] || 'Paciente';
        return `
          <div class="agenda-slot">
            <div class="slot-hora">${hora}</div>
            <div class="slot-bloco ${consulta.status}" data-id="${consulta.id}">
              <div class="slot-nome">${nomePaciente}</div>
              <div class="slot-tipo">${consulta.duracao} min · ${consulta.status}</div>
            </div>
            <button class="btn-editar-consulta-agenda btn-nav" data-id="${consulta.id}">✎ Editar</button>
          </div>
        `;
      }
      return `
        <div class="agenda-slot">
          <div class="slot-hora">${hora}</div>
          <div class="slot-bloco vazio">
            <div class="slot-vazio-text">Horário livre</div>
          </div>
          <button class="btn-encaixe" data-hora="${hora}">+ Encaixe</button>
        </div>
      `;
    })
  ].join('');

  document.querySelectorAll('.btn-editar-consulta-agenda').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      const doc = await db.collection('consultas').doc(id).get();
      if (doc.exists) abrirModalEditarConsulta({ id: doc.id, ...doc.data() });
    });
  });
}

// Carrega agenda ao clicar na aba
document.querySelector('.aba[data-tela="agenda"]').addEventListener('click', () => {
  carregarCalendario();
  carregarAgenda();
});

// Modal de consulta
const modalConsulta = document.getElementById('modal-consulta');

async function abrirModalConsulta(pacienteIdSelecionado = null) {
  const snapshot = await db.collection('pacientes')
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();

  const pacientes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  pacientes.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));

  const select = document.getElementById('consulta-paciente');
  select.innerHTML = pacientes.map(p =>
    `<option value="${p.id}" ${p.id === pacienteIdSelecionado ? 'selected' : ''}>${p.nome}</option>`
  ).join('');

  document.getElementById('consulta-data').value = formatarDataISO(diaSelecionado);
  modalConsulta.classList.remove('escondido');
}

function fecharModalConsulta() {
  modalConsulta.classList.add('escondido');
  document.getElementById('consulta-hora').value = '';
  document.getElementById('consulta-observacoes').value = '';
  document.getElementById('erro-consulta').textContent = '';
}

document.getElementById('btn-agendar').addEventListener('click', abrirModalConsulta);
document.getElementById('btn-fechar-modal-consulta').addEventListener('click', fecharModalConsulta);
document.getElementById('fundo-consulta').addEventListener('click', fecharModalConsulta);

document.getElementById('btn-salvar-consulta').addEventListener('click', async () => {
  const pacienteId = document.getElementById('consulta-paciente').value;
  const data = document.getElementById('consulta-data').value;
  const hora = document.getElementById('consulta-hora').value;
  const duracao = document.getElementById('consulta-duracao').value;
  const status = document.getElementById('consulta-status').value;
  const observacoes = document.getElementById('consulta-observacoes').value.trim();

  if (!data || !hora) {
    document.getElementById('erro-consulta').textContent = 'Data e horário são obrigatórios.';
    return;
  }

  await db.collection('consultas').add({
    pacienteId,
    data,
    hora,
    duracao,
    status,
    observacoes,
    usuarioId: usuarioLogado.uid
  });

  fecharModalConsulta();
  carregarAgenda();
});

// Encaixe rápido na agenda
document.getElementById('grade-agenda').addEventListener('click', async (e) => {
  if (e.target.classList.contains('btn-encaixe')) {
    const hora = e.target.dataset.hora;
    await abrirModalConsulta();
    document.getElementById('consulta-hora').value = hora;
  }
});

/* Editar Consulta */
const modalEditarConsulta = document.getElementById('modal-editar-consulta');
let consultaAtual = null;

async function abrirModalEditarConsulta(consulta) {
  consultaAtual = consulta;

  const snapshot = await db.collection('pacientes')
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();

  const pacientes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  pacientes.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));

  const select = document.getElementById('editar-consulta-paciente');
  select.innerHTML = pacientes.map(p =>
    `<option value="${p.id}" ${p.id === consulta.pacienteId ? 'selected' : ''}>${p.nome}</option>`
  ).join('');

  document.getElementById('editar-consulta-data').value = consulta.data;
  document.getElementById('editar-consulta-hora').value = consulta.hora;
  document.getElementById('editar-consulta-duracao').value = consulta.duracao;
  document.getElementById('editar-consulta-status').value = consulta.status;
  document.getElementById('editar-consulta-observacoes').value = consulta.observacoes || '';

  modalEditarConsulta.classList.remove('escondido');
}

function fecharModalEditarConsulta() {
  modalEditarConsulta.classList.add('escondido');
  consultaAtual = null;
}

document.getElementById('btn-fechar-editar-consulta').addEventListener('click', fecharModalEditarConsulta);
document.getElementById('fundo-editar-consulta').addEventListener('click', fecharModalEditarConsulta);

// Salva alterações
document.getElementById('btn-atualizar-consulta').addEventListener('click', async () => {
  const pacienteId = document.getElementById('editar-consulta-paciente').value;
  const data = document.getElementById('editar-consulta-data').value;
  const hora = document.getElementById('editar-consulta-hora').value;
  const duracao = document.getElementById('editar-consulta-duracao').value;
  const status = document.getElementById('editar-consulta-status').value;
  const observacoes = document.getElementById('editar-consulta-observacoes').value.trim();

  await db.collection('consultas').doc(consultaAtual.id).update({
    pacienteId, data, hora, duracao, status, observacoes
  });

  fecharModalEditarConsulta();
  carregarAgenda();
});

// Excluir consulta
document.getElementById('btn-excluir-consulta').addEventListener('click', async () => {
  const confirmar = confirm('Tem certeza que deseja excluir esta consulta?');
  if (confirmar) {
    await db.collection('consultas').doc(consultaAtual.id).delete();
    fecharModalEditarConsulta();
    carregarAgenda();
  }
});

// Clique numa consulta abre o modal de edição
document.getElementById('grade-agenda').addEventListener('click', async (e) => {
  const slot = e.target.closest('.slot-bloco:not(.vazio)');
  if (slot && !e.target.classList.contains('btn-encaixe') && !e.target.classList.contains('btn-editar-consulta-agenda')) {
    const id = slot.dataset.id;
    const doc = await db.collection('consultas').doc(id).get();
    if (doc.exists) abrirModalEditarConsulta({ id: doc.id, ...doc.data() });
  }
});

/* Alertas */
async function carregarAlertas() {
  const listaAlertas = document.getElementById('lista-alertas');
  const alertas = [];
  const agora = new Date();
  const hoje = formatarDataISO(agora);
  const mesAtualNum = agora.getMonth() + 1;
  const anoAtual = agora.getFullYear();

  const amanha = new Date();
  amanha.setDate(amanha.getDate() + 1);
  const amanhaISO = formatarDataISO(amanha);

  const snapshotConsultas = await db.collection('consultas')
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();
  const consultas = snapshotConsultas.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const snapshotPacientes = await db.collection('pacientes')
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();
  const pacientes = snapshotPacientes.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const snapshotPagamentos = await db.collection('pagamentos')
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();
  const pagamentos = snapshotPagamentos.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const mapaPacientes = {};
  pacientes.forEach(p => mapaPacientes[p.id] = p.nome);

  // Alerta 1 — Consultas pendentes hoje ou amanhã
  const pendentes = consultas.filter(c =>
    (c.data === hoje || c.data === amanhaISO) && c.status === 'pendente'
  );

  pendentes.forEach(c => {
    const quando = c.data === hoje ? 'hoje' : 'amanhã';
    alertas.push({
      tipo: 'urgente',
      texto: `${mapaPacientes[c.pacienteId] || 'Paciente'} não confirmou a consulta de ${quando} às ${c.hora}`,
      tempo: `${quando} às ${c.hora}`
    });
  });

  // Alerta 2 — Consultas sem confirmação faltando 2 horas
  const horaAgora = `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;
  const doisHorasDepois = new Date(agora.getTime() + 2 * 60 * 60 * 1000);
  const horaLimite = `${String(doisHorasDepois.getHours()).padStart(2, '0')}:${String(doisHorasDepois.getMinutes()).padStart(2, '0')}`;

  const semConfirmacao = consultas.filter(c =>
    c.data === hoje &&
    c.status === 'pendente' &&
    c.hora >= horaAgora &&
    c.hora <= horaLimite
  );

  semConfirmacao.forEach(c => {
    alertas.push({
      tipo: 'urgente',
      texto: `Faltam menos de 2 horas para a consulta de ${mapaPacientes[c.pacienteId] || 'Paciente'} e ela ainda não foi confirmada`,
      tempo: `Hoje às ${c.hora}`
    });
  });

  // Alerta 3 — Consultas de hoje
  const consultasHoje = consultas.filter(c => c.data === hoje && c.status !== 'cancelada');
  if (consultasHoje.length > 0) {
    const consultasOrdenadas = consultasHoje.sort((a, b) => a.hora.localeCompare(b.hora));
    alertas.push({
      tipo: 'ok',
      texto: `Você tem ${consultasHoje.length} consulta(s) agendada(s) para hoje`,
      tempo: `Primeira às ${consultasOrdenadas[0].hora}`
    });
  }

  // Alerta 4 — Pagamentos pendentes do mês atual
  const pagamentosPendentes = pagamentos.filter(p =>
    p.mes === mesAtualNum && p.ano === anoAtual && p.status === 'pendente'
  );

  pagamentosPendentes.forEach(p => {
    alertas.push({
      tipo: 'atencao',
      texto: `Pagamento pendente de ${mapaPacientes[p.pacienteId] || 'Paciente'}`,
      tempo: `R$ ${p.valor} · ${p.mes}/${p.ano}`
    });
  });

  // Alerta 5 — Pagamentos atrasados
  const pagamentosAtrasados = pagamentos.filter(p =>
    p.status === 'pendente' &&
    (p.ano < anoAtual || (p.ano === anoAtual && p.mes < mesAtualNum))
  );

  pagamentosAtrasados.forEach(p => {
    const mesesNomes = ['', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    alertas.push({
      tipo: 'urgente',
      texto: `Pagamento em atraso de ${mapaPacientes[p.pacienteId] || 'Paciente'}`,
      tempo: `R$ ${p.valor} · ${mesesNomes[p.mes]} de ${p.ano}`
    });
  });

  // Alerta 6 — Pacientes sem sessão há 3+ semanas
  const tresSemanasAtras = new Date();
  tresSemanasAtras.setDate(tresSemanasAtras.getDate() - 21);
  const tresSemanasISO = formatarDataISO(tresSemanasAtras);

  pacientes.forEach(p => {
    const consultasPaciente = consultas
      .filter(c => c.pacienteId === p.id && c.status === 'concluida')
      .sort((a, b) => b.data.localeCompare(a.data));

    if (consultasPaciente.length === 0) return;

    const ultima = consultasPaciente[0];
    if (ultima.data < tresSemanasISO) {
      const diasSem = Math.floor((agora - new Date(ultima.data + 'T12:00:00')) / (1000 * 60 * 60 * 24));
      alertas.push({
        tipo: 'atencao',
        texto: `${p.nome} sem sessão há ${diasSem} dias`,
        tempo: `Última sessão: ${new Date(ultima.data + 'T12:00:00').toLocaleDateString('pt-BR')}`
      });
    }
  });

  // Alerta 7 — Aniversários
  const diaHoje = agora.getDate();
  const mesHoje = agora.getMonth() + 1;
  const diaAmanha = amanha.getDate();
  const mesAmanha = amanha.getMonth() + 1;

  pacientes.forEach(p => {
    if (!p.dataNascimento) return;

    const nascimento = new Date(p.dataNascimento + 'T12:00:00');
    const diaNasc = nascimento.getDate();
    const mesNasc = nascimento.getMonth() + 1;

    if (diaNasc === diaHoje && mesNasc === mesHoje) {
      const idade = agora.getFullYear() - nascimento.getFullYear();
      alertas.push({
        tipo: 'ok',
        texto: `Hoje é aniversário de ${p.nome}!`,
        tempo: `${idade} anos`
      });
    } else if (diaNasc === diaAmanha && mesNasc === mesAmanha) {
      alertas.push({
        tipo: 'atencao',
        texto: `Amanhã é aniversário de ${p.nome}`,
        tempo: `${new Date(p.dataNascimento + 'T12:00:00').toLocaleDateString('pt-BR')}`
      });
    }
  });

  const ordem = { urgente: 0, atencao: 1, ok: 2 };
  alertas.sort((a, b) => ordem[a.tipo] - ordem[b.tipo]);

  if (alertas.length === 0) {
    listaAlertas.innerHTML = '<p class="vazio">Nenhum alerta no momento.</p>';
    return;
  }

  listaAlertas.innerHTML = alertas.map(a => `
    <div class="alerta-item ${a.tipo}">
      <div class="consulta-info">
        <div class="consulta-nome">${a.texto}</div>
        <div class="consulta-tipo">${a.tempo}</div>
      </div>
    </div>
  `).join('');
}

/* Notificações */
function pedirPermissaoNotificacao() {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
}

async function verificarNotificacoes() {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  if (!usuarioLogado) return;

  const agora = new Date();
  const hoje = formatarDataISO(agora);
  const horaAgora = `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;

  const doisHorasDepois = new Date(agora.getTime() + 2 * 60 * 60 * 1000);
  const horaLimite = `${String(doisHorasDepois.getHours()).padStart(2, '0')}:${String(doisHorasDepois.getMinutes()).padStart(2, '0')}`;

  const snapshotConsultas = await db.collection('consultas')
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();
  const consultas = snapshotConsultas.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const snapshotPacientes = await db.collection('pacientes')
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();

  const mapaPacientes = {};
  snapshotPacientes.docs.forEach(doc => mapaPacientes[doc.id] = doc.data().nome);

  const pendentes = consultas.filter(c =>
    c.data === hoje &&
    c.status === 'pendente' &&
    c.hora >= horaAgora &&
    c.hora <= horaLimite
  );

  pendentes.forEach(c => {
    const nome = mapaPacientes[c.pacienteId] || 'Paciente';
    const minutosRestantes = Math.floor((new Date(`${hoje}T${c.hora}`) - agora) / 60000);
    new Notification('Consulta sem confirmação', {
      body: `${nome} ainda não confirmou a consulta das ${c.hora} (em ${minutosRestantes} min)`,
      icon: 'assets/logo.jpg'
    });
  });

  const confirmadas = consultas.filter(c =>
    c.data === hoje &&
    c.status === 'confirmada' &&
    c.hora >= horaAgora &&
    c.hora <= horaLimite
  );

  confirmadas.forEach(c => {
    const nome = mapaPacientes[c.pacienteId] || 'Paciente';
    const minutosRestantes = Math.floor((new Date(`${hoje}T${c.hora}`) - agora) / 60000);
    new Notification('Consulta se aproximando', {
      body: `${nome} tem consulta às ${c.hora} (em ${minutosRestantes} min)`,
      icon: 'assets/logo.jpg'
    });
  });
}

// Carrega alertas ao clicar na aba
document.querySelector('.aba[data-tela="alertas"]').addEventListener('click', () => {
  carregarAlertas();
});

/* Gerar Consultas do Mês */
async function gerarConsultasMes(paciente) {
  if (!paciente.frequencia || !paciente.diaSemana || !paciente.horarioFixo) return;

  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = agora.getMonth();

  const meses = [mes, mes + 1];

  for (const m of meses) {
    const inicioMes = new Date(ano, m, 1);
    const fimMes = new Date(ano, m + 1, 0);

    const datas = [];
    const cursor = new Date(inicioMes);

    while (cursor <= fimMes) {
      if (cursor.getDay() === Number(paciente.diaSemana)) {
        datas.push(formatarDataISO(new Date(cursor)));
      }
      cursor.setDate(cursor.getDate() + 1);
    }

    let datasFinais = [];
    if (paciente.frequencia === 'semanal') {
      datasFinais = datas;
    } else if (paciente.frequencia === 'quinzenal') {
      datasFinais = datas.filter((_, i) => i % 2 === 0);
    } else if (paciente.frequencia === 'mensal') {
      datasFinais = [datas[0]];
    }

    const snapshotExistentes = await db.collection('consultas')
      .where('pacienteId', '==', paciente.id)
      .get();

    const datasExistentes = snapshotExistentes.docs.map(doc => {
      const d = doc.data();
      return `${d.data}_${d.hora}`;
    });

    for (const data of datasFinais) {
      if (!datasExistentes.includes(`${data}_${paciente.horarioFixo}`)) {
        await db.collection('consultas').add({
          pacienteId: paciente.id,
          usuarioId: usuarioLogado.uid,
          data,
          hora: paciente.horarioFixo,
          duracao: paciente.duracao || '50',
          status: 'pendente',
          observacoes: ''
        });
      }
    }
  }
}

/* Gerar Consultas Todos Pacientes */
async function gerarConsultasTodosPacientes() {
  const snapshot = await db.collection('pacientes')
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();

  const pacientes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  for (const p of pacientes) {
    await gerarConsultasMes(p);
  }
}

/* Anotações de Sessão */
const modalAnotacao = document.getElementById('modal-anotacao');
const btnSalvarAnotacao = document.getElementById('btn-salvar-anotacao');
let anotacaoAtual = null;

function abrirModalAnotacao(anotacao = null) {
  anotacaoAtual = anotacao;

  if (anotacao) {
    // Modo edição
    document.getElementById('anotacao-data').value = anotacao.data;
    document.getElementById('anotacao-evolucao').value = anotacao.evolucao;
    document.getElementById('anotacao-texto').value = anotacao.texto;
    document.querySelector('#modal-anotacao .modal-topo h2').textContent = 'Editar sessão';
    btnSalvarAnotacao.textContent = 'Atualizar sessão';
    btnSalvarAnotacao.dataset.modo = 'editar';
  } else {
    // Modo novo
    document.getElementById('anotacao-data').value = formatarDataISO(new Date());
    document.getElementById('anotacao-evolucao').value = 'estavel';
    document.getElementById('anotacao-texto').value = '';
    document.querySelector('#modal-anotacao .modal-topo h2').textContent = 'Registro de sessão';
    btnSalvarAnotacao.textContent = 'Salvar sessão';
    btnSalvarAnotacao.dataset.modo = '';
  }

  document.getElementById('erro-anotacao').textContent = '';
  modalAnotacao.classList.remove('escondido');
}

function fecharModalAnotacao() {
  modalAnotacao.classList.add('escondido');
  anotacaoAtual = null;
}

document.getElementById('btn-fechar-anotacao').addEventListener('click', fecharModalAnotacao);
document.getElementById('fundo-anotacao').addEventListener('click', fecharModalAnotacao);

document.getElementById('btn-nova-anotacao').addEventListener('click', () => {
  abrirModalAnotacao();
});

// Salvar anotação
btnSalvarAnotacao.addEventListener('click', async () => {
  const data = document.getElementById('anotacao-data').value;
  const evolucao = document.getElementById('anotacao-evolucao').value;
  const texto = document.getElementById('anotacao-texto').value.trim();

  if (!data || !texto) {
    document.getElementById('erro-anotacao').textContent = 'Data e anotação são obrigatórios.';
    return;
  }

  if (btnSalvarAnotacao.dataset.modo === 'editar') {
    await db.collection('anotacoes').doc(anotacaoAtual.id).update({ data, evolucao, texto });
  } else {
    await db.collection('anotacoes').add({
      pacienteId: pacienteAtual.id,
      usuarioId: usuarioLogado.uid,
      data,
      evolucao,
      texto
    });
  }

  fecharModalAnotacao();
  carregarAnotacoes(pacienteAtual.id);
});

// Carregar anotações do paciente
async function carregarAnotacoes(pacienteId) {
  const lista = document.getElementById('lista-anotacoes');

  const snapshot = await db.collection('anotacoes')
    .where('pacienteId', '==', pacienteId)
    .get();

  const anotacoes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  anotacoes.sort((a, b) => b.data.localeCompare(a.data));

  if (anotacoes.length === 0) {
    lista.innerHTML = '<p class="vazio">Nenhuma sessão registrada ainda.</p>';
    return;
  }

  const evolucaoLabel = {
    positiva: 'Positiva',
    estavel: 'Estável',
    negativa: 'Negativa'
  };

  lista.innerHTML = anotacoes.map(a => `
    <div class="sessao-card ${a.evolucao}" data-id="${a.id}">
      <div class="sessao-header">
        <div class="sessao-data">${new Date(a.data + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</div>
        <span class="sessao-evolucao ${a.evolucao}">${evolucaoLabel[a.evolucao]}</span>
      </div>
      <div class="sessao-texto">${a.texto}</div>
    </div>
  `).join('');

  lista.querySelectorAll('.sessao-card').forEach(card => {
    card.addEventListener('click', async () => {
      const id = card.dataset.id;
      const doc = await db.collection('anotacoes').doc(id).get();
      if (doc.exists) abrirModalAnotacao({ id: doc.id, ...doc.data() });
    });
  });
}

/* Dashboard */
async function carregarDashboard() {
  const hoje = formatarDataISO(new Date());
  const agora = new Date();
  const mesAtualNum = agora.getMonth() + 1;
  const anoAtual = agora.getFullYear();

  const snapshotConsultas = await db.collection('consultas')
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();

  const todasConsultas = snapshotConsultas.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const consultasHoje = todasConsultas
    .filter(c => c.data === hoje && c.status !== 'cancelada')
    .sort((a, b) => a.hora.localeCompare(b.hora));

  const snapshotPacientes = await db.collection('pacientes')
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();

  const pacientes = snapshotPacientes.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const snapshotPagamentos = await db.collection('pagamentos')
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();

  const todosPagamentos = snapshotPagamentos.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const pagamentosPendentes = todosPagamentos.filter(p =>
    p.mes === mesAtualNum && p.ano === anoAtual && p.status !== 'pago'
  );

  const horaAgora = `${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}`;

  // Conclui automaticamente consultas confirmadas cujo horário já passou
  const consultasParaConcluir = consultasHoje.filter(c =>
    c.status === 'confirmada' && c.hora < horaAgora
  );

  for (const c of consultasParaConcluir) {
    await db.collection('consultas').doc(c.id).update({ status: 'concluida' });
    c.status = 'concluida';
  }

  const proxima = consultasHoje.find(c => c.hora >= horaAgora && c.status !== 'concluida');

  // Atualiza os cards
  document.getElementById('stat-consultas').textContent = consultasHoje.length;
  const concluidas = consultasHoje.filter(c => c.status === 'concluida').length;
  document.getElementById('stat-consultas-sub').textContent = `${concluidas} concluída(s)`;

  document.getElementById('stat-pacientes').textContent = pacientes.length;
  document.getElementById('stat-pacientes-sub').textContent = 'no sistema';

  document.getElementById('stat-pagamentos').textContent = pagamentosPendentes.length;
  document.getElementById('stat-pagamentos-sub').textContent = pagamentosPendentes.length === 1 ? 'pendente' : 'pendentes';

  if (proxima) {
    document.getElementById('stat-proxima').textContent = proxima.hora;
    const minutosRestantes = Math.floor((new Date(`${hoje}T${proxima.hora}`) - agora) / 60000);
    document.getElementById('stat-proxima-sub').textContent = minutosRestantes <= 60
      ? `em ${minutosRestantes} min`
      : `em ${Math.floor(minutosRestantes / 60)}h ${minutosRestantes % 60}min`;
  } else {
    document.getElementById('stat-proxima').textContent = '--';
    document.getElementById('stat-proxima-sub').textContent = 'sem consultas';
  }

  const mapaPacientes = {};
  pacientes.forEach(p => mapaPacientes[p.id] = p.nome);

  function renderConsultasHoje() {
    document.getElementById('dashboard-secao-titulo').textContent = 'Consultas de hoje';
    const lista = document.getElementById('lista-consultas-hoje');

    if (consultasHoje.length === 0) {
      lista.innerHTML = '<p class="vazio">Nenhuma consulta agendada para hoje.</p>';
      return;
    }

    lista.innerHTML = consultasHoje.map(c => {
      const nome = mapaPacientes[c.pacienteId] || 'Paciente';
      const iniciais = nome.split(' ').map(n => n[0]).slice(0, 2).join('');
      return `
        <div class="consulta-item" data-paciente-id="${c.pacienteId}" style="cursor:pointer;">
          <div class="consulta-avatar">${iniciais}</div>
          <div class="consulta-hora">${c.hora}</div>
          <div class="consulta-info">
            <div class="consulta-nome">${nome}</div>
            <div class="consulta-tipo">Sessao individual · ${c.duracao} min</div>
          </div>
          <span class="badge ${c.status}">${c.status.charAt(0).toUpperCase() + c.status.slice(1)}</span>
          ${c.status === 'pendente' ? `
            <div class="consulta-acoes">
              <button class="btn-confirmar" data-id="${c.id}">✓</button>
              <button class="btn-cancelar" data-id="${c.id}">✗</button>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    lista.querySelectorAll('.consulta-item').forEach(item => {
      item.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btn-confirmar') || e.target.classList.contains('btn-cancelar')) return;
        const pacienteId = item.dataset.pacienteId;
        const doc = await db.collection('pacientes').doc(pacienteId).get();
        if (doc.exists) abrirPerfil({ id: doc.id, ...doc.data() });
      });
    });

    document.querySelectorAll('.btn-confirmar').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        await db.collection('consultas').doc(btn.dataset.id).update({ status: 'confirmada' });
        carregarDashboard();
      });
    });

    document.querySelectorAll('.btn-cancelar').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const confirmar = confirm('Tem certeza que deseja cancelar esta consulta?');
        if (confirmar) {
          await db.collection('consultas').doc(btn.dataset.id).update({ status: 'cancelada' });
          carregarDashboard();
        }
      });
    });
  }

  function renderPacientes() {
    document.getElementById('dashboard-secao-titulo').textContent = 'Pacientes ativos';
    const lista = document.getElementById('lista-consultas-hoje');

    if (pacientes.length === 0) {
      lista.innerHTML = '<p class="vazio">Nenhum paciente cadastrado.</p>';
      return;
    }

    pacientes.sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
    lista.innerHTML = pacientes.map(p => {
      const iniciais = p.nome.split(' ').map(n => n[0]).slice(0, 2).join('');
      return `
        <div class="consulta-item" data-paciente-id="${p.id}" style="cursor:pointer;">
          <div class="pac-avatar" style="background:var(--acento2);color:var(--acento)">${iniciais}</div>
          <div class="consulta-info">
            <div class="consulta-nome">${p.nome}</div>
            <div class="consulta-tipo">${p.frequencia || 'Frequencia nao informada'} · ${p.horarioFixo || ''}</div>
          </div>
        </div>
      `;
    }).join('');

    lista.querySelectorAll('.consulta-item').forEach(item => {
      item.addEventListener('click', async () => {
        const pacienteId = item.dataset.pacienteId;
        const doc = await db.collection('pacientes').doc(pacienteId).get();
        if (doc.exists) abrirPerfil({ id: doc.id, ...doc.data() });
      });
    });
  }

  function renderProxima() {
    document.getElementById('dashboard-secao-titulo').textContent = 'Proxima consulta';
    const lista = document.getElementById('lista-consultas-hoje');

    if (!proxima) {
      lista.innerHTML = '<p class="vazio">Nenhuma consulta proxima hoje.</p>';
      return;
    }

    lista.innerHTML = `
      <div class="consulta-item" data-paciente-id="${proxima.pacienteId}" style="cursor:pointer;">
        <div class="consulta-hora">${proxima.hora}</div>
        <div class="consulta-info">
          <div class="consulta-nome">${mapaPacientes[proxima.pacienteId] || 'Paciente'}</div>
          <div class="consulta-tipo">Sessao individual · ${proxima.duracao} min</div>
        </div>
        <span class="badge ${proxima.status}">${proxima.status.charAt(0).toUpperCase() + proxima.status.slice(1)}</span>
      </div>
    `;

    lista.querySelector('.consulta-item').addEventListener('click', async () => {
      const doc = await db.collection('pacientes').doc(proxima.pacienteId).get();
      if (doc.exists) abrirPerfil({ id: doc.id, ...doc.data() });
    });
  }

  function renderPagamentos() {
    document.getElementById('dashboard-secao-titulo').textContent = 'Pagamentos pendentes';
    const lista = document.getElementById('lista-consultas-hoje');

    if (pagamentosPendentes.length === 0) {
      lista.innerHTML = '<p class="vazio">Nenhum pagamento pendente este mês.</p>';
      return;
    }

    pagamentosPendentes.sort((a, b) => {
      const nomeA = mapaPacientes[a.pacienteId] || '';
      const nomeB = mapaPacientes[b.pacienteId] || '';
      return nomeA.localeCompare(nomeB, 'pt-BR');
    });

    lista.innerHTML = pagamentosPendentes.map(p => {
      const nome = mapaPacientes[p.pacienteId] || 'Paciente';
      const iniciais = nome.split(' ').map(n => n[0]).slice(0, 2).join('');
      return `
        <div class="consulta-item" data-paciente-id="${p.pacienteId}" style="cursor:pointer;">
          <div class="pac-avatar" style="background:var(--amarelo2);color:var(--amarelo)">${iniciais}</div>
          <div class="consulta-info">
            <div class="consulta-nome">${nome}</div>
            <div class="consulta-tipo">R$ ${p.valor} · ${p.status === 'pendente' ? 'Pendente' : 'Atrasado'}</div>
          </div>
          <span class="badge ${p.status === 'pendente' ? 'pendente' : 'cancelada'}">${p.status === 'pendente' ? 'Pendente' : 'Atrasado'}</span>
        </div>
      `;
    }).join('');

    lista.querySelectorAll('.consulta-item').forEach(item => {
      item.addEventListener('click', async () => {
        const pacienteId = item.dataset.pacienteId;
        const doc = await db.collection('pacientes').doc(pacienteId).get();
        if (doc.exists) abrirPerfil({ id: doc.id, ...doc.data() });
      });
    });
  }

  // Listeners dos cards
  document.getElementById('card-consultas').onclick = () => {
    document.querySelectorAll('.card-stat').forEach(c => c.classList.remove('ativo'));
    document.getElementById('card-consultas').classList.add('ativo');
    renderConsultasHoje();
  };

  document.getElementById('card-pacientes').onclick = () => {
    document.querySelectorAll('.card-stat').forEach(c => c.classList.remove('ativo'));
    document.getElementById('card-pacientes').classList.add('ativo');
    renderPacientes();
  };

  document.getElementById('card-proxima').onclick = () => {
    document.querySelectorAll('.card-stat').forEach(c => c.classList.remove('ativo'));
    document.getElementById('card-proxima').classList.add('ativo');
    renderProxima();
  };

  document.getElementById('card-pagamentos').onclick = () => {
    document.querySelectorAll('.card-stat').forEach(c => c.classList.remove('ativo'));
    document.getElementById('card-pagamentos').classList.add('ativo');
    renderPagamentos();
  };

  renderConsultasHoje();
}