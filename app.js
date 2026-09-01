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

/* Máscaras de Input */
function mascaraTelefone(valor) {
  valor = valor.replace(/\D/g, '');
  if (valor.length <= 10) {
    valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  } else {
    valor = valor.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  }
  return valor;
}

function mascaraCPF(valor) {
  valor = valor.replace(/\D/g, '');
  valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
  return valor;
}

function mascaraCNPJ(valor) {
  valor = valor.replace(/\D/g, '');
  valor = valor.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, '$1.$2.$3/$4-$5');
  return valor;
}

function mascaraCRP(valor) {
  valor = valor.replace(/\D/g, '');
  valor = valor.replace(/(\d{2})(\d{0,5})/, 'CRP $1/$2');
  return valor;
}

function aplicarMascara(id, fn) {
  const el = document.getElementById(id);
  if (!el) return;
  el.addEventListener('input', () => {
    el.value = fn(el.value);
  });
}

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
    
    const iconeEscuro = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd"/></svg> Modo escuro`;
    
    const iconeClaro = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.166 17.834a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 001.061-1.06l-1.59-1.591zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.166 6.166a.75.75 0 001.06 1.06l1.591-1.59a.75.75 0 00-1.06-1.061L6.166 6.166z"/></svg> Modo claro`;

    btnTema.innerHTML = escuro ? iconeEscuro : iconeClaro;
    btnTemaConfig.innerHTML = escuro ? iconeEscuro : iconeClaro;
    localStorage.setItem('consultorio_tema', escuro ? 'escuro' : 'claro');
}

btnTema.addEventListener('click', alternarTema);
btnTemaConfig.addEventListener('click', alternarTema);

