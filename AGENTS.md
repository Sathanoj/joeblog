Com a parte estática do Hugo funcionando, a camada de "backend" para permitir login e edição direto pelo navegador é implementada através de um CMS Baseado em Git (Git-based CMS), como o Decap CMS.

Não existe um servidor de banco de dados rodando continuamente. Em vez disso, a autenticação e a gravação de dados ocorrem através da API do próprio GitHub, usando um serviço de OAuth Gateway.
Como Funciona o Fluxo do Backend Estático

[Autora no Celular/PC] 
         │ 1. Acessa /admin e clica em "Login com GitHub"
         ▼
[Serviço OAuth Gateway] ──► Autentica o usuário com o GitHub
         │
         ▼
[Painel Decap CMS no Navegador] 
         │ 2. Escreve conto, anexa imagens e clica em "Publicar"
         ▼
[GitHub API] ──► Cria um Commit diretamente no repositório
         │
         ▼
[Vercel / Cloudflare Pages] ──► Detecta o Commit e faz a Build automática

Passo 1: Criar os Arquivos do Frontend do CMS no Hugo

Dentro do seu projeto Hugo, crie a pasta static/admin/ com dois arquivos:
1. static/admin/index.html

Este arquivo carrega a interface gráfica do painel de controle.
HTML

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Painel de Controle - Blog</title>
  </head>
  <body>
    <!-- Script principal do Decap CMS -->
    <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
  </body>
</html>

2. static/admin/config.yml

Este arquivo instrui o CMS sobre onde salvar os posts e quais campos exibir para a autora.
YAML

backend:
  name: github
  repo: seu-usuario/seu-repositorio-blog # Substitua pelo seu usuário e nome do repo no GitHub
  branch: main # ou master
  base_url: https://site-authenticator.vercel.app # URL do gateway OAuth (configurado no Passo 2)

# Onde salvar as imagens enviadas pelo painel
media_folder: "static/images"
public_folder: "/images"

# Estrutura dos formulários
collections:
  - name: "posts"
    label: "Contos e Postagens"
    folder: "content/posts"
    create: true
    slug: "{{slug}}"
    fields:
      - { label: "Título", name: "title", widget: "string" }
      - { label: "Data", name: "date", widget: "datetime" }
      - { label: "Rascunho", name: "draft", widget: "boolean", default: false }
      - { label: "Conteúdo em Markdown", name: "body", widget: "markdown" }

Passo 2: Configurar o Servidor de Autenticação OAuth

Como o GitHub exige uma chave secreta para realizar o login via OAuth e um site estático não pode guardar chaves secretas com segurança, utiliza-se um pequeno intermediário de autenticação.

Existem duas formas simples de implementar isso sem pagar nada:
Opção A: Usar o Decap Bridge / Squeezer (Mais Rápido)

    Crie uma conta no Decap Bridge ou use o serviço gratuito Decap CMS OAuth Provider.

    Ele fornece uma URL pronta para colocar em base_url no seu config.yml.

Opção B: Criar um OAuth Gateway próprio na Vercel (Total Controle)

Se quiser manter o controle total da infraestrutura:

    Faça um fork do repositório open-source decap-cms-oauth-provider.

    Faça o deploy desse projeto de 1 clique na Vercel.

    Crie um OAuth App no GitHub (Settings > Developer Settings > OAuth Apps):

        Homepage URL: URL do seu blog.

        Authorization callback URL: [https://seu-oauth-gateway.vercel.app/callback](https://seu-oauth-gateway.vercel.app/callback).

    Insira o CLIENT_ID e CLIENT_SECRET gerados pelo GitHub nas variáveis de ambiente do seu gateway na Vercel.

Passo 3: Experiência Final do Usuário Admin

    A autora acessa [seudominio.com/admin](https://seudominio.com/admin) de qualquer celular ou computador.

    Clica no botão "Login with GitHub".

    O painel visual abre com a lista de todos os contos existentes.

    Ela pode editar posts antigos, criar novos, adicionar tags, anexar imagens e formatar texto em tempo real.

    Ao clicar em "Publish", o Decap CMS envia a alteração direto para o seu repositório do GitHub e o servidor de hospedagem (Vercel ou Cloudflare) publica a nova versão do site em questão de segundos.