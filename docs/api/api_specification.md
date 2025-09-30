# Especificação da API

Este documento detalha a especificação da API RESTful para o Cãominhada, incluindo os endpoints previstos, formatos de requisição e resposta, e o mecanismo de autenticação e autorização.

## 1. Autenticação e Autorização (JWT)

A API utilizará **JSON Web Tokens (JWT)** para autenticação e autorização. Após o login bem-sucedido, o servidor emitirá um token JWT que deverá ser incluído no cabeçalho `Authorization` de todas as requisições subsequentes, no formato `Bearer <token>`.

*   **Endpoint de Login:**
    *   `POST /auth/login`
    *   **Requisição:**
        ```json
        {
            "email": "usuario@example.com",
            "senha": "minhasenha123"
        }
        ```
    *   **Resposta (Sucesso - Status 200 OK):**
        ```json
        {
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "usuario": {
                "_id": "65b1a2c3d4e5f6a7b8c9d0e1",
                "nome": "Nome do Usuário",
                "email": "usuario@example.com",
                "tipo": "tutor"
            }
        }
        ```
    *   **Resposta (Erro - Status 401 Unauthorized):**
        ```json
        {
            "mensagem": "Credenciais inválidas"
        }
        ```

## 2. Endpoints da API

### 2.1. Cadastro de Usuário

*   **Endpoint:** `POST /usuarios`
*   **Descrição:** Cria um novo usuário (tutor ou passeador) no sistema.
*   **Requisição:**
    ```json
    {
        "nome": "João Silva",
        "email": "joao.silva@example.com",
        "senha": "senhaSegura123",
        "telefone": "(11) 98765-4321",
        "tipo": "tutor" 
    }
    ```
*   **Resposta (Sucesso - Status 201 Created):**
    ```json
    {
        "_id": "65b1a2c3d4e5f6a7b8c9d0e2",
        "nome": "João Silva",
        "email": "joao.silva@example.com",
        "telefone": "(11) 98765-4321",
        "tipo": "tutor",
        "createdAt": "2025-09-29T10:00:00.000Z"
    }
    ```
*   **Resposta (Erro - Status 400 Bad Request):**
    ```json
    {
        "mensagem": "Email já cadastrado ou dados inválidos"
    }
    ```

### 2.2. Cadastro de Pet

*   **Endpoint:** `POST /pets`
*   **Descrição:** Cadastra um novo pet para o tutor autenticado.
*   **Requisição (com Token JWT no cabeçalho Authorization):**
    ```json
    {
        "nome": "Rex",
        "raca": "Labrador",
        "idade": 3,
        "porte": "grande",
        "obs": "Amigável, mas tem medo de trovões"
    }
    ```
*   **Resposta (Sucesso - Status 201 Created):**
    ```json
    {
        "_id": "65b1a2c3d4e5f6a7b8c9d0e3",
        "nome": "Rex",
        "raca": "Labrador",
        "idade": 3,
        "porte": "grande",
        "obs": "Amigável, mas tem medo de trovões",
        "tutor_id": "65b1a2c3d4e5f6a7b8c9d0e2",
        "createdAt": "2025-09-29T10:05:00.000Z"
    }
    ```
*   **Resposta (Erro - Status 400 Bad Request):**
    ```json
    {
        "mensagem": "Dados do pet inválidos"
    }
    ```
*   **Resposta (Erro - Status 401 Unauthorized):**
    ```json
    {
        "mensagem": "Token não fornecido ou inválido"
    }
    ```

### 2.3. Agendamento de Passeio

*   **Endpoint:** `POST /passeios`
*   **Descrição:** Agenda um novo passeio para um pet do tutor autenticado.
*   **Requisição (com Token JWT no cabeçalho Authorization):**
    ```json
    {
        "pet_id": "65b1a2c3d4e5f6a7b8c9d0e3",
        "passeador_id": "65b1a2c3d4e5f6a7b8c9d0e4", 
        "data": "2025-10-15",
        "hora_inicio": "14:00",
        "duracao": 60,
        "observacoes": "Por favor, leve-o ao parque"
    }
    ```
*   **Resposta (Sucesso - Status 201 Created):**
    ```json
    {
        "_id": "65b1a2c3d4e5f6a7b8c9d0e5",
        "pet_id": "65b1a2c3d4e5f6a7b8c9d0e3",
        "tutor_id": "65b1a2c3d4e5f6a7b8c9d0e2",
        "passeador_id": "65b1a2c3d4e5f6a7b8c9d0e4",
        "data": "2025-10-15T00:00:00.000Z",
        "hora_inicio": "14:00",
        "duracao": 60,
        "status": "pendente",
        "observacoes": "Por favor, leve-o ao parque",
        "createdAt": "2025-09-29T10:10:00.000Z"
    }
    ```
*   **Resposta (Erro - Status 400 Bad Request):**
    ```json
    {
        "mensagem": "Dados do passeio inválidos ou passeador indisponível"
    }
    ```
*   **Resposta (Erro - Status 401 Unauthorized):**
    ```json
    {
        "mensagem": "Token não fornecido ou inválido"
    }
    ```

### 2.4. Listar Passeadores

*   **Endpoint:** `GET /passeadores`
*   **Descrição:** Retorna uma lista de passeadores disponíveis, com informações básicas.
*   **Requisição (com Token JWT no cabeçalho Authorization):**
    ```
    GET /passeadores
    ```
*   **Resposta (Sucesso - Status 200 OK):**
    ```json
    [
        {
            "_id": "65b1a2c3d4e5f6a7b8c9d0e4",
            "nome": "Maria Souza",
            "email": "maria.souza@example.com",
            "telefone": "(11) 99887-6655",
            "area": "Centro",
            "avaliacao_media": 4.8
        },
        {
            "_id": "65b1a2c3d4e5f6a7b8c9d0e6",
            "nome": "Pedro Santos",
            "email": "pedro.santos@example.com",
            "telefone": "(11) 97766-5544",
            "area": "Zona Sul",
            "avaliacao_media": 4.5
        }
    ]
    ```
*   **Resposta (Erro - Status 401 Unauthorized):**
    ```json
    {
        "mensagem": "Token não fornecido ou inválido"
    }
    ```
*   **Resposta (Erro - Status 500 Internal Server Error):**
    ```json
    {
        "mensagem": "Erro interno do servidor"
    }
    ```