/* Tamanho da Fonte */
function aplicarFonte(tamanho) {
  const escala = tamanho / 15;
  document.getElementById('app').style.zoom = escala;
  localStorage.setItem('consultorio_fonte', tamanho);
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

function mascaraMoeda(valor) {
  valor = valor.replace(/\D/g, '');
  valor = (Number(valor) / 100).toFixed(2);
  valor = valor.replace('.', ',');
  valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  return 'R$ ' + valor;
}

function configurarMascaras() {
  // Cadastro de paciente
  aplicarMascara('pac-telefone', mascaraTelefone);
  aplicarMascara('pac-celular', mascaraTelefone);
  aplicarMascara('pac-cpf', mascaraCPF);
  aplicarMascara('pac-responsavel-telefone', mascaraTelefone);
  aplicarMascara('pac-responsavel-celular', mascaraTelefone);
  aplicarMascara('pac-responsavel-cpf', mascaraCPF);
  aplicarMascara('pac-valor-sessao', mascaraMoeda);
  aplicarMascara('pagamento-valor', mascaraMoeda);
  aplicarMascara('consulta-valor-encaixe', mascaraMoeda);

  // Configurações
  aplicarMascara('config-cnpj', mascaraCNPJ);
  aplicarMascara('config-telefone', mascaraTelefone);
  aplicarMascara('config-crp', mascaraCRP);
}

function formatarMoeda(valor) {
  if (!valor || valor === '' || valor === null || valor === undefined) return '—';
  let limpo = String(valor).replace(/R\$\s?/g, '').trim();
  limpo = limpo.replace(/\./g, '').replace(',', '.');
  const num = parseFloat(limpo);
  if (isNaN(num)) return '—';
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function limparMoeda(valor) {
  if (!valor) return '';
  let limpo = String(valor).replace(/R\$\s?/g, '').trim();
  
  // Formato BR: 1.234,56 — tem vírgula como decimal
  if (limpo.includes(',')) {
    // Remove pontos de milhar e troca vírgula por ponto
    limpo = limpo.replace(/\./g, '').replace(',', '.');
  }
  // Formato simples: 600 ou 600.00 — não precisa fazer nada
  
  const num = parseFloat(limpo);
  return isNaN(num) ? '' : String(num);
}

configurarMascaras();

/* Sons do sistema */
const sons = {
  notificacao: new Audio('assets/sounds/notificacao.mp3'),
  alerta: new Audio('assets/sounds/alerta.mp3'),
  sessaoEncerrada: new Audio('assets/sounds/sessao-encerrada.mp3')
};

function tocarSom(nome) {
  try {
    sons[nome].currentTime = 0;
    sons[nome].play();
  } catch (e) {
    console.log('Som não disponível:', nome);
  }
}

/* Correções de Valores Monetários */
async function corrigirValoresMonetariosApp() {
  const snapshot = await db.collection('pacientes')
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();

  for (const doc of snapshot.docs) {
    const valor = doc.data().valorSessao;
    if (!valor) continue;

    const limpo = String(valor).replace(/R\$\s?/g, '').trim().replace(/\./g, '').replace(',', '.');
    const num = parseFloat(limpo);

    if (!isNaN(num) && String(num) !== String(valor)) {
      await doc.ref.update({ valorSessao: String(num) });
    }
  }
}

/* Inicialização */
function inicializar() {
  document.getElementById('tela-loading').classList.add('escondido');

  const iconeClaro = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.166 17.834a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 001.061-1.06l-1.59-1.591zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.166 6.166a.75.75 0 001.06 1.06l1.591-1.59a.75.75 0 00-1.06-1.061L6.166 6.166z"/></svg> Modo claro`;

  const iconeEscuro = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path fill-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clip-rule="evenodd"/></svg> Modo escuro`;

  const temaSalvo = localStorage.getItem('consultorio_tema') || 'escuro';
  
  if (temaSalvo === 'escuro') {
    document.body.classList.add('escuro');
    if (btnTema) btnTema.innerHTML = iconeEscuro;
    if (btnTemaConfig) btnTemaConfig.innerHTML = iconeEscuro;
  } else {
    document.body.classList.remove('escuro');
    if (btnTema) btnTema.innerHTML = iconeClaro;
    if (btnTemaConfig) btnTemaConfig.innerHTML = iconeClaro;
  }

  const fonteSalva = localStorage.getItem('consultorio_fonte');
  if (fonteSalva) {
    tamanhoFonte = parseInt(fonteSalva);
    aplicarFonte(tamanhoFonte);
  }

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

        const loading = document.getElementById('tela-loading');
        loading.classList.remove('escondido');
        setTimeout(() => {
            loading.classList.add('escondido');
            mostrarTela(telaLogin);
        }, 2000);
    } catch (erro) {
        if (erro.code === 'auth/email-already-in-use') {
            erroCadastro.textContent = 'Este e-mail já está cadastrado.';
        } else {
            erroCadastro.textContent = 'Erro ao criar conta. Tente novamente.';
        }
    }
});

// Login por ID - Admin ou Doutor
async function carregarAppDoUsuario(uid, dadosUsuario) {
  usuarioLogado = { uid, ...dadosUsuario };

  atualizarSaudacao();
  carregarPacientes();
  carregarConfiguracoes();
  await gerarConsultasTodosPacientes();
  await gerarPagamentosMesTodosPacientes();
  await corrigirValoresMonetariosApp();
  const loading = document.getElementById('tela-loading');
  loading.classList.remove('escondido');
  mostrarTela(app);
  navegarPara('dashboard');
  setTimeout(() => {
      loading.classList.add('escondido');
  }, 2000);
  pedirPermissaoNotificacao();
  verificarNotificacoes();
  setInterval(verificarNotificacoes, 30 * 60 * 1000);
}

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

    try {
        await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        const credencial = await auth.signInWithEmailAndPassword(email, senha);
        const uid = credencial.user.uid;

        const docUsuario = await db.collection('usuarios').doc(uid).get();
        const dadosUsuario = docUsuario.data();

        if (dadosUsuario && dadosUsuario.admin === true) {
          window.location.href = 'admin.html';
          return;
        }

        erroLogin.textContent = '';
        inputSenha.value = '';
        document.getElementById('input-email-login').value = '';

        await carregarAppDoUsuario(uid, dadosUsuario);
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
        const statusClasse = p.status === 'alta' ? 'status-alta'
                            : p.status === 'desistente' ? 'status-desistente'
                            : '';
        return `
            <div class="paciente-card ${statusClasse}" data-id="${p.id}">
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

// Modal de Relatórios por Período
function abrirModalRelatorio() {
    document.getElementById('modal-relatorio-periodo').classList.remove('escondido');
}

function fecharModalRelatorio() {
    document.getElementById('modal-relatorio-periodo').classList.add('escondido');
    document.getElementById('relatorio-data-inicio').value = '';
    document.getElementById('relatorio-data-fim').value = '';
    document.getElementById('erro-relatorio-periodo').textContent = '';
}

document.getElementById('btn-relatorio-periodo').addEventListener('click', abrirModalRelatorio);
document.getElementById('btn-fechar-modal-relatorio').addEventListener('click', fecharModalRelatorio);
document.getElementById('fundo-relatorio').addEventListener('click', fecharModalRelatorio);

document.getElementById('btn-gerar-relatorio-periodo').addEventListener('click', async () => {
  const dataInicio = document.getElementById('relatorio-data-inicio').value;
  const dataFim = document.getElementById('relatorio-data-fim').value;
  const erro = document.getElementById('erro-relatorio-periodo');

  if (!dataInicio || !dataFim) {
    erro.textContent = 'Selecione a data inicial e a data final.';
    return;
  }

  if (dataInicio > dataFim) {
    erro.textContent = 'A data inicial não pode ser depois da data final.';
    return;
  }

  await exportarSessoesPeriodo(dataInicio, dataFim);
  fecharModalRelatorio();
});

// Modal de Atestado
function abrirModalAtestado() {
    document.getElementById('modal-atestado').classList.remove('escondido');
    document.getElementById('atestado-horario').value = pacienteAtual.horarioFixo || '';
}

function fecharModalAtestado() {
    document.getElementById('modal-atestado').classList.add('escondido');
    document.getElementById('atestado-tipo').value = '';
    document.getElementById('atestado-horario').value = '';
    document.getElementById('atestado-acompanhante').value = '';
    document.getElementById('atestado-necessita-repouso').checked = false;
    document.getElementById('atestado-dias-repouso').value = '';
    document.getElementById('erro-atestado').textContent = '';
}

document.getElementById('btn-gerar-atestado').addEventListener('click', async () => {
  const tipo = document.getElementById('atestado-tipo').value;
  const horario = document.getElementById('atestado-horario').value;
  const acompanhante = document.getElementById('atestado-acompanhante').value.trim();
  const necessitaRepouso = document.getElementById('atestado-necessita-repouso').checked;
  const diasRepouso = document.getElementById('atestado-dias-repouso').value;
  const erro = document.getElementById('erro-atestado');

  if (!tipo) {
    erro.textContent = 'Selecione o tipo de atestado.';
    return;
  }

  if (tipo === 'acompanhamento' && !acompanhante) {
    erro.textContent = 'Informe o nome do acompanhante.';
    return;
  }

  erro.textContent = '';
  await exportarAtestado(tipo, { horario, acompanhante, necessitaRepouso, diasRepouso });
  fecharModalAtestado();
});

document.getElementById('btn-atestado').addEventListener('click', abrirModalAtestado);
document.getElementById('btn-fechar-modal-atestado').addEventListener('click', fecharModalAtestado);
document.getElementById('fundo-atestado').addEventListener('click', fecharModalAtestado);

// Tipo de Atestado
document.getElementById('atestado-tipo').addEventListener('change', (e) => {
  const tipo = e.target.value;
  const camposComuns = document.getElementById('atestado-campos-comuns');
  const campoAcompanhante = document.getElementById('atestado-campo-acompanhante');
  const campoRepouso = document.getElementById('atestado-campo-repouso');

  if (tipo === 'comparecimento') {
    camposComuns.classList.remove('escondido');
    campoAcompanhante.classList.add('escondido');
    campoRepouso.classList.remove('escondido');
  } else if (tipo === 'acompanhamento') {
    camposComuns.classList.remove('escondido');
    campoAcompanhante.classList.remove('escondido');
    campoRepouso.classList.add('escondido');
  } else {
    camposComuns.classList.add('escondido');
    campoAcompanhante.classList.add('escondido');
    campoRepouso.classList.add('escondido');
  }
});

document.getElementById('atestado-necessita-repouso').addEventListener('change', (e) => {
  const wrap = document.getElementById('atestado-dias-repouso-wrap');
  if (e.target.checked) {
    wrap.classList.remove('escondido');
  } else {
    wrap.classList.add('escondido');
    document.getElementById('atestado-dias-repouso').value = '';
  }
});

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
    const valorSessaoRaw = document.getElementById('pac-valor-sessao').value.trim();
    const valorSessao = limparMoeda(valorSessaoRaw);
    const formaPagamento = document.getElementById('pac-forma-pagamento').value;
    const profissional = document.getElementById('pac-profissional').value.trim();
    const frequencia = document.getElementById('pac-frequencia').value;
    const modalidade = document.getElementById('pac-modalidade').value;
    console.log('modalidade selecionada:', modalidade);
    const diaSemana = document.getElementById('pac-dia-semana').value;
    const horarioFixo = document.getElementById('pac-horario-fixo').value;
    const duracao = document.getElementById('pac-duracao').value;
    const motivo = document.getElementById('pac-motivo').value.trim();
    const observacoes = document.getElementById('pac-observacoes').value.trim();
    const status = document.getElementById('pac-status').value;

    if (!nome) {
        erroPaciente.textContent = 'O nome do paciente é obrigatório.';
        return;
    }

    if (!frequencia || !diaSemana || !horarioFixo) {
        erroPaciente.textContent = 'Frequência, dia da semana e horário fixo são obrigatórios.';
        return;
    }

    // Verifica conflito de horário
    if (btnSalvarPaciente.dataset.modo !== 'editar') {
        const snapshotConflito = await db.collection('pacientes')
            .where('usuarioId', '==', usuarioLogado.uid)
            .where('diaSemana', '==', diaSemana)
            .where('horarioFixo', '==', horarioFixo)
            .get();

        if (!snapshotConflito.empty) {
            const pacienteConflito = snapshotConflito.docs[0].data();
            const confirmar = confirm(`Atenção! ${pacienteConflito.nome} já tem sessão nesse dia e horário. Deseja cadastrar mesmo assim?`);
            if (!confirmar) return;
        }
    }

    const dadosPaciente = {
        nome, dataNascimento, cpf, endereco, telefone, celular, email,
        estadoCivil, escolaridade, ocupacao, filiacao1Parentesco, filiacao1Nome, 
        filiacao2Parentesco, filiacao2Nome,
        responsavelNome, responsavelParentesco, responsavelCpf,
        responsavelTelefone, responsavelCelular, responsavelEmail,
        dataInicio, frequencia, diaSemana, horarioFixo, duracao, modalidade,
        valorSessao: limparMoeda(valorSessao),
        formaPagamento, profissional, motivo, observacoes, status
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
    const valorLimpo = limparMoeda(valorSessao);
    
    await db.collection('pagamentos').add({
        pacienteId: novoDoc.id,
        usuarioId: usuarioLogado.uid,
        mes: agora.getMonth() + 1,
        ano: agora.getFullYear(),
        valor: valorLimpo,
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
let cronoFimTimestamp = null; // horário (ms) em que o cronômetro deve zerar
let cronoPausado = false;
let cronoSegundosRestantesAoPausar = 0;

function atualizarDisplayCrono(segundos) {
  const display = document.getElementById('crono-tempo');
  const min = String(Math.floor(segundos / 60)).padStart(2, '0');
  const seg = String(segundos % 60).padStart(2, '0');
  display.textContent = `${min}:${seg}`;
}

function tickCrono() {
  const agora = Date.now();
  const restanteMs = cronoFimTimestamp - agora;
  const restanteSegundos = Math.max(0, Math.round(restanteMs / 1000));

  atualizarDisplayCrono(restanteSegundos);

  if (restanteSegundos <= 0) {
    clearInterval(cronoInterval);
    document.getElementById('crono-tempo').classList.add('encerrado');
    document.getElementById('btn-pausar-sessao').style.display = 'none';
    tocarSom('sessaoEncerrada');
    alert('Sessão encerrada!');
  }
}

function iniciarCrono(duracaoMinutos) {
  clearInterval(cronoInterval);
  cronoFimTimestamp = Date.now() + duracaoMinutos * 60 * 1000;
  cronoPausado = false;

  const display = document.getElementById('crono-tempo');
  const btnIniciar = document.getElementById('btn-iniciar-sessao');
  const btnPausar = document.getElementById('btn-pausar-sessao');
  const btnResetar = document.getElementById('btn-resetar-sessao');

  btnIniciar.style.display = 'none';
  btnPausar.style.display = 'inline-block';
  btnResetar.style.display = 'inline-block';
  display.classList.remove('encerrado');

  cronoInterval = setInterval(tickCrono, 1000);
  tickCrono(); // já atualiza no primeiro instante, sem esperar 1s
}

function pausarCrono() {
  const btnPausar = document.getElementById('btn-pausar-sessao');

  if (!cronoPausado) {
    clearInterval(cronoInterval);
    cronoSegundosRestantesAoPausar = Math.max(0, Math.round((cronoFimTimestamp - Date.now()) / 1000));
    cronoPausado = true;
    btnPausar.textContent = 'Retomar';
  } else {
    cronoFimTimestamp = Date.now() + cronoSegundosRestantesAoPausar * 1000;
    cronoPausado = false;
    btnPausar.textContent = 'Pausar';

    cronoInterval = setInterval(tickCrono, 1000);
    tickCrono();
  }
}

function resetarCrono(duracaoMinutos) {
  clearInterval(cronoInterval);
  cronoPausado = false;
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
  document.getElementById('pf-valor').textContent = paciente.valorSessao ? formatarMoeda(paciente.valorSessao) : 'Não informado';
  document.getElementById('pf-pagamento').textContent = paciente.formaPagamento || 'Não informado';
  document.getElementById('pf-profissional').textContent = paciente.profissional || 'Não informado';
  document.getElementById('pf-modalidade').textContent = 
    paciente.modalidade === 'online' ? 'Online' :
    paciente.modalidade === 'hibrida' ? 'Híbrida' : 'Presencial';

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
  carregarGraficoEvolucao(paciente.id);
  carregarPagamentos(paciente.id);
}

// Controle de Pagamentos
async function carregarPagamentos(pacienteId) {
  const snapshot = await db.collection('pagamentos')
    .where('pacienteId', '==', pacienteId)
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();

  const pagamentos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  // Busca os encaixes (sessões extras) do paciente
  const snapshotEncaixes = await db.collection('consultas')
    .where('pacienteId', '==', pacienteId)
    .where('usuarioId', '==', usuarioLogado.uid)
    .where('encaixe', '==', true)
    .where('tipoEncaixe', '==', 'extra')
    .get();

  const encaixes = snapshotEncaixes.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  const agora = new Date();
  const mesAtualNum = agora.getMonth() + 1;
  const anoAtual = agora.getFullYear();

  const meses = ['', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  // Monta o select de anos automaticamente
  const anosExistentes = new Set(pagamentos.map(p => p.ano));
  anosExistentes.add(anoAtual);
  const anosOrdenados = [...anosExistentes].sort((a, b) => b - a);

  const selectAno = document.getElementById('filtro-ano-pagamento');
  selectAno.innerHTML = anosOrdenados.map(ano =>
    `<option value="${ano}" ${ano === anoAtual ? 'selected' : ''}>${ano}</option>`
  ).join('');

  // Agrupa os encaixes por ano-mês
  function encaixesDoMes(ano, mes) {
    return encaixes.filter(e => {
      const [anoEncaixe, mesEncaixe] = e.data.split('-').map(Number);
      return anoEncaixe === ano && mesEncaixe === mes;
    });
  }

    function renderPagamentos() {
    const anoFiltrado = Number(selectAno.value);

    const pagamentosFiltrados = pagamentos
      .filter(p => p.ano === anoFiltrado)
      .sort((a, b) => a.mes - b.mes);

    const encaixesDoAno = encaixes.filter(e => Number(e.data.split('-')[0]) === anoFiltrado);
    const encaixesPagosAno = encaixesDoAno.filter(e => (e.statusEncaixe || 'pendente') === 'pago');
    const totalEncaixesPagosAno = encaixesPagosAno.reduce((acc, e) => acc + Number(e.valorEncaixe || 0), 0);
    const totalEncaixesPendentesAno = encaixesDoAno
      .filter(e => (e.statusEncaixe || 'pendente') !== 'pago')
      .reduce((acc, e) => acc + Number(e.valorEncaixe || 0), 0);

    // Resumo anual
    const resumo = document.getElementById('resumo-pagamentos-anual');
    const totalPago = pagamentosFiltrados
      .filter(p => p.status === 'pago')
      .reduce((acc, p) => acc + Number(p.valor || 0), 0) + totalEncaixesPagosAno;
    const totalPendente = pagamentosFiltrados
      .filter(p => p.status !== 'pago')
      .reduce((acc, p) => acc + Number(p.valor || 0), 0) + totalEncaixesPendentesAno;

    resumo.innerHTML = `
      <div class="pagamento-item" style="background:var(--bg);">
        <div class="pagamento-mes">Resumo ${anoFiltrado}</div>
        <div class="pagamento-valor" style="color:var(--verde)">Pago: R$ ${totalPago.toFixed(2).replace('.', ',')}</div>
        <div class="pagamento-valor" style="color:var(--amarelo)">Pendente: R$ ${totalPendente.toFixed(2).replace('.', ',')}</div>
      </div>
    `;

    const lista = document.getElementById('lista-pagamentos');

    if (pagamentosFiltrados.length === 0) {
      lista.innerHTML = '<p class="vazio">Nenhum pagamento registrado neste ano.</p>';
      return;
    }

    lista.innerHTML = pagamentosFiltrados.map(p => {
      let status = p.status;
      if (status === 'pendente' && (p.ano < anoAtual || (p.ano === anoAtual && p.mes < mesAtualNum))) {
        status = 'atrasado';
      }

      const encaixesMes = encaixesDoMes(p.ano, p.mes);
      const totalEncaixesMes = encaixesMes.reduce((acc, e) => acc + Number(e.valorEncaixe || 0), 0);

      return `
        <div class="pagamento-item">
          <div class="pagamento-mes">
            ${meses[p.mes]} ${p.ano}
            ${encaixesMes.length > 0 ? `
              <div style="font-size:11px;color:var(--texto2);font-weight:400;margin-top:4px;">
                ${encaixesMes.map(e => {
                  const statusEnc = e.statusEncaixe || 'pendente';
                  return `
                    <div style="display:flex;align-items:center;gap:6px;margin-top:2px;">
                      <span>+ Encaixe (${new Date(e.data + 'T12:00:00').toLocaleDateString('pt-BR')}): ${formatarMoeda(e.valorEncaixe)}</span>
                      <button class="pagamento-status ${statusEnc}" data-encaixe-id="${e.id}" data-status="${statusEnc}" style="font-size:10px;padding:2px 8px;">
                        ${statusEnc === 'pago' ? 'Pago' : 'Pendente'}
                      </button>
                    </div>
                  `;
                }).join('')}
              </div>
            ` : ''}
          </div>
          <div class="pagamento-valor">
            ${formatarMoeda(p.valor)}
            ${totalEncaixesMes > 0 ? `<div style="font-size:12px;color:var(--acento);">Total: R$ ${(Number(p.valor || 0) + totalEncaixesMes).toFixed(2).replace('.', ',')}</div>` : ''}
          </div>
          <button class="pagamento-status ${status}" data-id="${p.id}" data-status="${p.status}">
            ${status === 'pago' ? 'Pago' : status === 'atrasado' ? 'Atrasado' : 'Pendente'}
          </button>
          ${p.status === 'pago' ? `<button class="btn-nav btn-recibo" data-id="${p.id}" style="font-size:12px;padding:4px 10px;">Recibo</button>` : ''}
        </div>
      `;
    }).join('');

    document.querySelectorAll('.pagamento-status[data-id]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.dataset.id;
        const statusAtual = btn.dataset.status;
        const novoStatus = statusAtual === 'pago' ? 'pendente' : 'pago';
        const dataPagamento = novoStatus === 'pago' ? new Date().toISOString().split('T')[0] : null;
        await db.collection('pagamentos').doc(id).update({ status: novoStatus, dataPagamento });
        carregarPagamentos(pacienteAtual.id);
      });
    });

    document.querySelectorAll('.pagamento-status[data-encaixe-id]').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = btn.dataset.encaixeId;
        const statusAtual = btn.dataset.status;
        const novoStatus = statusAtual === 'pago' ? 'pendente' : 'pago';
        await db.collection('consultas').doc(id).update({ statusEncaixe: novoStatus });
        carregarPagamentos(pacienteAtual.id);
      });
    });

    document.querySelectorAll('.btn-recibo').forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const snap = await db.collection('pagamentos').doc(id).get();
        const pagamento = { id: snap.id, ...snap.data() };
        const encaixesMesPagos = encaixesDoMes(pagamento.ano, pagamento.mes)
          .filter(e => (e.statusEncaixe || 'pendente') === 'pago');
        gerarRecibo(pagamento, encaixesMesPagos);
      });
    });
  }

  selectAno.onchange = renderPagamentos;
  renderPagamentos();
}

