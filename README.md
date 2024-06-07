# Imobiliária

Este é um projeto Angular para um sistema de CRUD de imóveis disponíveis para aluguel e venda. A aplicação permite listar, adicionar, editar e excluir imóveis, e também preencher automaticamente os campos de endereço com base no CEP utilizando a API ViaCep.

## Funcionalidades

- Listagem de imóveis
- Adição de novos imóveis
- Edição de imóveis existentes
- Exclusão de imóveis
- Preenchimento automático de endereço baseado no CEP

## Tecnologias Utilizadas

- Angular
- Bootstrap
- API ViaCep
- RxJS

## Pré-requisitos

- Node.js
- Angular CLI

## Instalação

1. Clone o repositório:
   
```bash
git clone https://github.com/seu-usuario/real-estate-crud.git
```
2. Navegue até o diretório do projeto:
   
```bash
cd desafio-imobiliaria
```
3. Instale as dependências:

```bash
npm install
```
```bash
ng add @angular/material
? Choose a prebuilt theme name, or "custom" for a custom theme: Purple/Green [ Preview: https://material.angular.io?theme=purple-green ]
? Set up global Angular Material typography styles? Yes
ng add @ng-bootstrap/ng-bootstrap
```

4. Navegue até o diretório da API-Fake:
```bash
cd api-fake
```

5. Instale as dependências:
```bash
npm install
```

6. Navegue até o diretório da API-Usuários:
```bash
cd api-usuario
```
7. Instale as dependências:
```bash
npm install
```

## Executando a Aplicação
Inicie o servidor da api-fake (lembre-se de estar no diretório api-fake):
```bash
npm start
```
Inicie o servidor da api-usuarios (lembre-se de estar no diretório api-usuarios):
```bash
npm start
```

Inicie o servidor de desenvolvimento (lembre-se de estar no diretório desafio-imobiliaria):

```bash
ng serve
```
Abra o navegador e vá para http://localhost:4200.
