# MeuLaudo — Plataforma Digital de Exames

Plataforma segura e compliant com LGPD para entrega digital de exames médicos. Permite que clínicas compartilhem resultados de forma segura através de links personalizados com acesso por CPF e protocolo.

## 🎯 Sobre

**MeuLaudo** é uma solução enterprise para:
- Envio seguro de exames médicos digitais
- Compartilhamento de resultados com pacientes via WhatsApp
- Consulta de exames com autenticação por CPF e protocolo
- Conformidade total com LGPD e proteção de dados

## 📋 Pré-requisitos

- **Node.js** 20+
- **PostgreSQL** 14+ (para ambiente local)
- **npm** ou **pnpm**

## 🚀 Setup Rápido

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Copie `.env.example` para `.env.local` e configure:

```bash
DATABASE_URL="postgres://user:password@localhost:5432/meu-laudo"
JWT_SECRET="seu-jwt-secret-de-32-caracteres"
EVOLUTION_API_URL="https://seu-evolution-api.com"
EVOLUTION_API_KEY="sua-api-key"
```

### 3. Setup do banco de dados

```bash
npm run db:seed
```

### 4. Rodar servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📁 Estrutura do Projeto

```
app/
├── (protected)/          # Rotas autenticadas
│   ├── exams/           # Gerenciamento de exames
│   ├── users/           # Gerenciamento de usuários
│   └── actions/         # Server actions
├── (public)/            # Rotas públicas
│   ├── patient/         # Consulta de pacientes
│   └── auth/            # Autenticação
├── layout.tsx           # Layout raiz
└── globals.css          # Estilos globais

components/
├── ui/                  # Componentes base (Input, Button, etc)
└── shared/              # Componentes compartilhados

lib/
├── auth/                # Funções de autenticação
├── prisma.ts           # Cliente Prisma
└── utils.ts            # Utilidades

schema/                  # Schemas Zod

public/                  # Imagem e assets estáticos
```

## 🛠 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Build para produção |
| `npm start` | Inicia servidor de produção |
| `npm run lint` | Verifica padrões de código (Biome) |
| `npm run format` | Formata código (Biome) |
| `npm run db:seed` | Executa seed do banco |

## 🔐 Autenticação

- **Método**: JWT em cookie HTTP-only
- **Hash de senha**: bcrypt
- **Proteção**: CSRF via validação de sessão
- **Sessão**: Verificação em server actions e route handlers

Consulte `lib/auth/` para detalhes de implementação.

## 🎨 Design System

### Fontes
- **DM Sans**: Font padrão para todo o projeto
- Importadas via Google Fonts

### Cores (Tailwind)
- **Sky**: `sky-900`, `sky-400` — marca, focus
- **Slate**: `slate-900`, `slate-500` — corpo de texto
- **Emerald**: `emerald-600` — sucesso
- **Rose**: `rose-600` — erro

### Componentes
Componentes de UI base em `components/ui/`:
- Input com validação
- Button com variantes
- Dialog e AlertDialog
- Select e Label

## 📦 Dependências Principais

- **Next.js 16** — Framework React
- **React 19** — Biblioteca UI
- **Prisma** — ORM para banco de dados
- **Zod** — Validação de schemas
- **React Hook Form** — Gerenciamento de formulários
- **Sonner** — Toast notifications
- **TanStack Table** — Tabelas avançadas
- **Lucide React** — Ícones

## 📚 Padrões de Desenvolvimento

Consulte `CLAUDE.md` para diretrizes obrigatórias:
- Convenções de nomes (kebab-case para arquivos)
- Organização por feature
- Uso de Server Components
- Padrão de Server Actions
- Estrutura de formulários e schemas

## 🔄 Fluxo de Desenvolvimento

1. **Feature Branch**: Crie uma branch com prefixo `feature/`, `fix/` ou `docs/`
2. **Commits**: Mensagens em inglês, imperativo
3. **PR**: Descreva mudanças e teste localmente
4. **Merge**: Squash commits se necessário

## 📱 Features

- ✅ Autenticação de clínica
- ✅ Upload seguro de exames (PDF, DICOM)
- ✅ Compartilhamento via WhatsApp
- ✅ Consulta pública por CPF e protocolo
- ✅ Validação de dados com Zod
- ✅ Responsive design
- ✅ Compliance LGPD

## 🐛 Reportar Issues

Encontrou um bug? Abra uma issue descrevendo:
- Comportamento esperado vs. observado
- Passos para reproduzir
- Seu ambiente (OS, navegador, Node.js version)

## 📄 Licença

Propriedade de MeuLaudo — Todos os direitos reservados.

---

**Dúvidas?** Consulte a documentação ou entre em contato com a equipe de desenvolvimento.
