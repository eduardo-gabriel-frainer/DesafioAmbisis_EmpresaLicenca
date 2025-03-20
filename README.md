
# Desafio Ambisis - Next.js com TypeScript

Este projeto é uma aplicação desenvolvida com Next.js e TypeScript, focada em gerenciar empresas e licenças ambientais.

## Tecnologias Utilizadas
* Next.js
* TypeScript
* Tailwind CSS
* Prisma.js
* MySQL

---

## Pré-requisitos
Antes de rodar o projeto, é necessário ter os seguintes pré-requisitos instalados na sua máquina:

- **Node.js**: Baixar e instalar
- **npm**: Gerenciador de pacotes
- **MySQL**: Baixar e instalar MySQL
- **Prisma CLI**: Ferramenta de linha de comando para o Prisma.

---

## Instalação e Execução

### 1. Clonar o Repositório

Primeiro, clone o repositório para sua máquina local:

```bash
git clone https://github.com/eduardo-gabriel-frainer/DesafioAmbisis_EmpresaLicenca
```

Em seguida, acesse o diretório do projeto:

```bash
cd desafio-ambisis
```



## 2. Instalar as Dependências
   
Instale as dependências do projeto utilizando o npm:

```bash
npm install
```

---

## 3. Configuração do Banco de Dados MySQL

Crie a conexão no MySQL com as seguintes informações:

- **Connection Name**: `localhost`
- **Username**: `root`

### OU

Se você já possui uma conexão estabelecida ou com senha, configure o `.env` com a URL de conexão do seu banco de dados:

```env
DATABASE_URL="mysql://root:SUA_SENHA@localhost:3306/empresa_licenca"
```

---

## 4. Criar o Banco de Dados

Crie o banco de dados no MySQL com o seguinte comando:

```sql
CREATE DATABASE empresa_licenca;
```

---

## 5. Migrar o Banco de Dados com Prisma

Execute a migração do banco de dados utilizando o Prisma CLI:

```bash
npx prisma migrate dev --name init
```

---

## 6. Rodar o Projeto

Para rodar o projeto localmente, execute o comando:

```bash
npm run dev
```
