[English]

# First Contrib Search


TLDR; Try it [here](https://first-contrib.surge.sh) !

![First Contrib App](./github.png)

## Why this project? 

As a coder who wants to make his/her first contribution to an open source project, it can sometimes be tough to find the right project that matches both your expectations and skills. 

Thanks to some projects just like [awesome list](https://github.com/MunGell/awesome-for-beginners), you still can find *static* lists of project that are looking for developers.

Going further, if you want to search for issues that can be handled by beginners with the [Github Search Engine](https://github.com/search/advanced), you still need to know what label is used by each repository to target beginners.


## The Answer

This app tries to answer this problem by providing you with a simple search engine which will target all the issues with labels being more or less related with *beginners*. For now, more or less 50 different labels are listed in this [file](https://github.com/GaelS/first-contrib-app/blob/master/src/labels.js). 

And because doing a search engine can be cooler than it is, I tried to follow my 80's inner vibes to provide a *Miami Vice*/*GTA Vice City* style :)

## What problems have I found along the way?

 - I wanted to use the GraphQL API provided by Github because it drastically reduces the network calls number. However, it is not callable without being authenticated. Therefore, as a user, you must be authenticated to Github to use this app.
 
 - Major drawback: when searching issues by label in Github, we cannot use "OR" operator. Basically, we cannot search for issue having labels *GOOD FIRST CONTRIBUTION* **OR** *UP FOR GRABS* in one query. Therefore, the trick to get the issues that could be of interest is to query **repositories** that have **issues** matching our labels' list. The unfortunate consequence is that the list of issues listed in a repository can sometimes be empty... which leads sometimes to get a list of 20 repositories with no issues at all to display... That is the reason why the *fetch more* button might need to be smashed several times before finding new issues to display... 
 A naive idea of mine was to query again a new list of repositories when zero issues are returned but launching network requests recursively does not seem like a good idea...ahem... 

## The stack

The main libs of this project are : 

- React (but preact-compat is used to get a smaller bundle);
- React Apollo;
- React Router;
- A bit of lodash.

## ROADMAP

It's a first draft so lot of things still need to be done:

 - Polish the style;
 - Improve sorting possibility (so far, it's hardcoded by descending stars numbers);
 - Functional tests (because we always need tests :))
 - As said before, a trick to get an elegant way to query only meaningful repositories that have issues. 

Feel free to open PR or submit issues :) 

## LICENCE

MIT

# 

[Portuguese]
 
# Pesquisa de primeira contribuição


TLDR; Experimente aqui [here](https://first-contrib.surge.sh) !

![First Contrib App](./github.png)

## Por que esse projeto?

Como programador que deseja dar sua primeira contribuição a um projeto de código aberto, às vezes pode ser difícil encontrar o projeto certo que corresponda às suas expectativas e habilidades.

Graças a alguns projetos como a [awesome list](https://github.com/MunGell/awesome-for-beginners), você ainda pode encontrar listas * estáticas * de projetos que procuram desenvolvedores.

Indo além, se você deseja pesquisar problemas que podem ser tratados por iniciantes com o [Github Search Engine](https://github.com/search/advanced), você ainda precisa saber qual tag é utilizada por cada repositório para iniciantes.


## A resposta

Este aplicativo tenta solucionar esse problema, fornecendo a você um mecanismo de pesquisa simples, que abordará todos os problemas com tags mais ou menos relacionados a * iniciantes *. Por enquanto, mais ou menos 50 tags diferentes estão listadas neste [file](https://github.com/GaelS/first-contrib-app/blob/master/src/labels.js).

E como fazer um mecanismo de busca pode ser mais legal do que é, tentei seguir minhas vibrações internas dos anos 80 para fornecer um estilo * Miami Vice * / * GTA Vice City * :)

## Que problemas encontrei ao longo do caminho?

 - Eu queria usar a API GraphQL fornecida pelo Github porque reduz drasticamente o número de chamadas de rede. No entanto, não é possível chamar sem ser autenticado. Portanto, como usuário, você deve estar autenticado no Github para usar este aplicativo.
 
 - Maior desvantagem: ao pesquisar problemas por tag no Github, não podemos usar o operador "OU". Basicamente, não podemos procurar um problema com tags *GOOD FIRST CONTRIBUTION* ** OU ** * UP FOR GRABS * em uma consulta. Portanto, o truque para obter os problemas que podem ser interessantes é consultar ** repositórios ** que tenham ** issues ** que correspondam à lista de nossos marcadores. A conseqüência infeliz é que a lista de problemas listados em um repositório às vezes pode estar vazia ... o que leva às vezes a obter uma lista de 20 repositórios sem nenhuma issue para exibir ... Essa é a razão pela qual *fetch more* Talvez seja necessário acionar o botão várias vezes antes de encontrar novas issues para exibir ...
 Uma idéia ingênua minha era consultar novamente uma nova lista de repositórios quando nenhuma issue fosse retornado, mas iniciar solicitações de rede recursivamente não parece uma boa idéia ... ahem ...

## A stack

As principais bibliotecas deste projeto são:

- React (mas o preact-compat é usado para obter um pacote menor);
- React Apollo;
- React Router;
- Um pouco de lodash.

## ROTEIRO

É um primeiro rascunho, então muitas coisas ainda precisam ser feitas:

 - Polir o estilo;
 - Melhorar a possibilidade de classificação (até agora, é codificado por números de estrelas descendentes);
 - Testes funcionais (porque sempre precisamos de testes :))
 - Como dito anteriormente, um truque para obter uma maneira elegante de consultar apenas repositórios significativos com problemas.

Sinta-se livre para abrir Pull Requests ou enviar issues :)

## LICENÇA

MIT