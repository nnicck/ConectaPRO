# ConectaPRO

Site de contratação de profissionais autônomos.
**Back-end:** Node.js + Express + MySQL · **Front-end:** Next.js (App Router, JSX) + Bootstrap 5

---

## Como rodar

### 1. Banco de dados (Docker, porta 3309)

O MySQL do Docker fica em `localhost:3309` (mapeamento `3309:3306`).

### 2. Back-end

```bash
cd backEnd
cp .env.example .env        # no Windows: copy .env.example .env
# abra o .env e confira DB_USER / DB_PASS / DB_NAME do seu container
npm install
npm run migrar              # APAGA e recria as tabelas + dados de exemplo
npm run dev                 # http://localhost:3001  (reinicia sozinho ao salvar)
```

> `npm run migrar` cria o banco se ele não existir, apaga as tabelas (inclusive a antiga
> `avaliacoes`, se ainda existir), roda os arquivos da pasta `migrations/` em ordem e mostra
> quantos registros ficaram em cada tabela. Rode de novo sempre que quiser voltar aos dados iniciais.

Exemplo de `.env`:

```env
PORT=3001
DB_HOST=127.0.0.1
DB_PORT=3309
DB_USER=root
DB_PASS=sua_senha
DB_NAME=conecta_pro
SESSION_SECRET=qualquer-texto
```

### 3. Front-end

```bash
cd frontEnd
npm install
npm run dev                 # http://localhost:3000
```

Se o back-end estiver em outro endereço, crie `frontEnd/.env.local` com `NEXT_PUBLIC_API_URL=http://...`.

### Se aparecer "Falha interna do servidor" ou "Banco de dados indisponível"

Olhe o terminal do back-end: ao ligar, ele diz exatamente o que está errado.

| Mensagem no terminal | O que fazer |
|---|---|
| `Não foi possível conectar ao MySQL` | Ligue o container do MySQL e confira `DB_PORT`, `DB_USER`, `DB_PASS`, `DB_NAME` no `.env` |
| `O banco de dados está desatualizado ou vazio` | Rode `npm run migrar` (as tabelas mudaram desde a versão anterior) |
| `SESSION_SECRET não está no .env` | Coloque `SESSION_SECRET=qualquer-texto` no `.env` (funciona mesmo sem, com um valor padrão) |

### Logins de teste

| Tipo | E-mail | Senha |
|---|---|---|
| Cliente | rafael.bandeira@example.com | senha_teste_01 |
| Profissional | paula.alice@example.com | senha_teste_01 |
| Profissional | bruno.l@example.com | senha_teste_02 |

---

## Páginas

### Site (público)
| Rota | O que tem |
|---|---|
| `/` | Home com busca, categorias e profissionais em destaque |
| `/buscarServicos` | Busca com filtros (categoria, localização, faixa de preço) |
| `/perfilProfissional/[id]` | Perfil com abas **Visão geral, Serviços, Sobre** |
| `/servico/[id]` | Detalhes do serviço + **Solicitar orçamento** |
| `/login` | Entrar como cliente ou profissional |
| `/criarContaCliente`, `/criarContaProfissional` | Cadastro (com foto; endereço digitado à mão) |

### Área do cliente
| Rota | O que tem |
|---|---|
| `/inicioCliente` | Minha conta: dados, total de serviços contratados e pedidos (com filtros) |
| `/inicioCliente/editarPerfil` | Editar dados, foto, endereço, senha · excluir conta. Ao salvar, volta para Minha conta |
| `/acompanharServico/[id]` | Etapas do pedido e botão de cancelar |

### Painel do profissional (área admin)
| Rota | O que tem |
|---|---|
| `/inicioProfissional` | Resumo: novas solicitações, em andamento, concluídos, saldo |
| `/inicioProfissional/meusServicos` | **CRUD de serviços** + fotos de cada serviço |
| `/inicioProfissional/solicitacoesProfissional` | Aceitar / recusar / iniciar / concluir pedidos |
| `/inicioProfissional/agenda` | Agenda e financeiro (saldo, recebido no mês, a receber) |
| `/inicioProfissional/editarPerfil` | Editar perfil profissional · excluir conta. Ao salvar, volta para o Início |

