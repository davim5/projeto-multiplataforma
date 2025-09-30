# Cãominhada

## Título e Descrição do Projeto

Este projeto consiste no desenvolvimento de um aplicativo multiplataforma para agendamento e contratação de serviços de passeio com cachorros. O objetivo principal é conectar tutores de pets a passeadores qualificados, facilitando a gestão e a contratação de passeios de forma eficiente e segura.

## Problema Abordado e Justificativa

Com a crescente urbanização e a rotina agitada, muitos tutores de cães enfrentam dificuldades para garantir que seus pets recebam a quantidade adequada de exercícios e socialização. A falta de tempo ou a ausência de opções confiáveis de passeadores pode comprometer o bem-estar animal. Este aplicativo surge como uma solução para esse problema, oferecendo uma plataforma centralizada onde tutores podem encontrar, agendar e gerenciar passeios para seus cães com profissionais verificados.

## Objetivos do Sistema

- **Facilitar o agendamento:** Proporcionar uma interface intuitiva para tutores agendarem passeios.

- **Conectar tutores e passeadores:** Criar um ecossistema onde tutores encontram passeadores e vice-versa.

- **Garantir a segurança:** Implementar mecanismos de verificação para passeadores e feedback para tutores.

- **Otimizar a gestão:** Permitir que tutores e passeadores gerenciem seus perfis, pets e agendamentos.

## Escopo do Projeto (Funcionalidades Mínimas)

O escopo inicial do projeto foca nas seguintes funcionalidades essenciais:

1. **Cadastro de Usuário:** Permite que tutores e passeadores criem e gerenciem seus perfis na plataforma.

1. **Cadastro de Pet:** Tutores podem registrar seus cães, incluindo informações relevantes como nome, raça, idade e necessidades especiais.

1. **Agendamento de Passeio:** Tutores podem solicitar e agendar passeios, selecionando datas, horários e, opcionalmente, um passeador específico.

1. **Seleção de Passeador:** Tutores podem visualizar perfis de passeadores disponíveis e escolher um para o passeio.

## Visão Geral da Arquitetura

A arquitetura do sistema segue um modelo cliente-servidor, com um frontend desenvolvido em Ionic, um backend em Node.js e um banco de dados MongoDB. A comunicação entre o frontend e o backend é realizada através de uma API RESTful.

```
+-------------------+       +-------------------+       +-------------------+
|     Frontend      |       |      Backend      |       |     Database      |
|    (Ionic App)    | <---> |    (Node.js API)  | <---> |     (MongoDB)     |
+-------------------+       +-------------------+       +-------------------+
      Mobile/Web                  API/Logic                 Data Storage
```

## Tecnologias Propostas

- **Backend/API:** Node.js (para desenvolvimento rápido e escalabilidade)

- **Frontend:** Ionic (para desenvolvimento multiplataforma com uma única base de código)

- **Banco de Dados:** MongoDB (para flexibilidade e escalabilidade com dados não-estruturados)

## Cronograma para Etapa 2 (N708)

| Fase | Descrição | Prazo Estimado |
| --- | --- | --- |
| **Design UI/UX** | Criação de wireframes e protótipos de alta fidelidade para as telas principais. | 2 semanas |
| **Desenvolvimento Backend** | Implementação da API RESTful (endpoints de usuário, pet, passeio, passeador). | 4 semanas |
| **Desenvolvimento Frontend** | Implementação das telas e integração com a API. | 4 semanas |
| **Testes Iniciais** | Testes unitários e de integração das funcionalidades principais. | 2 semanas |

## Integrantes da Equipe e Seus Papéis

Este projeto está sendo desenvolvido individualmente como parte da Atividade Parcial N705 — Planejamento e Arquitetura de Sistema Multiplataforma, Etapa 1. O trabalho é uma entrega individual, demonstrando a capacidade de concepção e planejamento de um sistema completo.

## ODS 11: Cidades e Comunidades Sustentáveis

Embora indiretamente, o aplicativo contribui para o ODS 11 ao promover o bem-estar animal em ambientes urbanos. Ao facilitar o acesso a passeadores, o aplicativo incentiva a prática de exercícios para cães, o que pode reduzir problemas de comportamento e melhorar a convivência em comunidades, tornando as cidades mais amigáveis para pets e seus tutores. Além disso, ao otimizar o tempo dos tutores, pode-se incentivar o uso de espaços públicos de forma mais consciente e organizada.

