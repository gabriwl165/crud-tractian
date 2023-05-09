# Tractian Back-end Desafio

Esse é o repositório para o desafio back-end para Tractian. 

Alguns tópicos que valem a pena serem apontados:

° Foi adicionado uma integração com a AWS na rota para salvar Asset, enviando um form-data com seu file, que deve ser salvo no S3 

° Sistema de segurança com JWT e roles de acesso a certas features do Sistema

° Foi configurado nesse repositório GitHub Actions para CI/CD em uma EC2 da AWS que está rodando a aplicação

° Nesse mesmo repositório você pode encontrar .service para configuração da aplicação como serviço em servidores Linux, assim como a configuração das variáveis de ambientes que devem ser usadas durante a execução da API

Documentação Postman: [https://documenter.getpostman.com/view/13485869/2s93eYWYHa](https://documenter.getpostman.com/view/13485869/2s93eYWYHa)

Algumas das tecnologias utilizadas foram: 
<br> ° Express
<br> ° Node
<br> ° AWS
<br> ° JWT
<br> ° Systemd
<br> ° BCrypt
<br> ° Mongoose/MongoDB 
<br> ° TypeScript
<br> Irei descrever brevente sobre alguns end-points que você pode encontrar no projeto

## Login

#### Login ao sistema

```http
  POST /login/
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `login` | `string` | **Obrigatório**. Login para acessar ao sistema |
| `password` | `string` | **Obrigatório**. senha para acessar ao sistema |


| Resposta   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `message` | `string` | Messagem com a resposta sobre sua requisição |
| `success` | `string` | Retorna se a requisição foi bem-sucedida |
| `object` | `string` | Seu token JWT |

## User
Para os end-points referentes as rotas do user não é necessário passar seu token de acesso retornado ao login
#### Cria um usuário

```http
  POST /user/
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `login` | `string` | **Obrigatório**. Seu login será usado para se logar ao sistema |
| `password` | `string` | **Obrigatório**. Sua senha que será utilizada para logar ao sistema |
| `company` | `string` | **Obrigatório**. Código da company que ele deve ser atrelado |
| `permission` | `["CREATE", "READ", "WRITE", "DELETE"]` | **Obrigatório**. Seu usuário deve até pelo menos uma permissão ao sistema |

#### Retorna todos usuários

```http
  GET /user/
```

| Descrição                                   |
| :------------------------------------------ |
| Retorna todos usuários |

#### Retorna usuários pelo id

```http
  GET /user/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do usuário que você quer |

#### Atualiza um usuário

```http
  PATCH /user/${id}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID usuário para ser atualizado |

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `password`      | `string` | **Obrigatório**. A nova senha para seu usuário |
| `company`      | `string` | **Obrigatório**. A company para seu usuário |
| `permission`      | `["CREATE", "READ", "WRITE", "DELETE"]` | **Obrigatório**. A nova lista de permissões para seu usuário |



## Company

| Headers   | Value       
| :---------- | :--------- 
| `Authorization`      | `Token JWT retornado no object ao logar no sistema` 

#### Cria Company

```http
  POST /company/
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. A nova senha para seu usuário |
| `units`      | `[string]` | Lista de units atreladas a company |
| `users`      | `[string]` | Lista de users atreladas a company |

#### Retorna usuários pelo id

```http
  GET /company/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do company que você quer |

#### Retorna usuários pelo id

```http
  GET /company/
```

| Descrição                                   |
| :------------------------------------------ |
| Retorna todos usuários |

#### Atualiza uma company

```http
  PATCH /company/${id}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID Company para ser atualizado |

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. A nova senha para seu usuário |
| `units`      | `[string]` | Lista de units atreladas a company |
| `users`      | `[string]` | Lista de users atreladas a company |

## Unit

| Headers   | Value       
| :---------- | :--------- 
| `Authorization`      | `Token JWT retornado no object ao logar no sistema` 

#### Cria Unit

```http
  POST /unit/
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. Nome da unit |
| `assets`      | `[string]` | ID para asset atrelado |
| `company`      | `[string]` | **Obrigatório**. ID company atrelado ao asset |

#### Retorna usuários pelo id

```http
  GET /unit/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do unit que você quer |

#### Retorna usuários pelo id

```http
  GET /unit/
```

| Descrição                                   |
| :------------------------------------------ |
| Retorna todas units |


## Asset

| Headers   | Value       
| :---------- | :--------- 
| `Authorization`      | `Token JWT retornado no object ao logar no sistema` 

#### Cria Asset

```http
  POST /asset/
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. Nome do asset |
| `image`      | `string` | **Obrigatório**. link para imagem |
| `description`      | `string` | **Obrigatório**. Descrição asset  |
| `model`      | `string` | **Obrigatório**. Modelo do asset |
| `owner`      | `string` | **Obrigatório**. Owner do asset |
| `status`      | `['Running', 'Alerting', 'Stopped']` | **Obrigatório**. Status asset |
| `healthLevel`      | `string` | **Obrigatório**. Health level do asset |
| `units`      | `string` | **Obrigatório**. Unit atrelado ao asset |


#### Retorna asset pelo id

```http
  GET /asset/${id}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do asset que você quer |

#### Retorna todos assets

```http
  GET /asset/
```


#### Atualiza um asset

```http
  PATCH /asset/${id}
```
| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. ID asset para ser atualizado |

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. Nome do asset |
| `image`      | `string` | **Obrigatório**. link para imagem |
| `description`      | `string` | **Obrigatório**. Descrição asset  |
| `model`      | `string` | **Obrigatório**. Modelo do asset |
| `owner`      | `string` | **Obrigatório**. Owner do asset |
| `status`      | `['Running', 'Alerting', 'Stopped']` | **Obrigatório**. Status asset |
| `healthLevel`      | `string` | Lista de users atreladas a company |
| `units`      | `string` | Lista de users atreladas a company |

## AWS

| Headers   | Value       
| :---------- | :--------- 
| `Authorization`      | `Token JWT retornado no object ao logar no sistema` 

#### Cria Asset

```http
  POST /asset/aws | form-data
```


| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `name`      | `string` | **Obrigatório**. Nome do asset |
| `image`      | `string` | **Obrigatório. File imagem a ser enviada a S3**. |
| `description`      | `string` | **Obrigatório**. Descrição asset  |
| `model`      | `string` | **Obrigatório**. Modelo do asset |
| `owner`      | `string` | **Obrigatório**. Owner do asset |
| `status`      | `['Running', 'Alerting', 'Stopped']` | **Obrigatório**. Status asset |
| `healthLevel`      | `string` | **Obrigatório**. Health level do asset |
| `units`      | `string` | **Obrigatório**. Unit atrelado ao asset |
