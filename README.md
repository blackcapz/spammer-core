# NOALVO postador-grupos-facebook

## Objetivo
Projeto de crawler para postar mensagens em grupos de Facebook.

## Setup
### Variáveis de ambiente
* FB_USER: Nome do usuário autor; 
* FB_PASS: Senha do usuário autor;

### Argumentos da função
* groups  :: Array<string>: IDs dos grupos de Facebook;
* message :: string: Mensagem a ser postada nos grupos;

## Ambientes de execução
* Microsoft Azure Functions: ✓
* Local: ⚠ precisa dos seguintes passos:
  1. adicionar os environment variables `process.env.user = 'usuario@email.com'` e `process.env.pass = 'senha'`;
  1. fazer a chamada a função `main({ ...console, body: { groups: ['id1', 'id2'], message: 'bla' } })`;