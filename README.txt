# APSI — Sistema de Prontuários

Sistema de gestão clínica desenvolvido como PWA (Progressive Web App) para o consultório **APSI — Atendimento Psicológico**. Permite gerenciar pacientes, consultas, sessões, pagamentos e alertas de forma segura e acessível em qualquer dispositivo.

---

## Funcionalidades

### Autenticação
- Cadastro e login de usuários via **Firebase Auth**
- Alteração de senha segura com reautenticação
- Painel de administração com acesso restrito

### Prontuários
- Cadastro completo de pacientes com dados pessoais, clínicos e de atendimento
- Edição e exclusão de pacientes
- Busca em tempo real por nome
- Listagem em ordem alfabética
- Exportação individual de prontuário em **PDF**

### Agenda
- Calendário mensal interativo com indicadores de dias com consultas
- Grade de horários de 7h às 20h
- Geração automática de consultas (semanal, quinzenal ou mensal)
- Encaixe de consultas em horários livres
- Edição, reagendamento e cancelamento de consultas
- Conclusão automática de consultas confirmadas após o horário

### Dashboard
- 4 cards interativos: Consultas hoje, Pacientes ativos, Próxima consulta e Pagamentos
- Acesso rápido ao perfil do paciente clicando em qualquer item da lista
- Atualização automática de status das consultas

### Cronômetro de Sessão
- Cronômetro regressivo integrado ao registro de sessão
- Sincronizado com a duração cadastrada de cada paciente
- Funções de iniciar, pausar e resetar

### Histórico de Sessões
- Registro de anotações por sessão
- Indicador de evolução do paciente (positiva, estável ou negativa)
- Edição de sessões anteriores

### Controle de Pagamentos
- Registro de pagamentos mensais por paciente
- Status de pago, pendente ou atrasado
- Geração automática do pagamento ao cadastrar paciente
- Visibilidade no dashboard e nos alertas

### Alertas e Notificações
- Central de alertas com prioridade (urgente, atenção, ok)
- Notificações nativas do navegador a cada 30 minutos
- Alertas para consultas sem confirmação, pagamentos pendentes e pacientes sem sessão há mais de 21 dias

### Configurações
- Nome da clínica e do profissional
- Alternância entre modo claro e escuro
- Ajuste de tamanho de fonte
- Exportação de backup geral em HTML

### Painel Admin
- Acesso restrito por credenciais fixas
- Visão geral de todos os dados do sistema
- Gerenciamento de usuários, pacientes, consultas e pagamentos
- Exclusão de usuários e todos os seus dados
- Sem acesso às anotações de sessão (sigilo profissional)

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 + CSS3 + JavaScript | Base do projeto |
| Firebase Auth | Autenticação de usuários |
| Firebase Firestore | Banco de dados em nuvem |
| PWA | Instalação e uso offline |
| jsPDF + html2canvas | Exportação de prontuários em PDF |
| Web Notifications API | Notificações nativas do navegador |

---

## Como rodar o projeto

### Pré-requisitos
- Conta no [Firebase](https://firebase.google.com)
- Projeto Firebase com **Authentication** (e-mail/senha) e **Firestore** ativados

### Configuração

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/consultorio-apsi.git
```

2. Configure o Firebase criando o arquivo `firebase-config.js` na raiz do projeto:
```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.firebasestorage.app",
  messagingSenderId: "SEU_ID",
  appId: "SEU_APP_ID"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
```

3. No `app.js`, configure as credenciais do admin:
```javascript
const ADMIN_EMAIL = 'seu@email.com';
const ADMIN_SENHA = 'sua_senha';
```

4. Abra o `index.html` em um servidor local ou publique no **GitHub Pages**.

---

## Estrutura do projeto

```
consultorio-apsi/
├── index.html          # Estrutura principal
├── admin.html          # Painel de administração
├── style.css           # Estilos globais
├── app.js              # Lógica principal
├── admin.js            # Lógica do painel admin
├── firebase-config.js  # Configuração do Firebase (não versionar)
├── manifest.json       # Configuração PWA
├── sw.js               # Service Worker
└── assets/
    └── logo.jpg        # Logo da clínica
```

---

## Segurança

- Autenticação gerenciada pelo Firebase Auth
- Dados isolados por usuário via `usuarioId`
- Anotações de sessão inacessíveis pelo painel admin (sigilo profissional)
- Credenciais admin hardcoded e não expostas ao banco de dados

---

## Responsividade

O sistema é responsivo para tablets e desktops, com layout adaptado para telas a partir de 768px.

---

## Desenvolvedora

Desenvolvido por **Anna Livia Maciel do Nascimento**

- GitHub:(https://github.com/annaliviamn)
- LinkedIn:(https://www.linkedin.com/in/annaliviamaciel/)

---

## Licença

Este projeto foi desenvolvido inicialmente para o consultório APSI e pode ser adaptado para outros consultórios e clínicas. Para mais informações sobre licenciamento e adaptações, entre em contato com a desenvolvedora.