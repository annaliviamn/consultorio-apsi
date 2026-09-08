# APSI — Sistema de Prontuários

Sistema de gestão clínica desenvolvido como PWA (Progressive Web App) para o consultório **APSI — Atendimento Psicológico**. Permite gerenciar pacientes, consultas, sessões, pagamentos e alertas de forma segura e acessível em qualquer dispositivo.

---

## Funcionalidades

### Autenticação
- Cadastro e login de usuários via **Firebase Auth**
- Alteração de senha segura com reautenticação
- Painel de administração com acesso restrito, controlado pelas regras do Firestore
- Modo "Ver como doutor": o administrador visualiza o app como o profissional, reaproveitando a sessão já autenticada, sem exigir nova senha

### Prontuários
- Cadastro completo de pacientes com dados pessoais, clínicos e de atendimento
- Status do paciente (Ativo, Alta ou Desistente), com destaque visual no card
- Edição e exclusão de pacientes
- Busca em tempo real por nome
- Listagem em ordem alfabética
- Exportação individual de prontuário em **PDF**

### Agenda
- Calendário mensal interativo com indicadores de dias com consultas
- Grade de horários de 7h às 20h
- Geração automática de consultas (semanal, quinzenal ou mensal)
- Encaixe de consultas em horários livres, com distinção entre sessão extra (com cobrança adicional) e reagendamento de falta (sem cobrança)
- Feriados nacionais e do Distrito Federal calculados automaticamente (sem depender de API externa), com aviso visual na agenda e sem geração automática de consultas nesses dias
- Edição, reagendamento e cancelamento de consultas
- Conclusão automática de consultas confirmadas após o horário

### Dashboard
- 4 cards interativos: Consultas hoje, Pacientes ativos, Próxima consulta e Pagamentos
- Acesso rápido ao perfil do paciente clicando em qualquer item da lista
- Atualização automática de status das consultas

### Cronômetro de Sessão
- Cronômetro regressivo integrado ao registro de sessão, baseado em tempo real (não é afetado por o navegador ficar em segundo plano)
- Sincronizado com a duração cadastrada de cada paciente
- Funções de iniciar, pausar e resetar

### Histórico de Sessões
- Registro de anotações por sessão, com anexo de imagens reutilizáveis entre pacientes
- Indicador de evolução do paciente (positiva, estável ou negativa)
- Edição e exclusão de sessões anteriores
- Gráfico de evolução do paciente ao longo do tratamento

### Documentos em PDF
- Relatório de sessão individual
- Relatório de sessões por período (compilado, com paginação inteligente por sessão)
- Atestado de Comparecimento (com campo opcional de dias de repouso)
- Atestado de Acompanhamento
- Recibo de pagamento, somando sessões mensais e encaixes pagos
- Cabeçalho padronizado com logo, CNPJ, endereço, telefone e CRP em todos os documentos

### Controle de Pagamentos
- Registro de pagamentos mensais por paciente
- Status de pago, pendente ou atrasado
- Encaixes (sessões extras) com status de pagamento próprio, somados ao valor do mês
- Geração automática do pagamento ao cadastrar paciente
- Visibilidade no dashboard e nos alertas

### Alertas e Notificações
- Central de alertas com prioridade (urgente, atenção, ok)
- Notificações nativas do navegador
- Alertas para consultas sem confirmação, pagamentos pendentes e pacientes sem sessão há mais de 21 dias

### Configurações
- Nome da clínica, CNPJ, endereço, telefone e CRP do profissional
- Alternância entre modo claro e escuro
- Ajuste de tamanho de fonte
- Exportação de backup geral em HTML

### Painel Admin
- Acesso restrito por regras do Firestore (campo `admin: true` na coleção `usuarios`)
- Visão geral de todos os dados do sistema
- Gerenciamento de usuários, pacientes, consultas e pagamentos
- Exclusão de usuários e todos os seus dados
- Sem acesso às anotações de sessão, nem mesmo em modo leitura (sigilo profissional garantido também no nível do banco de dados)

---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| HTML5 + CSS3 + JavaScript | Base do projeto |
| Firebase Auth | Autenticação de usuários |
| Firebase Firestore | Banco de dados em nuvem, com regras de segurança por dono dos dados |
| PWA | Instalação e uso offline |
| jsPDF + html2canvas | Exportação de documentos em PDF |
| Chart.js | Gráfico de evolução do paciente |
| Web Notifications API | Notificações nativas do navegador |

---

## Como rodar o projeto

### Pré-requisitos
- Conta no [Firebase](https://firebase.google.com)
- Projeto Firebase com **Authentication** (e-mail/senha) e **Firestore** ativados

### Configuração

1. Clone o repositório:
```bash
git clone https://github.com/annaliviamn/consultorio-apsi.git
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

3. No Firestore, crie a coleção `usuarios` com um documento cujo ID seja o UID do usuário administrador (visível em Authentication → Users), contendo o campo:
```javascript
{ admin: true }
```

4. Publique as regras de segurança do Firestore (disponíveis no Console do Firebase → Firestore → Regras).

5. Abra o `index.html` em um servidor local ou publique no **GitHub Pages**.

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
- Regras do Firestore restringem leitura e escrita por dono dos dados (`usuarioId`)
- Acesso de administrador controlado por um campo (`admin: true`) na coleção `usuarios`, verificado nas próprias regras do Firestore — sem credenciais fixas no código-fonte
- Anotações de sessão nunca são acessíveis pelo painel admin, nem mesmo em modo leitura (sigilo profissional garantido também no nível do banco de dados, não só na interface)
- Modo "Ver como doutor" permite ao administrador visualizar o app como o profissional, reaproveitando a sessão já autenticada, sem exigir nova senha

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