A barra de busca no topo do painel filtra a lista da página aberta.

---

## Ciclo de um pedido (contrato)

```
pendente ──aceitar──▶ aceito ──iniciar──▶ em andamento ──concluir──▶ concluído
   │                                                    (soma o valor no saldo)
   └──recusar──▶ recusado          cliente pode cancelar enquanto não estiver concluído
```

---

## Banco de dados

5 tabelas (arquivo `backEnd/migrations/20261016_0823_criar_tabelas.sql`):

| Tabela | Guarda |
|---|---|
| `clientes` | quem contrata |
| `profissionais` | quem presta serviço (com saldo) |
| `servicos` | serviços de cada profissional |
| `midias` | fotos de cada serviço |
| `contratos` | pedidos (cliente + profissional + serviço + status) |

Apagar um serviço apaga as fotos e os pedidos dele (`ON DELETE CASCADE`). Apagar uma conta apaga tudo dela.

---

## Como o código está organizado

### Back-end
```
app.js            -> monta o servidor (middlewares, camadas e rotas)
routes/           -> qual URL chama qual função do controller
controllers/      -> lê a requisição e devolve a resposta
services/         -> regras de negócio (quem pode fazer o quê)
models/           -> SQL (XxxModel.js) e validação dos campos (Xxx.js)
utils/            -> responderErro (status HTTP certo), controllerCrud, auxiliares
migrations/       -> criação das tabelas e dados de exemplo
```

### Front-end
```
src/
  lib/api.js          -> api("/rota", { metodo, dados })  — ÚNICA função para chamar o back-end
  lib/sessao.jsx      -> useSessao()  /  useSessao("cliente")  — quem está logado + proteção de página
  lib/painel.jsx      -> dados compartilhados do painel do profissional
  lib/formatar.js     -> preço, data, telefone, endereço, status
  components/ui/      -> peças reutilizáveis (Avatar, Modal, Confirmar, CampoImagem, StatusBadge...)
  components/FormPerfil -> formulário "Editar Perfil" usado pelo cliente e pelo profissional
  components/LoadingTruck.jsx -> caminhão de "carregando" (tamanho na variável --tamanho do CSS)
  app/                -> uma pasta por rota
```

Exemplo de CRUD com o helper (é assim em `meusServicos/page.jsx`):

```js
const servicos = await api(`/servico/profissional/${id}`);                    // READ
await api("/servico", { metodo: "POST", dados: novoServico });                 // CREATE
await api(`/servico/${id}`, { metodo: "PUT", dados: { preco: 120 } });         // UPDATE (só o que mudou)
await api(`/servico/${id}`, { metodo: "DELETE" });                             // DELETE
```

Pop-up de confirmação (no lugar do `window.confirm`):

```js
const [confirmar, janelaConfirmar] = useConfirmar();
const ok = await confirmar({ titulo: "Excluir", mensagem: "Tem certeza?", botao: "Excluir" });
// ... e coloque {janelaConfirmar} no JSX da página
```

---

## Rotas da API

CRUD padrão em todas as tabelas: `GET/POST /api/x`, `GET/PUT/DELETE /api/x/:id`
(x = `cliente`, `profissional`, `servico`, `midia`, `contrato`).

