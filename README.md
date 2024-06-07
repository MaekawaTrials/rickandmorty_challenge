
# 🚀 Rick and Morty Challenge

![challenge image](https://raw.githubusercontent.com/MaekawaTrials/rickandmorty_challenge/main/src/assets/screen.JPG)

## DEPLOY
O projeto está no ar, [Acesse aqui!](https://rick-and-morty-maekawatrials-projects.vercel.app/)

## Descrição do Projeto

O Rick and Morty Challenge é uma aplicação Angular desenvolvida para consumir a API pública [Rick and Morty API](https://rickandmortyapi.com/). O objetivo é buscar personagens e gerenciar uma lista de favoritos, utilizando boas práticas de desenvolvimento em Angular.

### Overview Técnico

Este projeto foi desenvolvido seguindo princípios de desenvolvimento moderno em Angular, incluindo gerenciamento de estado com NgRx, utilização de RxJS para manipulação de fluxos de dados assíncronos, e princípios de design modular e reutilizável com Atomic Design. A aplicação também foi projetada para ser uma Progressive Web Application (PWA), oferecendo uma experiência de usuário rápida e confiável.

### Dificuldades Enfrentadas

1. **Gerenciamento de Estado com NgRx:**
   - A implementação do NgRx apresentou desafios, especialmente na configuração inicial e no gerenciamento de ações e efeitos para sincronizar o estado com o `localStorage`.
   - A integração do `localStorage` para persistência dos dados exigiu a criação de efeitos personalizados, garantindo que os dados fossem corretamente salvos e recuperados.

2. **Manipulação de Fluxos Assíncronos com RxJS:**
   - Utilizar operadores RxJS para otimizar a busca de personagens e evitar chamadas desnecessárias à API foi um ponto crucial.
   - Garantir que a busca fosse eficiente e que o cache de resultados funcionasse corretamente foi um desafio que exigiu um entendimento profundo de operadores como `scan`, `switchMap` e `shareReplay`.

3. **Testes Unitários e de Integração:**
   - Escrever testes que cobrissem todos os cenários de uso, incluindo buscas bem-sucedidas e falhas, foi um desafio. Garantir que os testes fossem robustos e refletissem o comportamento real da aplicação exigiu várias iterações.
   - Testes para componentes com dependências complexas, como o uso do NgRx Store e HttpClient, foram particularmente desafiadores e exigiram a configuração correta de providers e mocks.

### Considerações Gerais 

1. **Busca de Personagens:**
   - A busca de personagens utiliza operadores RxJS para otimizar o desempenho. O uso de `debounceTime` e `distinctUntilChanged` ajuda a reduzir a quantidade de chamadas à API, melhorando a eficiência geral.

2. **Gerenciamento de Favoritos:**
   - Adicionar e remover personagens dos favoritos envolve operações de pesquisa e atualização no array de favoritos. 

3. **Persistência no LocalStorage:**
   - As operações de leitura e escrita no `localStorage` foram destaques devido à natureza do armazenamento chave-valor, garantindo acesso rápido aos dados persistidos.

## Funcionalidades Implementadas

1. **Busca de Personagens:**
   - Permite buscar personagens pelo nome.
   - Exibe informações como nome, gênero e imagem dos personagens.

2. **Lista de Favoritos:**
   - Adiciona e remove personagens da lista de favoritos.
   - Mostra a contagem de favoritos no cabeçalho.
   - Persiste a lista de favoritos no `localStorage`.

3. **Mensagens de Status:**
   - Exibe uma mensagem quando nenhum personagem é encontrado na busca.
   - Exibe uma mensagem inicial solicitando ao usuário para buscar um personagem.

4. **Armazenamento Local:**
   - Persiste a lista de favoritos no `localStorage` para manter os dados entre sessões.

## Estrutura do Projeto

### Estrutura de Diretórios

```plaintext
src/
├── app/
│   ├── features/
│   │   ├── favorites/
│   │   │   ├── favorites-page/
│   │   │   ├── favorites-page.component.html
│   │   │   ├── favorites-page.component.scss
│   │   │   ├── favorites-page.component.spec.ts
│   │   │   ├── favorites-page.component.ts
│   │   ├── favorites.module.ts
│   │   ├── home/
│   │   │   ├── home-page/
│   │   │   │   ├── home-page.component.html
│   │   │   │   ├── home-page.component.scss
│   │   │   │   ├── home-page.component.spec.ts
│   │   │   │   ├── home-page.component.ts
│   │   │   ├── random-characters/
│   │   │   │   ├── random-characters.component.html
│   │   │   │   ├── random-characters.component.scss
│   │   │   │   ├── random-characters.component.spec.ts
│   │   │   │   ├── random-characters.component.ts
│   │   │   ├── search-box/
│   │   │   │   ├── search-box.component.html
│   │   │   │   ├── search-box.component.scss
│   │   │   │   ├── search-box.component.spec.ts
│   │   │   │   ├── search-box.component.ts
│   │   ├── home.module.ts
│   ├── shared/
│   │   ├── character-card/
│   │   │   ├── character-card.component.html
│   │   │   ├── character-card.component.scss
│   │   │   ├── character-card.component.spec.ts
│   │   │   ├── character-card.component.ts
│   │   ├── loading/
│   │   │   ├── loading.component.html
│   │   │   ├── loading.component.scss
│   │   │   ├── loading.component.spec.ts
│   │   │   ├── loading.component.ts
│   │   ├── menu-bar/
│   │   │   ├── menu-bar.component.html
│   │   │   ├── menu-bar.component.scss
│   │   │   ├── menu-bar.component.spec.ts
│   │   │   ├── menu-bar.component.ts
│   │   ├── shared.module.ts
│   ├── state/
│   │   ├── app.state.ts
│   │   ├── character.model.ts
│   │   ├── favorites.actions.ts
│   │   ├── favorites.effects.ts
│   │   ├── favorites.reducer.ts
│   │   ├── index.ts
│   │   ├── search.actions.ts
│   │   ├── search.effects.ts
│   │   ├── search.reducer.ts
│   │   ├── search.selectors.ts
│   │   ├── state.actions.spec.ts
│   │   ├── state.module.ts
│   │   ├── state.reducer.spec.ts 
│   ├── app-routing.module.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.module.ts
├── assets/
├── styles/
│   ├── rickyandmorty-variables.scss
├── index.html
├── main.ts
├── styles.scss
├── test.ts
angular.json
package-lock.json
README.md
```

### Componentes e Páginas

- **HomePageComponent**: Página inicial que permite buscar personagens e adicionar aos favoritos.
- **FavoritesPageComponent**: Página que exibe a lista de personagens favoritos.
- **SearchBoxComponent**: Componente de entrada de texto para buscar personagens.
- **MenuBarComponent**: Cabeçalho com links para as páginas inicial e de favoritos e a contagem de favoritos.
- **CharacterCardComponent**: Componente que exibe informações do personagem e permite adicionar ou remover dos favoritos.

### Gerenciamento de Estado

- **NgRx Store**: Utilizado para gerenciar o estado global da aplicação, incluindo a lista de favoritos.
- **Effects**: Utilizado para interagir com `localStorage` e persistir os dados.

## Destaques do Projeto

- **Atomic Design**: A aplicação é construída seguindo os princípios do Atomic Design, organizando componentes em átomos, moléculas, organismos, templates e páginas.
- **PWA (Progressive Web Application)**: Implementação de características de PWA para uma experiência de usuário rápida e confiável.
- **RxJS Operators**: Utilização de operadores RxJS para manipulação de fluxos assíncronos de dados.

## Operadores RxJS Utilizados

- **debounceTime(300)**: Atraso de 300ms após o usuário parar de digitar, antes de fazer a chamada à API.
- **distinctUntilChanged**: Evita chamadas repetidas com o mesmo termo de busca.
- **filter**: Filtra termos de busca com menos de 3 caracteres.
- **scan**: Mantém um cache de resultados de busca.
- **switchMap**: Cancela buscas anteriores ao iniciar uma nova busca.
- **map**: Transforma os resultados da busca.
- **catchError**: Lida com erros durante a busca.
- **shareReplay(1)**: Compartilha o resultado da busca entre múltiplos assinantes.

## Testes Baseados em Histórias de Usuário

### 1. Buscar personagem
- **Descrição:** Permite ao usuário buscar personagens pelo nome.
- **Teste:** Verifica se a pesquisa retorna resultados de personagens corretos.
- **Resultado Esperado:** A lista de personagens correspondente ao termo de busca é exibida.

### 2. Exibir informações do personagem
- **Descrição:** Ao pesquisar um personagem, o usuário pode ver nome, gênero e imagem antes de decidir favoritá-lo.
- **Teste:** Verifica se as informações do personagem são exibidas corretamente.
- **Resultado Esperado:** Nome, gênero e imagem do personagem são exibidos.

### 3. Adicionar aos favoritos
- **Descrição:** Ao pesquisar um personagem, o usuário pode salvá-lo para que fique listado nos seus favoritos.
- **Teste:** Verifica se o personagem é adicionado à lista de favoritos.
- **Resultado Esperado:** O personagem é adicionado à lista de favoritos e a contagem de favoritos é atualizada.

### 4. Personagem não encontrado
- **Descrição:** Ao pesquisar um personagem que não existe, o usuário é avisado que ele não existe.
- **Teste:** Verifica se a mensagem de "Nenhum personagem encontrado" é exibida.
- **Resultado Esperado:** A mensagem "Nenhum personagem encontrado" é exibida.

### 5. Exibir lista de favoritos
- **Descrição:** O usuário pode ver a lista de personagens que adicionou aos favoritos.
- **Teste:** Verifica se a lista de personagens favoritos é exibida corretamente.
- **Resultado Esperado:** A lista de personagens favoritos é exibida com todas as informações relevantes.

### 6. Remover dos favoritos
- **Descrição:** O usuário pode remover personagens da lista de favoritos.
- **Teste:** Verifica se o personagem é removido da lista de favoritos.
- **Resultado Esperado:** O personagem é removido da lista de favoritos e a contagem de favoritos é atualizada.

### 7. Persistir favoritos no localStorage
- **Descrição:** A lista de favoritos deve ser salva no `localStorage` para manter os dados entre sessões.
- **Teste:** Verifica se a lista de favoritos é salva e carregada corretamente do `localStorage`.
- **Resultado Esperado:** A lista de favoritos é persistida no `localStorage` e carregada corretamente quando a aplicação é reiniciada.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/rickandmorty_challenge.git
   ```
2. Instale as dependências:
   ```bash
   cd rickandmorty_challenge
   npm install
   ```
3. Execute a aplicação:
   ```bash
   ng serve
   ```

## Testes

Para executar os testes unitários:
```bash
ng test
```

---

Este projeto foi desenvolvido como um desafio para demonstrar habilidades em Angular, RxJS e gerenciamento de estado com NgRx.

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para abrir uma issue ou contribuir diretamente com o projeto.

---
