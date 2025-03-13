# Todo List Application

Este projeto é uma aplicação web completa com sistema de autenticação e gerenciamento de produtos, desenvolvida com Next.js no frontend e NestJS no backend.

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

### Frontend (`frontend/`)
- `src/components/`: Componentes React reutilizáveis
  - `Navbar.tsx`: Barra de navegação com menu responsivo
  - `ProductForm.tsx`: Formulário para criar/editar produtos
  - `ProductList.tsx`: Lista de produtos com opções de gerenciamento
  - `LoginForm.tsx`: Formulário de login
  - `RegisterForm.tsx`: Formulário de registro
  - `ProtectedLayout.tsx`: Layout para rotas protegidas
  - `PrivateRoute.tsx`: Componente de rota privada com autenticação

- `src/lib/`: Utilitários e configurações
- `src/pages/`: Páginas da aplicação
- `src/App.tsx`: Componente principal da aplicação
- `src/apollo-client.ts`: Configuração do cliente GraphQL

### Backend (`backend/`)
- `src/auth/`: Módulo de autenticação
  - Implementação de JWT
  - Registro e login de usuários
  - Middleware de autenticação

- `src/products/`: Módulo de produtos
  - CRUD completo de produtos
  - Validação de dados
  - Relacionamento com usuários

- `src/prisma/`: Configuração do Prisma ORM
- `src/common/`: Utilitários e decoradores compartilhados

## Tecnologias Utilizadas

### Frontend
- Next.js 14
- React
- Tailwind CSS
- Apollo Client para GraphQL
- TypeScript
- React Router DOM
- Axios

### Backend
- NestJS
- Prisma ORM
- PostgreSQL
- JWT para autenticação
- TypeScript
- Class Validator
- Passport

## Funcionalidades

### Autenticação
- Registro de novos usuários
- Login com JWT
- Proteção de rotas
- Gerenciamento de sessão

### Gerenciamento de Produtos
- Listagem de produtos com paginação
- Criação de novos produtos
- Edição de produtos existentes
- Exclusão de produtos
- Filtragem e busca de produtos

### Interface
- Design responsivo
- Navegação intuitiva
- Feedback visual de ações
- Formulários com validação
- Mensagens de erro/sucesso

## Como Executar o Projeto Localmente

### Backend

1. Entre na pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente criando um arquivo `.env` com:
```
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET=seu_jwt_secret
```

4. Execute as migrações do Prisma:
```bash
npx prisma migrate dev
```

5. Execute o servidor:
```bash
npm run start:dev
```

### Frontend

1. Entre na pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente criando um arquivo `.env.local` com:
```
NEXT_PUBLIC_API_URL=http://localhost:3000
```

4. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

## Deploy

### Frontend (Vercel)
1. Conecte seu repositório à Vercel
2. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_API_URL`: URL do backend em produção
3. Deploy automático a partir da branch principal

### Backend (Vercel)
1. Configure o arquivo `vercel.json` (já incluído no projeto)
2. Configure as variáveis de ambiente na Vercel:
   - `DATABASE_URL`
   - `JWT_SECRET`
3. Deploy automático a partir da branch principal

## Estrutura de Arquivos Detalhada

```
.
├── backend/
│   ├── src/
│   │   ├── auth/
│   │   │   ├── dto/
│   │   │   ├── guards/
│   │   │   └── strategies/
│   │   ├── products/
│   │   │   ├── dto/
│   │   │   └── entities/
│   │   ├── prisma/
│   │   ├── common/
│   │   └── main.ts
│   ├── prisma/
│   │   └── schema.prisma
│   ├── package.json
│   └── vercel.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── lib/
│   │   ├── pages/
│   │   └── App.tsx
│   ├── package.json
│   └── next.config.js
└── README.md
```

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request 