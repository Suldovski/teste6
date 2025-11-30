# Sistema Luan Suldovski - Front-end

Front-end TypeScript puro para o sistema de empréstimos de livros da biblioteca.

## 🚀 Como executar

### 1. Instalar dependências
```bash
npm install
```

### 2. Compilar TypeScript e rodar o servidor
```bash
npm start
```

O sistema abrirá automaticamente no navegador em `http://localhost:3000`

## ⚙️ Pré-requisitos

- **Back-end rodando na porta 5000** (`http://localhost:5000`)
- Node.js instalado

## 📋 Funcionalidades

### 1. Novo Empréstimo
- Cadastrar nome do livro e do aluno
- Sistema retorna data prevista de devolução (7 dias)

### 2. Histórico de Empréstimos
- Lista todos os empréstimos
- Mostra status, datas e multas

### 3. Devolução de Livro
- Informar ID do empréstimo
- Selecionar data real da devolução
- Sistema calcula multa automaticamente (R$ 2,50 por dia de atraso)

### 4. Empréstimos Atrasados
- Lista apenas empréstimos com prazo vencido
- Destaca data prevista em negrito

## 🎨 Visual

Interface minimalista estilo HTML 1995:
- Sem CSS
- Fundo branco padrão
- Fonte Times New Roman
- Botões cinzas padrão do navegador

## 📡 Endpoints consumidos

- `POST /api/biblioteca/retirar` - Novo empréstimo
- `GET /api/biblioteca/listar` - Listar todos
- `PATCH /api/biblioteca/devolver/{id}` - Devolver livro
- `GET /api/biblioteca/atrasados` - Listar atrasados
