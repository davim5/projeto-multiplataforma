# Requisitos do Sistema

Este documento detalha os requisitos funcionais e não-funcionais, regras de negócio, histórias de usuário e perfis de usuário para o aplicativo Cãominhada.

## 1. Requisitos Funcionais (RF)

Os requisitos funcionais descrevem as funcionalidades que o sistema deve oferecer aos usuários.

*   **RF001 - Cadastro de Usuário:** O sistema deve permitir que novos usuários (tutores e passeadores) se cadastrem, fornecendo informações como nome completo, e-mail, senha, telefone e endereço.
*   **RF002 - Login de Usuário:** O sistema deve permitir que usuários cadastrados realizem login utilizando e-mail e senha.
*   **RF003 - Gerenciamento de Perfil de Usuário:** O sistema deve permitir que usuários visualizem e editem suas informações de perfil.
*   **RF004 - Cadastro de Pet:** O sistema deve permitir que um tutor cadastre um ou mais pets, informando nome, raça, idade, porte, características e observações (ex: medos, alergias).
*   **RF005 - Gerenciamento de Pet:** O sistema deve permitir que um tutor visualize, edite e remova seus pets cadastrados.
*   **RF006 - Busca de Passeadores:** O sistema deve permitir que um tutor visualize uma lista de passeadores disponíveis, com informações básicas como nome, avaliação e localização.
*   **RF007 - Agendamento de Passeio:** O sistema deve permitir que um tutor agende um passeio para um de seus pets, selecionando data, hora, duração e, opcionalmente, um passeador específico.
*   **RF008 - Confirmação de Passeio:** O sistema deve permitir que o passeador confirme ou recuse um agendamento de passeio.
*   **RF009 - Visualização de Agendamentos:** O sistema deve permitir que tutores e passeadores visualizem seus agendamentos futuros e passados.
*   **RF010 - Avaliação de Passeio:** O sistema deve permitir que tutores avaliem o serviço do passeador após a conclusão de um passeio.
*   **RF011 - Gerenciamento de Disponibilidade do Passeador:** O sistema deve permitir que o passeador defina seus horários e dias de disponibilidade.

## 2. Requisitos Não-Funcionais (RNF)

Os requisitos não-funcionais descrevem critérios de qualidade e restrições do sistema.

*   **RNF001 - Usabilidade:** O sistema deve possuir uma interface de usuário intuitiva e de fácil navegação para tutores e passeadores.
*   **RNF002 - Responsividade:** A aplicação deve ser totalmente responsiva, adaptando-se a diferentes tamanhos de tela (smartphones e tablets).
*   **RNF003 - Performance:** O tempo de resposta para operações críticas (login, agendamento) não deve exceder 3 segundos.
*   **RNF004 - Segurança:** O sistema deve garantir a segurança dos dados dos usuários e pets, utilizando autenticação baseada em JWT (JSON Web Tokens) para todas as requisições à API.
*   **RNF005 - Confiabilidade:** O sistema deve garantir a persistência dos dados, com backups regulares do banco de dados.
*   **RNF006 - Escalabilidade:** A arquitetura do sistema deve ser capaz de suportar um aumento no número de usuários e agendamentos sem degradação significativa de performance.
*   **RNF007 - Manutenibilidade:** O código-fonte deve ser modular, bem documentado e seguir padrões de codificação para facilitar futuras manutenções e evoluções.

## 3. Regras de Negócio

As regras de negócio definem as políticas e restrições que governam o funcionamento do sistema.

*   **RN001:** Apenas usuários cadastrados e autenticados podem realizar agendamentos de passeios.
*   **RN002:** Cada pet cadastrado deve estar vinculado a um único tutor.
*   **RN003:** Cada agendamento de passeio deve estar vinculado a um pet e, opcionalmente, a um passeador disponível.
*   **RN004:** Um passeador só pode aceitar um passeio se estiver disponível no horário solicitado.
*   **RN005:** Um tutor só pode avaliar um passeador após a conclusão do passeio.
*   **RN006:** O cadastro de passeador requer a aprovação de um administrador (futura funcionalidade, mas implícita na regra).

## 4. Histórias de Usuário

As histórias de usuário descrevem as funcionalidades do ponto de vista do usuário, focando no valor que elas entregam.

*   **HU001:** Como **tutor**, quero **cadastrar meu pet** para **poder agendar passeios para ele**.
*   **HU002:** Como **tutor**, quero **visualizar passeadores disponíveis** para **escolher o mais adequado para meu pet**.
*   **HU003:** Como **tutor**, quero **agendar um passeio** para **garantir que meu pet se exercite regularmente**.
*   **HU004:** Como **passeador**, quero **receber notificações de novos agendamentos** para **poder aceitar ou recusar o serviço**.
*   **HU005:** Como **passeador**, quero **gerenciar minha disponibilidade** para **controlar meus horários de trabalho**.
*   **HU006:** Como **tutor**, quero **avaliar o passeador** para **contribuir com a qualidade do serviço na plataforma**.
*   **HU007:** Como **usuário**, quero **criar uma conta** para **acessar as funcionalidades do aplicativo**.
*   **HU008:** Como **usuário**, quero **fazer login** para **acessar minha conta de forma segura**.

## 5. Perfis de Usuários

Os perfis de usuários representam os diferentes tipos de atores que interagem com o sistema.

*   **Tutor:**
    *   **Descrição:** Proprietário de um ou mais cães que busca serviços de passeio.
    *   **Ações:** Cadastrar-se, fazer login, cadastrar pets, buscar passeadores, agendar passeios, visualizar agendamentos, avaliar passeadores, gerenciar perfil.
*   **Passeador:**
    *   **Descrição:** Profissional que oferece serviços de passeio com cães.
    *   **Ações:** Cadastrar-se, fazer login, gerenciar perfil, definir disponibilidade, visualizar agendamentos, aceitar/recusar passeios.
*   **Administrador:**
    *   **Descrição:** Responsável pela gestão e manutenção da plataforma (perfil com funcionalidades mais amplas, a serem detalhadas em fases futuras).
    *   **Ações (previstas):** Gerenciar usuários, gerenciar passeadores (aprovação), monitorar o sistema, gerenciar conteúdo.