async function gerarRecibo(pagamento, encaixesMes = []) {
  const docConfig = await db.collection('configuracoes').doc(usuarioLogado.uid).get();
  const config = docConfig.exists ? docConfig.data() : {};

  const meses = ['', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const agora = new Date();
  const dataEmissao = agora.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  const numeroRecibo = `${pagamento.ano}${String(pagamento.mes).padStart(2, '0')}-${pagamento.id.substring(0, 6).toUpperCase()}`;

  const totalEncaixes = encaixesMes.reduce((acc, e) => acc + Number(e.valorEncaixe || 0), 0);
  const valorTotal = Number(pagamento.valor || 0) + totalEncaixes;

  // Verifica se é menor de idade e tem responsável
  let nomeRecibo = pacienteAtual.nome;
  let cpfRecibo = pacienteAtual.cpf || null;
  let ehResponsavel = false;

  if (pacienteAtual.dataNascimento) {
    const nascimento = new Date(pacienteAtual.dataNascimento + 'T12:00:00');
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const m = hoje.getMonth() - nascimento.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nascimento.getDate())) idade--;

    if (idade < 18 && pacienteAtual.responsavelNome) {
      nomeRecibo = pacienteAtual.responsavelNome;
      cpfRecibo = pacienteAtual.responsavelCpf || null;
      ehResponsavel = true;
    }
  }

  const conteudo = document.createElement('div');
  conteudo.style.cssText = 'font-family:Arial,sans-serif;max-width:800px;padding:40px;color:#2C2A27;background:#ffffff;';
  conteudo.innerHTML = `
    <!-- Cabeçalho -->
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid #5B7FA6;">
      <div style="display:flex;align-items:center;gap:16px;">
        <img src="assets/logo.jpg" style="height:64px;width:auto;border-radius:8px;" />
        <div>
          <h1 style="font-size:17px;color:#5B7FA6;margin:0;font-weight:700;">${config.nomeEmpresa || config.nomeClinica || 'Consultório'}</h1>
          ${config.cnpj ? `<div style="font-size:11px;color:#6B6760;margin-top:2px;">CNPJ: ${config.cnpj}</div>` : ''}
          ${config.enderecoClinica ? `<div style="font-size:11px;color:#6B6760;">${config.enderecoClinica}</div>` : ''}
          ${config.telefoneClinica ? `<div style="font-size:11px;color:#6B6760;">Tel: ${config.telefoneClinica}</div>` : ''}
        </div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:10px;color:#6B6760;text-transform:uppercase;letter-spacing:1.5px;">Recibo de Pagamento</div>
        <div style="font-size:20px;font-weight:700;color:#5B7FA6;margin-top:2px;">Nº ${numeroRecibo}</div>
        <div style="font-size:11px;color:#6B6760;margin-top:2px;">Emitido em ${dataEmissao}</div>
      </div>
    </div>

    <!-- Dados -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px;">
      <div style="background:#F7F5F2;border-radius:8px;padding:16px;">
        <div style="font-size:10px;color:#6B6760;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">
          ${ehResponsavel ? 'Responsável pelo paciente' : 'Paciente'}
        </div>
        <div style="font-size:15px;font-weight:700;color:#2C2A27;">${nomeRecibo}</div>
        ${cpfRecibo ? `<div style="font-size:12px;color:#6B6760;margin-top:4px;">CPF: ${cpfRecibo}</div>` : ''}
        ${ehResponsavel ? `<div style="font-size:12px;color:#6B6760;margin-top:4px;">Paciente: ${pacienteAtual.nome}</div>` : ''}
        ${!ehResponsavel && pacienteAtual.telefone ? `<div style="font-size:12px;color:#6B6760;margin-top:4px;">Tel: ${pacienteAtual.telefone}</div>` : ''}
      </div>
      <div style="background:#F7F5F2;border-radius:8px;padding:16px;">
        <div style="font-size:10px;color:#6B6760;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Referência</div>
        <div style="font-size:15px;font-weight:700;color:#2C2A27;">${meses[pagamento.mes]} de ${pagamento.ano}</div>
        <div style="font-size:12px;color:#6B6760;margin-top:4px;">Sessões de Psicologia</div>
        ${pagamento.dataPagamento ? `<div style="font-size:12px;color:#6B6760;margin-top:4px;">Pago em: ${new Date(pagamento.dataPagamento + 'T12:00:00').toLocaleDateString('pt-BR')}</div>` : ''}
        <div style="font-size:12px;color:#6B6760;margin-top:4px;">Forma: ${pacienteAtual.formaPagamento || 'Não informado'}</div>
      </div>
    </div>

    ${encaixesMes.length > 0 ? `
    <!-- Detalhamento -->
    <div style="background:#F7F5F2;border-radius:8px;padding:16px;margin-bottom:24px;">
      <div style="font-size:10px;color:#6B6760;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">Detalhamento</div>
      <div style="display:flex;justify-content:space-between;font-size:13px;padding:6px 0;border-bottom:1px solid #EDEAE5;">
        <span>Sessões mensais</span>
        <span style="font-weight:600;">R$ ${Number(pagamento.valor || 0).toFixed(2)}</span>
      </div>
      ${encaixesMes.map(e => `
        <div style="display:flex;justify-content:space-between;font-size:13px;padding:6px 0;border-bottom:1px solid #EDEAE5;">
          <span>Encaixe (${new Date(e.data + 'T12:00:00').toLocaleDateString('pt-BR')})</span>
          <span style="font-weight:600;">R$ ${Number(e.valorEncaixe || 0).toFixed(2)}</span>
        </div>
      `).join('')}
    </div>
    ` : ''}

    <!-- Valor -->
    <div style="background:linear-gradient(135deg,#5B7FA6,#4a6d94);border-radius:12px;padding:24px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;">
      <div>
        <div style="font-size:11px;color:#ffffff;opacity:0.8;text-transform:uppercase;letter-spacing:1px;">Valor recebido</div>
        <div style="font-size:36px;font-weight:700;color:#ffffff;margin-top:4px;">R$ ${valorTotal.toFixed(2)}</div>
      </div>
      <div style="background:rgba(255,255,255,0.15);border-radius:8px;padding:12px 20px;text-align:center;">
        <div style="font-size:10px;color:#ffffff;opacity:0.8;text-transform:uppercase;letter-spacing:1px;">Status</div>
        <div style="font-size:14px;font-weight:700;color:#ffffff;margin-top:4px;">Pago</div>
      </div>
    </div>

    <!-- Declaração -->
    <div style="border:1px dashed #D8D4CE;border-radius:8px;padding:16px;margin-bottom:40px;background:#FDFCFB;">
      <p style="font-size:12px;color:#6B6760;margin:0;line-height:1.8;">
        Declaro que recebi de <strong style="color:#2C2A27;">${nomeRecibo}</strong>${cpfRecibo ? `, CPF ${cpfRecibo},` : ''} 
        a importância de <strong style="color:#2C2A27;">R$ ${valorTotal.toFixed(2)}</strong> 
        referente às sessões de psicologia do mês de <strong style="color:#2C2A27;">${meses[pagamento.mes]} de ${pagamento.ano}</strong>${encaixesMes.length > 0 ? ', incluindo sessão(ões) extra(s) de encaixe realizada(s) no período,' : ''}
        ${ehResponsavel ? ` prestadas ao(à) paciente <strong style="color:#2C2A27;">${pacienteAtual.nome}</strong>` : ''}.
        Para maior clareza, firmo o presente recibo.
      </p>
    </div>

    <!-- Assinatura -->
    <div style="display:flex;justify-content:center;margin-top:16px;">
      <div style="text-align:center;">
        <div style="border-top:1px solid #2C2A27;padding-top:10px;width:280px;">
          <div style="font-size:13px;font-weight:600;color:#2C2A27;">${config.nomeProfissional || ''}</div>
          ${config.crp ? `<div style="font-size:11px;color:#6B6760;margin-top:2px;">${config.crp}</div>` : ''}
          ${config.cnpj ? `<div style="font-size:11px;color:#6B6760;">CNPJ: ${config.cnpj}</div>` : ''}
        </div>
        <div style="font-size:11px;color:#6B6760;margin-top:12px;">Brasília, ${dataEmissao}</div>
      </div>
    </div>

    <!-- Rodapé -->
    <div style="font-size:10px;color:#9C9890;text-align:center;border-top:1px solid #EDEAE5;padding-top:16px;margin-top:32px;">
      Documento gerado pelo sistema APSI · ${config.nomeEmpresa || config.nomeClinica || ''} · ${config.cnpj || ''}
    </div>
  `;

  document.body.appendChild(conteudo);

  const canvas = await html2canvas(conteudo, { scale: 2, useCORS: true });
  const imgData = canvas.toDataURL('image/png');

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p', 'mm', 'a4');
  const largura = pdf.internal.pageSize.getWidth();
  const altura = (canvas.height * largura) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, largura, altura);
  pdf.save(`recibo-${nomeRecibo.toLowerCase().replace(/\s+/g, '-')}-${meses[pagamento.mes].toLowerCase()}-${pagamento.ano}.pdf`);

  document.body.removeChild(conteudo);
}

