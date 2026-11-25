# Atomi — Plataforma de estudos (projeto demonstrativo)

Projeto estático feito com **HTML, CSS e JavaScript puro**, preparado para hospedagem no **GitHub Pages**.

## O que está incluído

- Painel inicial com resumo de estudos, meta diária e atividade semanal.
- Área de cursos com oito matérias e aulas demonstrativas.
- Modal de aula com conteúdo de exemplo e opção para marcar a aula como concluída.
- Banco de questões com filtros por matéria, alternativas, correção e explicação.
- Página de desempenho com estatísticas calculadas a partir das respostas.
- Flashcards com ação de virar e marcar conceitos como aprendidos.
- Cronograma com criação, conclusão e remoção de tarefas.
- Tema claro/escuro e layout adaptado para celular.
- Progresso salvo no `localStorage` do navegador.

## Como abrir no computador

1. Extraia a pasta do projeto.
2. Abra `index.html` no navegador.
3. Não é necessário instalar dependências ou executar um servidor.

Para editar, abra a pasta no Visual Studio Code. Os arquivos principais são:

- `index.html`: estrutura da página.
- `styles.css`: identidade visual e responsividade.
- `app.js`: dados de exemplo e funcionalidades.
- `assets/`: imagens da identidade visual Atomi fornecidas no projeto.

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub, por exemplo `atomi-plataforma`.
2. Envie todos os arquivos e pastas deste projeto para a raiz do repositório. O `index.html` precisa ficar na raiz.
3. No repositório, acesse **Settings → Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/ (root)`, depois clique em **Save**.
6. Aguarde a publicação e abra o endereço que o GitHub Pages mostrar nessa tela.

## Observações importantes

Esta é uma demonstração front-end. Não existe cadastro/login real, banco de dados, painel administrativo ou vídeos hospedados. Questões e aulas são exemplos editáveis no `app.js`. O progresso é salvo somente no navegador e dispositivo em que o site for utilizado; limpar os dados do navegador pode apagar esse progresso.

As fontes do Google Fonts são opcionais. Caso o visitante esteja sem internet, o site usa fontes alternativas instaladas no sistema.
