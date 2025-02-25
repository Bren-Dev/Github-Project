# 📘 Instruções para Executar a Aplicação

Este guia fornece todas as instruções necessárias para configurar e executar a aplicação localmente. A aplicação é construída com **Next.js** e utiliza a **API do GitHub** para buscar repositórios e informações de perfil.

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de que você possui os seguintes requisitos instalados em sua máquina:

✅ **Node.js** (versão 16 ou superior)  
✅ **npm ou Yarn** (gerenciadores de pacotes)  
✅ **Git** (para clonar o repositório)

---

## 🚀 Passos para Configuração

### 1️⃣ Clonar o Repositório

Clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/seu-usuario/projeto-magazord.git
cd projeto-magazord
```

### 2️⃣ Instalar Dependências

Instale as dependências necessárias:

```bash
npm install
# ou
yarn install
```

### 3️⃣ Configurar Variáveis de Ambiente

A aplicação utiliza um **token de acesso pessoal do GitHub** para autenticar as requisições à API. Siga os passos abaixo para configurá-lo:

1. Crie um arquivo `.env.local`.
2.  Adicione valor das variáveis `GITHUB_TOKEN` e `GITHUB_USER`:

```typescript
GITHUB_TOKEN=seu_token
GITHUB_USER=seu_user
```

🔹 **Nota:** Substitua `seu-token` pelo seu token de acesso pessoal do GitHub. Você pode gerar um token [aqui](https://github.com/settings/tokens). Certifique-se de que o token tenha permissões para acessar repositórios públicos.

### 4️⃣ Executar a Aplicação

Inicie a aplicação localmente:

```bash
npm run dev
# ou
yarn dev
```

### 5️⃣ Acessar a Aplicação

Abra seu navegador e acesse **[http://localhost:3000](http://localhost:3000)**. Você verá a interface da aplicação exibindo informações do perfil do GitHub e uma lista de repositórios.

---

## 📁 Estrutura do Projeto

```
app/           # Contém as páginas da aplicação.
  └── page.tsx      # Página inicial da aplicação.

components/      # Contém os componentes React utilizados na aplicação.
  ├── Dropdown.tsx   # Componente de dropdown reutilizável.
  ├── GithubRepositories.tsx  # Componente principal que exibe os repositórios.
  ├── Header.tsx     # Cabeçalho da aplicação.
  ├── ProfileSection.tsx  # Seção que exibe informações do perfil do GitHub.
  └── RepoCard.tsx   # Card que exibe informações de um repositório.

hooks/           # Contém hooks personalizados.
  └── useGithubRepos.ts  # Hook para buscar repositórios do GitHub.
public/          # Contém arquivos estáticos como imagens e ícones.

```

---

## 🛠️ Solução de Problemas

### ❌ Erro ao Buscar Dados do GitHub

Se houver problemas ao buscar dados do GitHub, verifique:

🔹 O token possui permissões para acessar repositórios públicos?  
🔹 O nome de usuário do GitHub está correto?

### ⏳ Dependências Desatualizadas

Caso encontre problemas com dependências desatualizadas, execute:

```bash
npm update
# ou
yarn upgrade
```

---

🚀 Agora você tem todas as informações para configurar e executar a aplicação! **Bons códigos!** 🖥️✨

---

- Desafios/problemas com os quais você se deparou durante a execução do projeto.

Um dos desafios foi a questão do token com relação a segurança do github, eu ainda não havia configurado essas variáveis no vercel, foi um desafio ^^ 

- Maneiras através das quais você pode melhorar a aplicação, seja em performance, estrutura ou padrões.

Acredito que eu poderia melhorar mais com relação ao design pattern
