Você é um desenvolvedor especialista em Hugo (SSG), HTML5, CSS3/Tailwind e JavaScript puro.

Estou desenvolvendo um blog estático em Hugo utilizando o tema "re-terminal" (estilo retrô/terminal). O projeto está hospedado na Vercel. Preciso de duas implementações principais mantendo o visual e a identidade estética de terminal/hacker (fontes monospace, tons verdes/pretos, bordas simples):

---

### OBJETIVO 1: Sistema de Busca Instantânea Local (Fuse.js + JSON)
Preciso de uma busca rápida no frontend sem dependência de APIs externas ou backend.

1. Configurar a saída JSON no Hugo:
   - Ajustar o arquivo de configuração (`hugo.yaml`) para habilitar o formato `JSON` na página inicial (`home`).
   - Criar o template `layouts/_default/index.json` que vai gerar o índice com os campos: `title`, `date`, `permalink`, `tags`, `categories` e `content` (texto limpo/plain).

2. Implementar a Interface de Busca no Tema:
   - Criar um componente/partial HTML em `layouts/partials/search.html` simulando um comando de terminal (ex: `[user@blog ~]$ search _`).
   - Adicionar o script do Fuse.js (pode ser via CDN ou JS embutido) e o script customizado de busca.
   - Os resultados devem aparecer dinamicamente abaixo do campo de busca conforme o usuário digita, formatados com links para os posts e destaque para o título e tags.

---

### OBJETIVO 2: Organização por Seções e Menu Estendido
1. Estruturação do `hugo.yaml`:
   - Configurar a lista `mainMenu` em `params` para incluir links com sintaxe de caminho do terminal:
     - `~/contos` -> `/contos`
     - `~/ideias` -> `/ideias`
     - `~/tags` -> `/tags`
     - `~/sobre` -> `/sobre`

2. Páginas de Listagem de Seção:
   - Garantir que criar pastas em `content/contos/` e `content/ideias/` filtre automaticamente os posts daquela seção específica sem quebrar o layout do tema `re-terminal`.

---

### DIRETRIZES TÉCNICAS:
- Mantenha a compatibilidade com o Hugo Extended v0.167+.
- Não altere arquivos diretamente dentro da pasta `themes/re-terminal/`. Toda alteração/sobrescrita de layout deve ser feita criando os arquivos correspondentes na raiz do projeto (ex: na pasta `layouts/` local).
- Garanta que todo o código JavaScript seja leve, sem dependências além do Fuse.js, e que o CSS siga o mesmo padrão de cores e fontes do tema `re-terminal`.

Por favor, forneça os arquivos necessários, seus caminhos exatos na estrutura de diretórios do Hugo e o código completo pronto para copiar e colar.