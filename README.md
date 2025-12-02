# Cãominhada

## Título e Descrição do Projeto

Este projeto consiste no desenvolvimento de um aplicativo multiplataforma para agendamento e contratação de serviços de passeio com cachorros. O objetivo principal é conectar tutores de pets a passeadores qualificados, facilitando a gestão e a contratação de passeios de forma eficiente e segura.

## Funcionalidades Implementadas

1. **Cadastro de Usuário:** Permite que tutores e passeadores criem e gerenciem seus perfis na plataforma.

1. **Cadastro de Pet:** Tutores podem registrar seus cães, incluindo informações relevantes como nome, raça, idade e necessidades especiais.

1. **Agendamento de Passeio:** Tutores podem solicitar e agendar passeios, selecionando datas, horários e, opcionalmente, um passeador específico.

1. **Seleção de Passeador:** Tutores podem visualizar perfis de passeadores disponíveis e escolher um para o passeio.

## Tecnologias Utilizadas

- **Frontend:** Ionic, React, Typescript.

- **Backend:** Node.js, JWT, express.

- **Banco de dados:** MongoDB.

- **Ferramentas de Desenvolvimento:** VSCode, Insomnia, MongoDB Compass.

## Escopo do Projeto (Funcionalidades Mínimas)


## Visão Geral da Arquitetura

A arquitetura do sistema segue um modelo cliente-servidor, com um frontend desenvolvido em Ionic, um backend em Node.js e um banco de dados MongoDB. A comunicação entre o frontend e o backend é realizada através de uma API RESTful.

```
+-------------------+       +-------------------+       +-------------------+
|     Frontend      |       |      Backend      |       |     Database      |
|    (Ionic App)    | <---> |    (Node.js API)  | <---> |     (MongoDB)     |
+-------------------+       +-------------------+       +-------------------+
      Mobile/Web                  API/Logic                 Data Storage
```

## Intruções de instalação e execução 
```
cd ./frontend 
npm run start

cd ./backend 
npm run start

app rodará em http://localhost:3000/

```

## Equipe de desenvolvimento

Davi Araújo Mendonça Lima - 2222941

Esta atividade está sendo desenvolvida individualmente.

## ODS 11: Cidades e Comunidades Sustentáveis

O aplicativo contribui para o ODS 11 ao melhorar a qualidade de vida de tutores de pets e promover uma convivência mais harmoniosa nas cidades. Ao facilitar o acesso a passeadores, ele permite que os tutores conciliem melhor suas rotinas com os cuidados dos animais, reduzindo estresse e aumentando o bem-estar tanto dos pets quanto de seus donos. Com isso, os passeios tornam-se mais frequentes e organizados, estimulando o uso consciente de espaços públicos e fortalecendo a criação de comunidades urbanas mais seguras, acolhedoras e sustentáveis para pessoas e animais.

