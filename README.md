
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
cd DesafioAmbisis_EmpresaLicenca
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

## Fotos do Sistema

![image](https://github.com/user-attachments/assets/07ccde36-fdba-416b-b9b6-8dfcfe303886)
<br>
Organização e Estruturação do Código

![image](https://github.com/user-attachments/assets/4998a9bc-e106-4df2-b275-628bc26a6c10)
<br>
Diagrama de Classes

![image](https://github.com/user-attachments/assets/d901d74b-6853-4298-ad09-436ec673c618)
<br>
Tela Principal

![image](https://github.com/user-attachments/assets/f523eb59-2400-41de-9d30-3ff631190234)
<br>
Tela Saiba Mais

![image](https://github.com/user-attachments/assets/f5a30d6f-3647-4a6b-81a3-3a9fdfe9493f)
<br>
Tela Lista de Empresas

![image](https://github.com/user-attachments/assets/60bc83b4-5a19-43d5-83be-5a22cdb58a0c)
<br>
Tela Cadastro Empresas, com api para puxar informações pelo CEP e máscaras em todos os campos

![image](https://github.com/user-attachments/assets/8a616f31-5fb8-429d-87a2-9165d569343d)
<br>
Tela Cadastro Licenças associando a uma empresa já cadastrada

![image](https://github.com/user-attachments/assets/1598739f-f79a-4e4a-8651-4e1a75e6dc38)
<br>
Tela Listar as Licenças associadas a uma empresa

![image](https://github.com/user-attachments/assets/2ca641d9-9b7c-4af4-922d-58c00baca2b2)
<br>
Footer com meus sites pessoais

![image](https://github.com/user-attachments/assets/5351e930-eee1-4a33-88f8-5edb60f13aa5)
<br>
Para mobile a navbar muda e vira um menu hamburguer