/* Exportar histórico de pagamentos */
document.getElementById('btn-exportar-historico').addEventListener('click', async () => {
  const anoFiltrado = Number(document.getElementById('filtro-ano-pagamento').value);

  const snapshotPagamentos = await db.collection('pagamentos')
    .where('pacienteId', '==', pacienteAtual.id)
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();

  const pagamentos = snapshotPagamentos.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(p => p.ano === anoFiltrado)
    .sort((a, b) => a.mes - b.mes);

  const docConfig = await db.collection('configuracoes').doc(usuarioLogado.uid).get();
  const config = docConfig.exists ? docConfig.data() : {};

  const meses = ['', 'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

  const totalPago = pagamentos.filter(p => p.status === 'pago').reduce((acc, p) => acc + Number(p.valor || 0), 0);
  const totalPendente = pagamentos.filter(p => p.status !== 'pago').reduce((acc, p) => acc + Number(p.valor || 0), 0);

  const agora = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  const linhasPagamentos = pagamentos.map((p, i) => `
    <tr style="background:${i % 2 === 0 ? '#ffffff' : '#F7F5F2'};">
      <td style="padding:10px 12px;font-size:13px;border-bottom:1px solid #EDEAE5;">${i + 1}</td>
      <td style="padding:10px 12px;font-size:13px;border-bottom:1px solid #EDEAE5;">${meses[p.mes]}</td>
      <td style="padding:10px 12px;font-size:13px;border-bottom:1px solid #EDEAE5;font-weight:600;">R$ ${Number(p.valor || 0).toFixed(2)}</td>
      <td style="padding:10px 12px;font-size:13px;border-bottom:1px solid #EDEAE5;">
        <span style="font-size:13px;color:${p.status === 'pago' ? '#2C2A27' : '#C46060'};font-weight:${p.status === 'pago' ? 'normal' : '600'};">
          ${p.status === 'pago' ? 'Pago' : 'Pendente'}
        </span>
      </td>
      <td style="padding:10px 12px;font-size:13px;border-bottom:1px solid #EDEAE5;">${p.dataPagamento ? new Date(p.dataPagamento + 'T12:00:00').toLocaleDateString('pt-BR') : '—'}</td>
    </tr>
  `).join('');

  const conteudo = document.createElement('div');
  conteudo.style.cssText = 'font-family:Arial,sans-serif;max-width:800px;padding:40px;color:#2C2A27;background:#ffffff;';
  conteudo.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:32px;border-bottom:2px solid #5B7FA6;padding-bottom:16px;">
      <div style="display:flex;align-items:center;gap:16px;">
        <img src="assets/logo.jpg" style="height:60px;width:auto;border-radius:8px;" />
        <div>
          <h1 style="font-size:18px;color:#5B7FA6;margin:0;font-weight:700;">${config.nomeEmpresa || config.nomeClinica || 'Consultório'}</h1>
          ${config.cnpj ? `<div style="font-size:11px;color:#6B6760;margin-top:2px;">CNPJ: ${config.cnpj}</div>` : ''}
          ${config.enderecoClinica ? `<div style="font-size:11px;color:#6B6760;">${config.enderecoClinica}</div>` : ''}
          ${config.telefoneClinica ? `<div style="font-size:11px;color:#6B6760;">Tel: ${config.telefoneClinica}</div>` : ''}
        </div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:11px;color:#6B6760;text-transform:uppercase;letter-spacing:1px;">Histórico de Pagamentos</div>
        <div style="font-size:28px;font-weight:700;color:#5B7FA6;">${anoFiltrado}</div>
      </div>
    </div>

    <div style="margin-bottom:24px;">
      <div style="font-size:13px;color:#6B6760;">Paciente</div>
      <div style="font-size:16px;font-weight:600;">${pacienteAtual.nome}</div>
    </div>

    <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
      <thead>
        <tr style="background:#5B7FA6;color:#ffffff;">
          <th style="padding:10px 12px;text-align:left;font-size:12px;font-weight:600;border-radius:4px 0 0 4px;">#</th>
          <th style="padding:10px 12px;text-align:left;font-size:12px;font-weight:600;">Mês</th>
          <th style="padding:10px 12px;text-align:left;font-size:12px;font-weight:600;">Valor</th>
          <th style="padding:10px 12px;text-align:left;font-size:12px;font-weight:600;">Status</th>
          <th style="padding:10px 12px;text-align:left;font-size:12px;font-weight:600;border-radius:0 4px 4px 0;">Data do pagamento</th>
        </tr>
      </thead>
      <tbody>
        ${linhasPagamentos}
      </tbody>
    </table>

    <div style="background:#F7F5F2;border-radius:8px;padding:16px;margin-bottom:32px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:8px;">
        <span style="font-size:13px;color:#6B6760;">Total pago</span>
        <span style="font-size:14px;font-weight:600;color:#6BAF8E;">R$ ${totalPago.toFixed(2)}</span>
      </div>
      <div style="display:flex;justify-content:space-between;">
        <span style="font-size:13px;color:#6B6760;">Total pendente</span>
        <span style="font-size:14px;font-weight:600;color:#C46060;">R$ ${totalPendente.toFixed(2)}</span>
      </div>
    </div>

    <div style="font-size:11px;color:#6B6760;text-align:center;border-top:1px solid #D8D4CE;padding-top:16px;">
      Documento gerado em ${agora} · ${config.nomeEmpresa || config.nomeClinica || 'Consultório'}
    </div>
  `;

  document.body.appendChild(conteudo);

  const canvas = await html2canvas(conteudo, { scale: 2, useCORS: true });
  const imgData = canvas.toDataURL('image/png');

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p', 'mm', 'a4');
  const largura = pdf.internal.pageSize.getWidth();
  const altura = (canvas.height * largura) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, largura, altura);
  pdf.save(`historico-pagamentos-${pacienteAtual.nome.toLowerCase().replace(/\s+/g, '-')}-${anoFiltrado}.pdf`);

  document.body.removeChild(conteudo);
});

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
    .where('usuarioId', '==', usuarioLogado.uid)
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
});

// Excluir pelo perfil
document.getElementById('btn-excluir-perfil').addEventListener('click', async () => {
  const confirmar = confirm(`Tem certeza que deseja excluir ${pacienteAtual.nome}? Todos os dados relacionados serão apagados.`);
  if (confirmar) {
    const cols = ['consultas', 'anotacoes', 'pagamentos'];
    for (const col of cols) {
      const snap = await db.collection(col)
        .where('pacienteId', '==', pacienteAtual.id)
        .where('usuarioId', '==', usuarioLogado.uid)
        .get();
      for (const doc of snap.docs) await doc.ref.delete();
    }
    await db.collection('pacientes').doc(pacienteAtual.id).delete();
    navegarPara('prontuarios');
  }
});

document.getElementById('btn-exportar-prontuario').addEventListener('click', async () => {
  const snapshot = await db.collection('anotacoes')
    .where('pacienteId', '==', pacienteAtual.id)
    .where('usuarioId', '==', usuarioLogado.uid)
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
  conteudo.style.cssText = 'font-family:Arial,sans-serif;max-width:800px;padding:40px;color:#2C2A27;background:#ffffff;';
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
    document.getElementById('pac-status').value = pacienteAtual.status || 'ativo';
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

    document.getElementById('pac-modalidade').value = pacienteAtual.modalidade || 'presencial';

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
    document.getElementById('config-nome-empresa').value = config.nomeEmpresa || '';
    document.getElementById('config-crp').value = config.crp || '';
    if (config.avatar) {
      document.querySelectorAll('.avatar-opcao').forEach(img => {
        img.classList.remove('selecionado');
        if (img.dataset.avatar === config.avatar) {
          img.classList.add('selecionado');
        }
      });
      atualizarAvatarCabecalho(config.avatar);
    }
    document.getElementById('config-cnpj').value = config.cnpj || '';
    document.getElementById('config-telefone').value = config.telefoneClinica || '';
    document.getElementById('config-endereco').value = config.enderecoClinica || '';
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
  const nomeEmpresa = document.getElementById('config-nome-empresa').value.trim();
  const crp = document.getElementById('config-crp').value.trim();
  const avatarSelecionado = document.querySelector('.avatar-opcao.selecionado');
  const avatar = avatarSelecionado ? avatarSelecionado.dataset.avatar : null;
  const cnpj = document.getElementById('config-cnpj').value.trim();
  const telefoneClinica = document.getElementById('config-telefone').value.trim();
  const enderecoClinica = document.getElementById('config-endereco').value.trim();

  await db.collection('configuracoes').doc(usuarioLogado.uid).set({
      nomeClinica,
      nomeProfissional,
      nomeEmpresa,
      cnpj,
      crp,
      avatar,
      telefoneClinica,
      enderecoClinica,
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

async function abrirModalConsulta(pacienteIdSelecionado = null, ehEncaixe = false) {
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

  const campoEncaixe = document.getElementById('consulta-campo-encaixe');
  const valorEncaixeWrap = document.getElementById('consulta-valor-encaixe-wrap');
  const tipoEncaixe = document.getElementById('consulta-tipo-encaixe');
  const valorEncaixe = document.getElementById('consulta-valor-encaixe');

  if (ehEncaixe) {
    campoEncaixe.classList.remove('escondido');
    tipoEncaixe.value = 'extra';
    valorEncaixeWrap.classList.remove('escondido');
    valorEncaixe.value = '';
  } else {
    campoEncaixe.classList.add('escondido');
    tipoEncaixe.value = 'extra';
    valorEncaixe.value = '';
  }

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
document.getElementById('btn-relatorio-periodo').addEventListener('click', abrirModalRelatorio);
document.getElementById('btn-fechar-modal-relatorio').addEventListener('click', fecharModalRelatorio);
document.getElementById('fundo-relatorio').addEventListener('click', fecharModalRelatorio);

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

  const campoEncaixe = document.getElementById('consulta-campo-encaixe');
  const ehEncaixe = !campoEncaixe.classList.contains('escondido');
  const tipoEncaixe = ehEncaixe ? document.getElementById('consulta-tipo-encaixe').value : null;
  const valorEncaixeRaw = document.getElementById('consulta-valor-encaixe').value.trim();

  if (ehEncaixe && tipoEncaixe === 'extra' && !valorEncaixeRaw) {
    document.getElementById('erro-consulta').textContent = 'Informe o valor do encaixe.';
    return;
  }

  const dadosConsulta = {
    pacienteId,
    data,
    hora,
    duracao,
    status,
    observacoes,
    usuarioId: usuarioLogado.uid,
    encaixe: ehEncaixe
  };

  if (ehEncaixe) {
    dadosConsulta.tipoEncaixe = tipoEncaixe;
    if (tipoEncaixe === 'extra') {
      dadosConsulta.valorEncaixe = limparMoeda(valorEncaixeRaw);
      dadosConsulta.statusEncaixe = 'pendente';
    }
  }

  await db.collection('consultas').add(dadosConsulta);

  fecharModalConsulta();
  carregarAgenda();
});

// Encaixe rápido na agenda
document.getElementById('grade-agenda').addEventListener('click', async (e) => {
  if (e.target.classList.contains('btn-encaixe')) {
    const hora = e.target.dataset.hora;
    await abrirModalConsulta(null, true);
    document.getElementById('consulta-hora').value = hora;
  }
});

// Tipo de encaixe
document.getElementById('consulta-tipo-encaixe').addEventListener('change', (e) => {
  const valorEncaixeWrap = document.getElementById('consulta-valor-encaixe-wrap');
  const valorEncaixe = document.getElementById('consulta-valor-encaixe');

  if (e.target.value === 'extra') {
    valorEncaixeWrap.classList.remove('escondido');
  } else {
    valorEncaixeWrap.classList.add('escondido');
    valorEncaixe.value = '';
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

  if (alertas.some(a => a.tipo === 'urgente')) {
    tocarSom('alerta');
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

const notificacoesEnviadas = new Set();

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
    c.hora <= horaLimite &&
    !notificacoesEnviadas.has(`pendente-${c.id}`)
  );

  pendentes.forEach(c => {
    const nome = mapaPacientes[c.pacienteId] || 'Paciente';
    const minutosRestantes = Math.floor((new Date(`${hoje}T${c.hora}`) - agora) / 60000);
    tocarSom('notificacao');
    new Notification('Consulta sem confirmação', {
      body: `${nome} ainda não confirmou a consulta das ${c.hora} (em ${minutosRestantes} min)`,
      icon: 'assets/logo.jpg'
    });
    notificacoesEnviadas.add(`pendente-${c.id}`);
  });

  const confirmadas = consultas.filter(c =>
    c.data === hoje &&
    c.status === 'confirmada' &&
    c.hora >= horaAgora &&
    c.hora <= horaLimite &&
    !notificacoesEnviadas.has(`confirmada-${c.id}`)
  );

  confirmadas.forEach(c => {
    const nome = mapaPacientes[c.pacienteId] || 'Paciente';
    const minutosRestantes = Math.floor((new Date(`${hoje}T${c.hora}`) - agora) / 60000);
    tocarSom('notificacao');
    new Notification('Consulta se aproximando', {
      body: `${nome} tem consulta às ${c.hora} (em ${minutosRestantes} min)`,
      icon: 'assets/logo.jpg'
    });
    notificacoesEnviadas.add(`confirmada-${c.id}`);
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

    const inicioMesISO = formatarDataISO(inicioMes);
    const fimMesISO = formatarDataISO(fimMes);

    const snapshotExistentes = await db.collection('consultas')
      .where('pacienteId', '==', paciente.id)
      .where('usuarioId', '==', usuarioLogado.uid)
      .where('data', '>=', inicioMesISO)
      .where('data', '<=', fimMesISO)
      .get();

    const datasExistentes = snapshotExistentes.docs.map(doc => {
      const d = doc.data();
      return `${d.data}_${d.hora}`;
    });

    const novasConsultas = datasFinais.filter(data => !datasExistentes.includes(`${data}_${paciente.horarioFixo}`));

    await Promise.all(novasConsultas.map(data =>
      db.collection('consultas').add({
        pacienteId: paciente.id,
        usuarioId: usuarioLogado.uid,
        data,
        hora: paciente.horarioFixo,
        duracao: paciente.duracao || '50',
        status: 'pendente',
        observacoes: ''
      })
    ));
  }
}

/* Gerar Consultas Todos Pacientes */
async function gerarConsultasTodosPacientes() {
  const snapshot = await db.collection('pacientes')
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();

  const pacientes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  await Promise.all(pacientes.map(p => gerarConsultasMes(p)));
}

/* Gerar Pagamentos do Mês para Todos os Pacientes */
async function gerarPagamentosMesTodosPacientes() {
  const agora = new Date();
  const mes = agora.getMonth() + 1;
  const ano = agora.getFullYear();

  const snapshotPacientes = await db.collection('pacientes')
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();

  const pacientes = snapshotPacientes.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  for (const p of pacientes) {
    const snapshotPagamento = await db.collection('pagamentos')
      .where('pacienteId', '==', p.id)
      .where('usuarioId', '==', usuarioLogado.uid)
      .where('mes', '==', mes)
      .where('ano', '==', ano)
      .get();

    if (snapshotPagamento.empty) {
      await db.collection('pagamentos').add({
        pacienteId: p.id,
        usuarioId: usuarioLogado.uid,
        mes,
        ano,
        valor: p.valorSessao || '',
        status: 'pendente',
        dataPagamento: null
      });
    }
  }
}

/* Anotações de Sessão */
const modalAnotacao = document.getElementById('modal-anotacao');
const btnSalvarAnotacao = document.getElementById('btn-salvar-anotacao');
let anotacaoAtual = null;

function abrirModalAnotacao(anotacao = null) {
  anotacaoAtual = anotacao;

  if (anotacao) {
    document.getElementById('anotacao-data').value = anotacao.data;
    document.getElementById('anotacao-hora').value = anotacao.hora || '';
    document.getElementById('anotacao-evolucao').value = anotacao.evolucao;
    document.getElementById('anotacao-modalidade').value = anotacao.modalidade || 'presencial';
    document.getElementById('anotacao-texto').value = anotacao.texto;
    document.querySelector('#modal-anotacao .modal-topo h2').textContent = 'Editar sessão';
    btnSalvarAnotacao.textContent = 'Atualizar sessão';
    btnSalvarAnotacao.dataset.modo = 'editar';
  } else {
    document.getElementById('anotacao-data').value = formatarDataISO(new Date());
    document.getElementById('anotacao-hora').value = pacienteAtual?.horarioFixo || '';
    document.getElementById('anotacao-evolucao').value = 'estavel';
    document.getElementById('anotacao-modalidade').value = pacienteAtual?.modalidade || 'presencial';
    document.getElementById('anotacao-texto').value = '';
    document.querySelector('#modal-anotacao .modal-topo h2').textContent = 'Registro de sessão';
    btnSalvarAnotacao.textContent = 'Salvar sessão';
    btnSalvarAnotacao.dataset.modo = '';

    // Verifica se tem rascunho salvo pra esse paciente
    const chaveRascunho = `consultorio_rascunho_${pacienteAtual.id}`;
    const rascunho = localStorage.getItem(chaveRascunho);
    if (rascunho) {
      const dados = JSON.parse(rascunho);
      const recuperar = confirm(`Encontramos um rascunho não salvo da sessão de ${pacienteAtual.nome} (${dados.data}). Deseja recuperar?`);
      if (recuperar) {
        document.getElementById('anotacao-data').value = dados.data || formatarDataISO(new Date());
        document.getElementById('anotacao-hora').value = dados.hora || '';
        document.getElementById('anotacao-evolucao').value = dados.evolucao || 'estavel';
        document.getElementById('anotacao-modalidade').value = dados.modalidade || 'presencial';
        document.getElementById('anotacao-texto').value = dados.texto || '';
      } else {
        localStorage.removeItem(chaveRascunho);
      }
    }
  }

  document.getElementById('erro-anotacao').textContent = '';
  modalAnotacao.classList.remove('escondido');

  // Inicia auto-save a cada 30 segundos
  if (!anotacao) {
    iniciarAutoSave();
  }
}

let autoSaveInterval = null;

function iniciarAutoSave() {
  if (autoSaveInterval) clearInterval(autoSaveInterval);
  
  autoSaveInterval = setInterval(() => {
    if (!pacienteAtual) return;
    const chaveRascunho = `consultorio_rascunho_${pacienteAtual.id}`;
    const rascunho = {
      data: document.getElementById('anotacao-data').value,
      hora: document.getElementById('anotacao-hora').value,
      evolucao: document.getElementById('anotacao-evolucao').value,
      modalidade: document.getElementById('anotacao-modalidade').value,
      texto: document.getElementById('anotacao-texto').value,
      savedAt: new Date().toISOString()
    };
    if (rascunho.texto.trim()) {
      localStorage.setItem(chaveRascunho, JSON.stringify(rascunho));
    }
  }, 30000);
}

function fecharModalAnotacao() {
  modalAnotacao.classList.add('escondido');
  anotacaoAtual = null;
  document.getElementById('anotacao-anexo').value = '';
  document.getElementById('preview-anexos').innerHTML = '';
}

document.getElementById('btn-fechar-anotacao').addEventListener('click', fecharModalAnotacao);
document.getElementById('fundo-anotacao').addEventListener('click', fecharModalAnotacao);

document.getElementById('btn-nova-anotacao').addEventListener('click', () => {
  abrirModalAnotacao();
});

/* Upload de anexos */
const IMGBB_API_KEY = 'd97ba41e06022c45b1b95441f951c038';

async function uploadAnexo(arquivo) {
  const formData = new FormData();
  formData.append('image', arquivo);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  if (data.success) {
    return {
      url: data.data.url,
      thumb: data.data.thumb.url,
      nome: arquivo.name
    };
  }
  return null;
}

/* Biblioteca de Imagens */
async function carregarBiblioteca() {
  const lista = document.getElementById('lista-biblioteca');
  lista.innerHTML = '<p class="vazio">Carregando...</p>';

  const snapshot = await db.collection('biblioteca')
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();

  if (snapshot.empty) {
    lista.innerHTML = '<p class="vazio">Nenhuma imagem na biblioteca ainda.</p>';
    return;
  }

  const imagens = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  lista.innerHTML = imagens.map(img => `
    <div style="position:relative;cursor:pointer;" class="biblioteca-item" data-url="${img.url}" data-thumb="${img.thumb}" data-nome="${img.nome}">
      <img src="${img.thumb}" style="width:80px;height:80px;object-fit:cover;border-radius:8px;border:2px solid var(--borda);" title="${img.nome}" />
      <div style="font-size:10px;color:var(--texto2);text-align:center;margin-top:4px;max-width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${img.nome}</div>
    </div>
  `).join('');

  lista.querySelectorAll('.biblioteca-item').forEach(item => {
    item.addEventListener('click', () => {
      const anexo = {
        url: item.dataset.url,
        thumb: item.dataset.thumb,
        nome: item.dataset.nome
      };
      adicionarAnexoDaBiblioteca(anexo);
      document.getElementById('modal-biblioteca').classList.add('escondido');
    });
  });
}

function adicionarAnexoDaBiblioteca(anexo) {
  const preview = document.getElementById('preview-anexos');
  const jaExiste = preview.dataset.anexos 
    ? JSON.parse(preview.dataset.anexos).some(a => a.url === anexo.url)
    : false;

  if (jaExiste) {
    alert('Esta imagem já foi adicionada!');
    return;
  }

  const anexosAtuais = preview.dataset.anexos ? JSON.parse(preview.dataset.anexos) : [];
  anexosAtuais.push(anexo);
  preview.dataset.anexos = JSON.stringify(anexosAtuais);

  const div = document.createElement('div');
  div.style.position = 'relative';
  div.innerHTML = `
    <img src="${anexo.thumb}" style="width:80px;height:80px;object-fit:cover;border-radius:8px;border:1px solid var(--borda);" />
  `;
  preview.appendChild(div);
}

document.getElementById('btn-abrir-biblioteca').addEventListener('click', () => {
  carregarBiblioteca();
  document.getElementById('modal-biblioteca').classList.remove('escondido');
});

document.getElementById('btn-fechar-biblioteca').addEventListener('click', () => {
  document.getElementById('modal-biblioteca').classList.add('escondido');
});

document.getElementById('fundo-biblioteca').addEventListener('click', () => {
  document.getElementById('modal-biblioteca').classList.add('escondido');
});

document.getElementById('anotacao-anexo').addEventListener('change', async (e) => {
  const preview = document.getElementById('preview-anexos');
  const arquivos = Array.from(e.target.files);

  if (arquivos.length === 0) {
    preview.innerHTML = '';
    return;
  }

  preview.innerHTML = '<p style="font-size:12px;color:var(--texto2)">Carregando prévia...</p>';

  const resultados = await Promise.all(arquivos.map(async (arquivo) => {
    const url = URL.createObjectURL(arquivo);
    return { url, thumb: url, nome: arquivo.name, arquivo };
  }));

  preview.innerHTML = '';
  resultados.forEach(r => {
    const div = document.createElement('div');
    div.style.position = 'relative';
    div.innerHTML = `<img src="${r.thumb}" style="width:80px;height:80px;object-fit:cover;border-radius:8px;border:1px solid var(--borda);" />`;
    preview.appendChild(div);
  });

  preview.dataset.arquivos = JSON.stringify(resultados.map(r => r.nome));
  preview._arquivos = resultados.map(r => r.arquivo);
});

// Salvar anotação
btnSalvarAnotacao.addEventListener('click', async () => {
  const data = document.getElementById('anotacao-data').value;
  const hora = document.getElementById('anotacao-hora').value;
  const evolucao = document.getElementById('anotacao-evolucao').value;
  const modalidade = document.getElementById('anotacao-modalidade').value;
  const texto = document.getElementById('anotacao-texto').value.trim();
  const preview = document.getElementById('preview-anexos');
  const arquivos = preview._arquivos || [];
  const anexosDaBiblioteca = preview.dataset.anexos ? JSON.parse(preview.dataset.anexos) : [];
  let anexos = anotacaoAtual?.anexos || [];

  if (!data || !texto) {
    document.getElementById('erro-anotacao').textContent = 'Data e anotação são obrigatórios.';
    return;
  }

  if (arquivos.length > 0) {
    preview.innerHTML = '<p style="font-size:12px;color:var(--texto2)">Enviando anexos...</p>';
    const resultados = await Promise.all(arquivos.map(uploadAnexo));
    const novosAnexos = resultados.filter(r => r !== null);

    // Salva na biblioteca
    for (const anexo of novosAnexos) {
      await db.collection('biblioteca').add({
        usuarioId: usuarioLogado.uid,
        url: anexo.url,
        thumb: anexo.thumb,
        nome: anexo.nome,
        criadoEm: new Date().toISOString()
      });
    }

    anexos = [...anexos, ...novosAnexos, ...anexosDaBiblioteca];
  } else {
    anexos = [...anexos, ...anexosDaBiblioteca];
  }

  if (btnSalvarAnotacao.dataset.modo === 'editar') {
    await db.collection('anotacoes').doc(anotacaoAtual.id).update({ data, hora, evolucao, modalidade, texto, anexos });
  } else {
    await db.collection('anotacoes').add({
      pacienteId: pacienteAtual.id,
      usuarioId: usuarioLogado.uid,
      data,
      hora,
      evolucao,
      modalidade,
      texto,
      anexos
    });
  }

  if (autoSaveInterval) {
    clearInterval(autoSaveInterval);
    autoSaveInterval = null;
  }
  if (pacienteAtual) {
    localStorage.removeItem(`consultorio_rascunho_${pacienteAtual.id}`);
  }

  fecharModalAnotacao();
  carregarAnotacoes(pacienteAtual.id);
});

// Encerrando sessão Manualmente caso precise
document.getElementById('btn-encerrar-sessao').addEventListener('click', () => {
  if (cronoInterval) {
    clearInterval(cronoInterval);
    cronoInterval = null;
  }

  const display = document.getElementById('crono-tempo');
  const tempoAtual = display.textContent;

  // Calcula tempo decorrido
  const duracaoPaciente = parseInt(pacienteAtual?.duracao) || 50;
  const partesTexto = tempoAtual.split(':');
  const minRestantes = parseInt(partesTexto[0]);
  const segRestantes = parseInt(partesTexto[1]);
  const segundosRestantes = minRestantes * 60 + segRestantes;
  const segundosDecorridos = duracaoPaciente * 60 - segundosRestantes;
  const minDecorridos = Math.floor(segundosDecorridos / 60);

  display.textContent = '00:00';
  display.classList.add('encerrado');

  document.getElementById('btn-iniciar-sessao').style.display = 'none';
  document.getElementById('btn-pausar-sessao').style.display = 'none';
  document.getElementById('btn-resetar-sessao').style.display = 'none';

  // Adiciona observação de encerramento antecipado no campo de texto
  const textoAtual = document.getElementById('anotacao-texto').value;
  const observacao = `\n\n[Sessão encerrada antecipadamente após ${minDecorridos} min]`;
  if (!textoAtual.includes('encerrada antecipadamente')) {
    document.getElementById('anotacao-texto').value = textoAtual + observacao;
  }
});

// Carregar anotações do paciente
async function carregarAnotacoes(pacienteId) {
  const lista = document.getElementById('lista-anotacoes');

  const snapshot = await db.collection('anotacoes')
    .where('pacienteId', '==', pacienteId)
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();

  const anotacoes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  anotacoes.sort((a, b) => {
    if (a.data !== b.data) return b.data.localeCompare(a.data);
    if (a.hora && b.hora) return b.hora.localeCompare(a.hora);
    return 0;
  });

  if (anotacoes.length === 0) {
    lista.innerHTML = '<p class="vazio">Nenhuma sessão registrada ainda.</p>';
    return;
  }

  const evolucaoLabel = { positiva: 'Positiva', estavel: 'Estável', negativa: 'Negativa' };
  const modalidadeLabel = { presencial: 'Presencial', online: 'Online' };

  lista.innerHTML = anotacoes.map(a => `
    <div class="sessao-card ${a.evolucao}" data-id="${a.id}">
      <div class="sessao-header">
        <div>
          <div class="sessao-data">${new Date(a.data + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}${a.hora ? ` às ${a.hora}` : ''}</div>
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
          ${a.modalidade ? `<span class="badge ${a.modalidade === 'online' ? 'confirmada' : 'concluida'}">${modalidadeLabel[a.modalidade]}</span>` : ''}
          <span class="sessao-evolucao ${a.evolucao}">${evolucaoLabel[a.evolucao]}</span>
          <button class="btn-nav btn-exportar-sessao" data-id="${a.id}" style="font-size:11px;padding:3px 8px;" title="Exportar esta sessão">↓ PDF</button>
          <button class="btn-excluir-perfil btn-excluir-sessao" data-id="${a.id}" style="font-size:11px;padding:3px 8px;" title="Excluir sessão">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="11" height="11">
              <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>
      </div>
      <div class="sessao-texto">${a.texto}</div>
      ${a.anexos && a.anexos.length > 0 ? `
        <div style="margin-top:12px;">
          <div style="font-size:11px;color:var(--texto2);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px;">Anexos</div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            ${a.anexos.map((anexo, idx) => `
              <div style="position:relative;">
                <a href="${anexo.url}" target="_blank">
                  <img src="${anexo.thumb}" style="width:72px;height:72px;object-fit:cover;border-radius:8px;border:1px solid var(--borda);cursor:pointer;" title="${anexo.nome}" />
                </a>
                <button class="btn-remover-anexo" data-anotacao-id="${a.id}" data-anexo-idx="${idx}" style="position:absolute;top:-6px;right:-6px;background:var(--vermelho);border:none;border-radius:50%;width:18px;height:18px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" width="10" height="10">
                    <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd"/>
                  </svg>
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `).join('');

  lista.querySelectorAll('.sessao-card').forEach(card => {
    card.addEventListener('click', async (e) => {
      if (e.target.tagName === 'IMG' || e.target.tagName === 'A' || e.target.classList.contains('btn-exportar-sessao') || e.target.closest('.btn-remover-anexo') || e.target.closest('.btn-excluir-sessao')) return;
      const id = card.dataset.id;
      const doc = await db.collection('anotacoes').doc(id).get();
      if (doc.exists) abrirModalAnotacao({ id: doc.id, ...doc.data() });
    });
  });

  lista.querySelectorAll('.btn-exportar-sessao').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const id = btn.dataset.id;
      const doc = await db.collection('anotacoes').doc(id).get();
      if (doc.exists) exportarSessaoIndividual({ id: doc.id, ...doc.data() });
    });
  });

  lista.querySelectorAll('.btn-excluir-sessao').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const confirmar = confirm('Tem certeza que deseja excluir esta sessão? Esta ação não pode ser desfeita.');
      if (!confirmar) return;
      const id = btn.dataset.id;
      await db.collection('anotacoes').doc(id).delete();
      carregarAnotacoes(pacienteId);
    });
  });

  lista.querySelectorAll('.btn-remover-anexo').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.stopPropagation();
      const confirmar = confirm('Remover este anexo?');
      if (!confirmar) return;

      const anotacaoId = btn.dataset.anotacaoId;
      const idx = Number(btn.dataset.anexoIdx);

      const docRef = db.collection('anotacoes').doc(anotacaoId);
      const docSnap = await docRef.get();
      const anexos = docSnap.data().anexos || [];
      anexos.splice(idx, 1);
      await docRef.update({ anexos });
      carregarAnotacoes(pacienteId);
    });
  });
}

// Gráfico evolução paciente
let graficoEvolucao = null;

async function carregarGraficoEvolucao(pacienteId) {
  const snapshot = await db.collection('anotacoes')
    .where('pacienteId', '==', pacienteId)
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();

  const anotacoes = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  anotacoes.sort((a, b) => a.data.localeCompare(b.data));

  const graficoVazio = document.getElementById('grafico-vazio');
  const canvas = document.getElementById('grafico-evolucao');

  if (anotacoes.length < 2) {
    graficoVazio.style.display = 'block';
    canvas.style.display = 'none';
    if (graficoEvolucao) {
      graficoEvolucao.destroy();
      graficoEvolucao = null;
    }
    return;
  }

  graficoVazio.style.display = 'none';
  canvas.style.display = 'block';

  const evolucaoValor = { positiva: 3, estavel: 2, negativa: 1 };
  const evolucaoLabel = { positiva: 'Positiva', estavel: 'Estável', negativa: 'Negativa' };

  const labels = anotacoes.map(a =>
    new Date(a.data + 'T12:00:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
  );

  const dados = anotacoes.map(a => evolucaoValor[a.evolucao] || 2);

  if (graficoEvolucao) {
    graficoEvolucao.destroy();
  }

  const ctx = canvas.getContext('2d');
  graficoEvolucao = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Evolução',
        data: dados,
        borderColor: '#5B7FA6',
        backgroundColor: 'rgba(91, 127, 166, 0.1)',
        borderWidth: 2,
        pointBackgroundColor: dados.map(v =>
          v === 3 ? '#6BAF8E' : v === 1 ? '#C46060' : '#C9974A'
        ),
        pointRadius: 6,
        pointHoverRadius: 8,
        tension: 0.3,
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          min: 0.5,
          max: 3.5,
          ticks: {
            stepSize: 1,
            callback: (val) => {
              if (val === 1) return 'Negativa';
              if (val === 2) return 'Estável';
              if (val === 3) return 'Positiva';
              return '';
            },
            color: '#9C9890'
          },
          grid: { color: 'rgba(255,255,255,0.05)' }
        },
        x: {
          ticks: { color: '#9C9890' },
          grid: { color: 'rgba(255,255,255,0.05)' }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const v = ctx.raw;
              return v === 3 ? 'Positiva' : v === 1 ? 'Negativa' : 'Estável';
            }
          }
        }
      }
    }
  });
}

async function exportarSessaoIndividual(anotacao) {
  const evolucaoLabel = { positiva: 'Positiva', estavel: 'Estável', negativa: 'Negativa' };
  const modalidadeLabel = { presencial: 'Presencial', online: 'Online' };

  const agora = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  const dataFormatada = new Date(anotacao.data + 'T12:00:00').toLocaleDateString('pt-BR', {
    weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
  });

  const docConfig = await db.collection('configuracoes').doc(usuarioLogado.uid).get();
  const config = docConfig.exists ? docConfig.data() : {};

  const conteudo = document.createElement('div');
  conteudo.style.cssText = 'font-family:Arial,sans-serif;max-width:800px;padding:40px;color:#2C2A27;background:#ffffff;';
  conteudo.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid #5B7FA6;">
      <div style="display:flex;align-items:center;gap:16px;">
        <img src="assets/logo.jpg" style="height:56px;width:auto;border-radius:8px;" />
        <div>
          <h1 style="font-size:16px;color:#5B7FA6;margin:0;font-weight:700;">${config.nomeEmpresa || config.nomeClinica || 'Consultório'}</h1>
          ${config.cnpj ? `<div style="font-size:11px;color:#6B6760;">CNPJ: ${config.cnpj}</div>` : ''}
          ${config.enderecoClinica ? `<div style="font-size:11px;color:#6B6760;">${config.enderecoClinica}</div>` : ''}
          ${config.telefoneClinica ? `<div style="font-size:11px;color:#6B6760;">Tel: ${config.telefoneClinica}</div>` : ''}
          ${config.crp ? `<div style="font-size:11px;color:#6B6760;">${config.crp}</div>` : ''}
        </div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:10px;color:#6B6760;text-transform:uppercase;letter-spacing:1px;">Registro de Sessão</div>
        <div style="font-size:11px;color:#6B6760;margin-top:4px;">Emitido em ${agora}</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px;">
      <div style="background:#F7F5F2;border-radius:8px;padding:14px;">
        <div style="font-size:10px;color:#6B6760;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Paciente</div>
        <div style="font-size:15px;font-weight:700;">${pacienteAtual.nome}</div>
        ${pacienteAtual.cpf ? `<div style="font-size:12px;color:#6B6760;margin-top:2px;">CPF: ${pacienteAtual.cpf}</div>` : ''}
      </div>
      <div style="background:#F7F5F2;border-radius:8px;padding:14px;">
        <div style="font-size:10px;color:#6B6760;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Data da sessão</div>
        <div style="font-size:14px;font-weight:600;">${dataFormatada}</div>
        ${anotacao.hora ? `<div style="font-size:13px;color:#5B7FA6;margin-top:2px;">às ${anotacao.hora}</div>` : ''}
      </div>
    </div>

    <div style="display:flex;gap:12px;margin-bottom:24px;">
      ${anotacao.modalidade ? `
        <div style="background:#F7F5F2;border-radius:8px;padding:12px 16px;">
          <div style="font-size:10px;color:#6B6760;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Modalidade</div>
          <div style="font-size:13px;font-weight:600;">${modalidadeLabel[anotacao.modalidade] || anotacao.modalidade}</div>
        </div>
      ` : ''}
      ${anotacao.evolucao ? `
        <div style="background:#F7F5F2;border-radius:8px;padding:12px 16px;">
          <div style="font-size:10px;color:#6B6760;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Evolução</div>
          <div style="font-size:13px;font-weight:600;">${evolucaoLabel[anotacao.evolucao] || anotacao.evolucao}</div>
        </div>
      ` : ''}
      <div style="background:#F7F5F2;border-radius:8px;padding:12px 16px;">
        <div style="font-size:10px;color:#6B6760;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Profissional</div>
        <div style="font-size:13px;font-weight:600;">${config.nomeProfissional || '—'}</div>
        ${config.crp ? `<div style="font-size:11px;color:#6B6760;">${config.crp}</div>` : ''}
      </div>
    </div>

    <div style="margin-bottom:24px;">
      <div style="font-size:10px;color:#6B6760;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">Anotações da sessão</div>
      <div style="font-size:13px;line-height:1.8;color:#2C2A27;background:#FDFCFB;border:1px solid #EDEAE5;border-radius:8px;padding:16px;text-align:justify;">${anotacao.texto}</div>
    </div>

    ${anotacao.anexos && anotacao.anexos.length > 0 ? `
      <div style="margin-bottom:24px;">
        <div style="font-size:10px;color:#6B6760;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">Anexos</div>
        <div style="font-size:12px;color:#6B6760;">
          ${anotacao.anexos.map((a, i) => `<div>${i + 1}. ${a.nome} — ${a.url}</div>`).join('')}
        </div>
      </div>
    ` : ''}

    <div style="font-size:10px;color:#9C9890;text-align:center;border-top:1px solid #EDEAE5;padding-top:16px;margin-top:32px;">
      Documento gerado pelo sistema APSI · ${config.nomeEmpresa || config.nomeClinica || ''} · ${agora}
    </div>
  `;

  document.body.appendChild(conteudo);

  const canvas = await html2canvas(conteudo, { scale: 2, useCORS: true });
  const imgData = canvas.toDataURL('image/png');

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p', 'mm', 'a4');
  const largura = pdf.internal.pageSize.getWidth();
  const altura = (canvas.height * largura) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, largura, altura);
  pdf.save(`sessao-${pacienteAtual.nome.toLowerCase().replace(/\s+/g, '-')}-${anotacao.data}.pdf`);

  document.body.removeChild(conteudo);
}

async function exportarSessoesPeriodo(dataInicio, dataFim) {
  const modalidadeLabel = { presencial: 'Presencial', online: 'Online' };

  const agora = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

  const docConfig = await db.collection('configuracoes').doc(usuarioLogado.uid).get();
  const config = docConfig.exists ? docConfig.data() : {};

    const snapshot = await db.collection('anotacoes')
    .where('pacienteId', '==', pacienteAtual.id)
    .where('usuarioId', '==', usuarioLogado.uid)
    .where('data', '>=', dataInicio)
    .where('data', '<=', dataFim)
    .get();

  let sessoes = snapshot.docs.map(doc => doc.data());
  sessoes.sort((a, b) => a.data.localeCompare(b.data));

  if (sessoes.length === 0) {
    alert('Nenhuma sessão encontrada nesse período.');
    return;
  }

  const inicioFormatado = new Date(dataInicio + 'T12:00:00').toLocaleDateString('pt-BR');
  const fimFormatado = new Date(dataFim + 'T12:00:00').toLocaleDateString('pt-BR');

  // Monta o cabeçalho como um bloco separado
  const cabecalho = document.createElement('div');
  cabecalho.style.cssText = 'font-family:Arial,sans-serif;width:800px;padding:40px 40px 0 40px;color:#2C2A27;background:#ffffff;';
  cabecalho.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid #5B7FA6;">
      <div style="display:flex;align-items:center;gap:16px;">
        <img src="assets/logo.jpg" style="height:56px;width:auto;border-radius:8px;" />
        <div>
          <h1 style="font-size:16px;color:#5B7FA6;margin:0;font-weight:700;">${config.nomeEmpresa || config.nomeClinica || 'Consultório'}</h1>
          ${config.cnpj ? `<div style="font-size:11px;color:#6B6760;">CNPJ: ${config.cnpj}</div>` : ''}
          ${config.enderecoClinica ? `<div style="font-size:11px;color:#6B6760;">${config.enderecoClinica}</div>` : ''}
          ${config.telefoneClinica ? `<div style="font-size:11px;color:#6B6760;">Tel: ${config.telefoneClinica}</div>` : ''}
          ${config.crp ? `<div style="font-size:11px;color:#6B6760;">${config.crp}</div>` : ''}
        </div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:10px;color:#6B6760;text-transform:uppercase;letter-spacing:1px;">Relatório de Sessões</div>
        <div style="font-size:11px;color:#6B6760;margin-top:4px;">Emitido em ${agora}</div>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px;">
      <div style="background:#F7F5F2;border-radius:8px;padding:14px;">
        <div style="font-size:10px;color:#6B6760;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Paciente</div>
        <div style="font-size:15px;font-weight:700;">${pacienteAtual.nome}</div>
        ${pacienteAtual.cpf ? `<div style="font-size:12px;color:#6B6760;margin-top:2px;">CPF: ${pacienteAtual.cpf}</div>` : ''}
      </div>
      <div style="background:#F7F5F2;border-radius:8px;padding:14px;">
        <div style="font-size:10px;color:#6B6760;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Período</div>
        <div style="font-size:14px;font-weight:600;">${inicioFormatado} a ${fimFormatado}</div>
        <div style="font-size:12px;color:#5B7FA6;margin-top:2px;">${sessoes.length} sessão(ões)</div>
      </div>
    </div>
  `;

  // Monta cada sessão como um bloco separado, pra medir e encaixar individualmente
  const blocosSessoes = sessoes.map(s => {
    const dataFormatada = new Date(s.data + 'T12:00:00').toLocaleDateString('pt-BR', {
      weekday: 'long', day: '2-digit', month: 'long', year: 'numeric'
    });
    const bloco = document.createElement('div');
    bloco.style.cssText = 'font-family:Arial,sans-serif;width:800px;padding:0 40px;color:#2C2A27;background:#ffffff;';
    bloco.innerHTML = `
      <div style="margin-bottom:16px;padding:14px;background:#FDFCFB;border:1px solid #EDEAE5;border-radius:8px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
          <div style="font-size:13px;font-weight:700;color:#5B7FA6;text-transform:capitalize;">${dataFormatada}${s.hora ? ` às ${s.hora}` : ''}</div>
          <div style="font-size:11px;color:#6B6760;">${modalidadeLabel[s.modalidade] || s.modalidade || ''}</div>
        </div>
        <div style="font-size:13px;line-height:1.7;color:#2C2A27;text-align:justify;">${s.texto}</div>
      </div>
    `;
    return bloco;
  });

  // Rodapé como bloco separado
  const rodape = document.createElement('div');
  rodape.style.cssText = 'font-family:Arial,sans-serif;width:800px;padding:16px 40px 24px 40px;color:#2C2A27;background:#ffffff;';
  rodape.innerHTML = `
    <div style="font-size:10px;color:#9C9890;text-align:center;border-top:1px solid #EDEAE5;padding-top:16px;">
      Documento gerado pelo sistema APSI · ${config.nomeEmpresa || config.nomeClinica || ''} · ${agora}
    </div>
  `;

  // Função auxiliar: renderiza um elemento fora da tela e devolve o canvas
  async function renderizarBloco(elemento) {
    elemento.style.position = 'fixed';
    elemento.style.left = '-9999px';
    elemento.style.top = '0';
    document.body.appendChild(elemento);
    const canvas = await html2canvas(elemento, { scale: 2, useCORS: true });
    document.body.removeChild(elemento);
    return canvas;
  }

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p', 'mm', 'a4');
  const larguraPagina = pdf.internal.pageSize.getWidth();
  const alturaPagina = pdf.internal.pageSize.getHeight();
  const margemInferior = 15;

  let yAtual = 0;

  // Renderiza e posiciona o cabeçalho
  const canvasCabecalho = await renderizarBloco(cabecalho);
  const alturaCabecalhoMM = (canvasCabecalho.height * larguraPagina) / canvasCabecalho.width;
  pdf.addImage(canvasCabecalho.toDataURL('image/png'), 'PNG', 0, yAtual, larguraPagina, alturaCabecalhoMM);
  yAtual += alturaCabecalhoMM;

  // Renderiza e posiciona cada sessão, pulando de página quando necessário
  for (const bloco of blocosSessoes) {
    const canvasSessao = await renderizarBloco(bloco);
    const alturaSessaoMM = (canvasSessao.height * larguraPagina) / canvasSessao.width;

    if (yAtual + alturaSessaoMM > alturaPagina - margemInferior) {
      pdf.addPage();
      yAtual = 10; // pequena margem no topo da nova página
    }

    pdf.addImage(canvasSessao.toDataURL('image/png'), 'PNG', 0, yAtual, larguraPagina, alturaSessaoMM);
    yAtual += alturaSessaoMM;
  }

  // Renderiza e posiciona o rodapé (pula de página se não couber)
  const canvasRodape = await renderizarBloco(rodape);
  const alturaRodapeMM = (canvasRodape.height * larguraPagina) / canvasRodape.width;
  if (yAtual + alturaRodapeMM > alturaPagina - margemInferior) {
    pdf.addPage();
    yAtual = 10;
  }
  pdf.addImage(canvasRodape.toDataURL('image/png'), 'PNG', 0, yAtual, larguraPagina, alturaRodapeMM);

  pdf.save(`relatorio-sessoes-${pacienteAtual.nome.toLowerCase().replace(/\s+/g, '-')}-${dataInicio}-a-${dataFim}.pdf`);
}

async function exportarAtestado(tipo, dados) {
  const agora = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  const hoje = new Date();
  const dataExtenso = `Ceilândia/DF, ${hoje.getDate()} de ${hoje.toLocaleDateString('pt-BR', { month: 'long' })} de ${hoje.getFullYear()}`;

  const docConfig = await db.collection('configuracoes').doc(usuarioLogado.uid).get();
  const config = docConfig.exists ? docConfig.data() : {};

  let titulo, textoAtestado;

  if (tipo === 'comparecimento') {
    titulo = 'Atestado de Comparecimento';
    textoAtestado = `Atestamos para os fins necessários que, ${pacienteAtual.nome}, compareceu à ${config.nomeEmpresa || config.nomeClinica || 'clínica'}, à sessão psicoterapêutica nesta data, no período das ${dados.horario || '____'}.`;
    if (dados.necessitaRepouso && dados.diasRepouso) {
      textoAtestado += ` Necessitando de ${dados.diasRepouso} dia(s) de afastamento/repouso.`;
    }
  } else {
    titulo = 'Atestado de Acompanhamento';
    textoAtestado = `Atesto para os fins necessários que, ${dados.acompanhante}, compareceu à ${config.nomeEmpresa || config.nomeClinica || 'clínica'}, acompanhando o(a) paciente ${pacienteAtual.nome} à sessão psicoterapêutica nesta data, no período ${dados.horario || '____'}.`;
  }

  const conteudo = document.createElement('div');
  conteudo.style.cssText = 'font-family:Arial,sans-serif;max-width:800px;padding:40px;color:#2C2A27;background:#ffffff;';
  conteudo.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px;padding-bottom:16px;border-bottom:2px solid #5B7FA6;">
      <div style="display:flex;align-items:center;gap:16px;">
        <img src="assets/logo.jpg" style="height:56px;width:auto;border-radius:8px;" />
        <div>
          <h1 style="font-size:16px;color:#5B7FA6;margin:0;font-weight:700;">${config.nomeEmpresa || config.nomeClinica || 'Consultório'}</h1>
          ${config.cnpj ? `<div style="font-size:11px;color:#6B6760;">CNPJ: ${config.cnpj}</div>` : ''}
          ${config.enderecoClinica ? `<div style="font-size:11px;color:#6B6760;">${config.enderecoClinica}</div>` : ''}
          ${config.telefoneClinica ? `<div style="font-size:11px;color:#6B6760;">Tel: ${config.telefoneClinica}</div>` : ''}
          ${config.crp ? `<div style="font-size:11px;color:#6B6760;">${config.crp}</div>` : ''}
        </div>
      </div>
      <div style="text-align:right;">
        <div style="font-size:10px;color:#6B6760;text-transform:uppercase;letter-spacing:1px;">Emitido em ${agora}</div>
      </div>
    </div>

    <h2 style="text-align:center;font-size:18px;margin:40px 0;">${titulo}</h2>

    <p style="font-size:14px;line-height:2;text-align:justify;margin-bottom:60px;">
      ${textoAtestado}
    </p>

    <p style="font-size:13px;margin-bottom:60px;">${dataExtenso}.</p>

    <div style="text-align:center;margin-top:40px;">
      <div style="border-top:1px solid #2C2A27;width:280px;margin:0 auto;padding-top:6px;font-size:12px;">
        Assinatura / Carimbo
      </div>
    </div>
  `;

  document.body.appendChild(conteudo);

  const canvas = await html2canvas(conteudo, { scale: 2, useCORS: true });
  const imgData = canvas.toDataURL('image/png');

  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p', 'mm', 'a4');
  const largura = pdf.internal.pageSize.getWidth();
  const altura = (canvas.height * largura) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, largura, altura);
  pdf.save(`atestado-${tipo}-${pacienteAtual.nome.toLowerCase().replace(/\s+/g, '-')}-${hoje.toISOString().slice(0,10)}.pdf`);

  document.body.removeChild(conteudo);
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

  // Conclui automaticamente apenas consultas que já têm anotação registrada no dia
  const snapshotAnotacoes = await db.collection('anotacoes')
    .where('usuarioId', '==', usuarioLogado.uid)
    .get();

  const anotacoesHoje = snapshotAnotacoes.docs
    .map(doc => doc.data())
    .filter(a => a.data === hoje);

  const pacientesComAnotacaoHoje = new Set(anotacoesHoje.map(a => a.pacienteId));

  const consultasParaConcluir = consultasHoje.filter(c =>
    c.status === 'confirmada' &&
    c.hora < horaAgora &&
    pacientesComAnotacaoHoje.has(c.pacienteId)
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
            <div class="consulta-tipo">Sessao individual · ${c.duracao} min · ${
              pacientes.find(p => p.id === c.pacienteId)?.modalidade === 'online' ? 'Online' :
              pacientes.find(p => p.id === c.pacienteId)?.modalidade === 'hibrida' ? 'Híbrida' : 'Presencial'
            }</div>
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
            <div class="consulta-tipo">${formatarMoeda(p.valor)} · ${p.status === 'pendente' ? 'Pendente' : 'Atrasado'}</div>
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

// Seleção de Avatares Perfil
function atualizarAvatarCabecalho(nomeAvatar) {
  const avatarEl = document.querySelector('.avatar');
  if (nomeAvatar) {
    avatarEl.innerHTML = `<img src="assets/avatares/${nomeAvatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" />`;
  } else {
    avatarEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd"/></svg>`;
  }
}

document.querySelectorAll('.avatar-opcao').forEach(img => {
  img.addEventListener('click', () => {
    document.querySelectorAll('.avatar-opcao').forEach(i => i.classList.remove('selecionado'));
    img.classList.add('selecionado');
    atualizarAvatarCabecalho(img.dataset.avatar);
  });
});

// Chama a versão correta via Firebase
auth.onAuthStateChanged(async (user) => {
  if (sessionStorage.getItem('verComoDoutor') === 'true' && user) {
    sessionStorage.removeItem('verComoDoutor');
    const docUsuario = await db.collection('usuarios').doc(user.uid).get();
    const dadosUsuario = docUsuario.data();
    await carregarAppDoUsuario(user.uid, dadosUsuario);
  }
});