| Método | Rota | Quem | Para quê |
|---|---|---|---|
| POST | `/api/autenticar/login` | público | Entrar `{ email, senha, tipo }` |
| GET | `/api/autenticar/me` | público | Quem está logado (ou `dados: null`) |
| GET | `/api/servico/busca` | público | Busca `?termo=&categoria=&localizacao=&faixa=` |
| GET | `/api/servico/categorias` | público | Categorias com algum serviço |
| GET | `/api/servico/profissional/:id` | público | Serviços de um profissional (com foto) |
| GET | `/api/servico/:id/detalhes` | público | Serviço + profissional + fotos |
| GET | `/api/midia/servico/:id` | público | Fotos de um serviço |
| GET | `/api/contrato/meus` | logado | Pedidos do usuário com serviço, cliente e profissional |
| POST | `/api/contrato/solicitar` | cliente | Pedir um serviço `{ id_servico, data_contrato, local, observacao }` |
| PATCH | `/api/contrato/:id/status` | profissional | `{ acao: "aceitar" \| "recusar" \| "iniciar" \| "concluir" }` |
| PATCH | `/api/contrato/:id/cancelar` | cliente | Cancelar |
| GET | `/api/contrato/:id/acompanhamento` | cliente ou profissional do pedido | Detalhes do pedido |
| POST | `/api/upload` | público | Envia imagem `{ arquivo: "data:image/png;base64,..." }` e devolve a URL |
| PUT | `/api/autenticar/me` | logado | Atualiza nome/foto guardados na sessão |

---

## Histórico de correções

### Primeira revisão
- `app.js` importava `./routes/AutenticarRoutes.js` (maiúscula): funcionava no Windows e quebrava no Linux/Docker.
- Senhas eram devolvidas pela API; agora nunca saem.
- Erros 404 viravam 500; agora `utils/responderErro.js` devolve o status certo (inclui e-mail repetido → 409).
- Editar perfil exigia todos os campos (inclusive senha); agora só os enviados mudam.
- Cadastro de profissional falhava (`data_ingresso` vazia); agora é preenchida com a data de hoje.
- Datas "voltavam um dia" por causa do fuso (`dateStrings: true` no pool).
- Rotas de ação conferem se o pedido **pertence** a quem está logado.
- Front-end: imports e links quebrados, campos com nome errado, ícones sem o pacote instalado, busca da home sem função.

### Segunda revisão
- Sem `SESSION_SECRET` no `.env`, **todas** as rotas davam "Falha interna do servidor". Agora usa um valor padrão e avisa.
- Requisição sem corpo (`PUT` vazio) quebrava no Express 5; agora vira `{}`.
- Texto longo demais e datas inválidas viram erro 400 com mensagem clara (antes 500).
- Banco desligado ou desatualizado mostra o que fazer, no terminal e na tela.
- Profissional não consegue editar/excluir serviço de outro profissional.
- Layout com fontes menores e cabeçalhos com capa nos perfis.

### Terceira revisão
- Pop-up de confirmação próprio no lugar do `window.confirm` (recusar, cancelar, excluir serviço/foto/conta).
- Editar perfil volta para o perfil ao salvar e mostra "Alterações salvas com sucesso!".
- Carrossel da home com cards da mesma altura.
- Login ocupa a altura entre o topo e o rodapé.

### Quarta revisão
- **Avaliações removidas** do sistema inteiro: tabela, rotas, notas, estrelas e formulário de avaliar.
- **Sininho de notificações** removido do painel.
- **Endereço só digitado à mão**: saiu o preenchimento pelo CEP (ViaCEP) e o endereço que já vinha preenchido ao solicitar um serviço.
- **LoadingTruck**: dobro do tamanho (variável `--tamanho` no CSS), centralizado, com `"use client"`
  e com o registro do styled-components (`lib/registroStyledComponents.jsx` + `compiler.styledComponents` no
  `next.config.mjs`), para o desenho não aparecer sem estilo por um instante.
- Agenda: "Recebido neste mês" usava o horário UTC e virava o mês às 21h do último dia.
- Mensagem de cancelar dizia que o profissional "seria avisado", mas o site não envia avisos.
- Removidos arquivos sem uso (`utils/formatarMoeda.js`, `public/vercel.svg`, `app/page.module.css`).
- Código comentado: cabeçalho em todos os arquivos explicando o que cada um faz.

### Campos que não existem no banco
"Data de nascimento" e "Disponibilidade" não estão no cadastro. Se quiserem esses campos, é preciso criar as colunas na migration primeiro.
