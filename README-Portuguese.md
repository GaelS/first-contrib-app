# Primeira pesquisa de contribuição


TLDR; Experimente [aqui] (https://first-contrib.surge.sh)!

! [Primeiro aplicativo de contribuição] (./ github.png)

## Por que este projeto?

Como um programador que deseja fazer sua primeira contribuição para um projeto de código aberto, às vezes pode ser difícil encontrar o projeto certo que corresponda às suas expectativas e habilidades.

Graças a alguns projetos como [lista incrível] (https://github.com/MunGell/awesome-for-beginners), você ainda pode encontrar listas * estáticas * de projetos que procuram desenvolvedores.

Indo além, se você deseja pesquisar problemas que podem ser tratados por iniciantes com o [Github Search Engine] (https://github.com/search/advanced), você ainda precisa saber qual rótulo é usado por cada repositório para iniciantes alvo.

## A resposta

Este aplicativo tenta responder a este problema fornecendo a você um mecanismo de busca simples que irá direcionar todos os problemas com rótulos sendo mais ou menos relacionados com * iniciantes *. Por enquanto, mais ou menos 50 rótulos diferentes estão listados neste [arquivo] (https://github.com/GaelS/first-contrib-app/blob/master/src/labels.js).

E como fazer um mecanismo de pesquisa pode ser mais legal do que é, tentei seguir minhas vibrações internas dos anos 80 para fornecer um estilo * Miami Vice * / * GTA Vice City * :)

## Que problemas encontrei ao longo do caminho?

 - Eu queria usar a API GraphQL fornecida pelo Github porque ela reduz drasticamente o número de chamadas de rede. No entanto, ele não pode ser chamado sem ser autenticado. Portanto, como usuário, você deve estar autenticado no Github para usar este aplicativo.
 
 - Principal desvantagem: ao pesquisar questões por rótulo no Github, não podemos usar o operador "OU". Basicamente, não podemos pesquisar problemas com rótulos * BOA PRIMEIRA CONTRIBUIÇÃO * ** OU ** * PARA GRABOS * em uma consulta. Portanto, o truque para obter os problemas que podem ser de interesse é consultar ** repositórios ** que têm ** problemas ** que correspondem à nossa lista de rótulos. A infeliz conseqüência é que a lista de problemas listados em um repositório às vezes pode estar vazia ... o que às vezes leva a obter uma lista de 20 repositórios sem nenhum problema para exibir ... Essa é a razão pela qual o * buscar mais * pode ser necessário quebrar o botão várias vezes antes de encontrar novos problemas para exibir ...
 Uma ideia ingênua minha foi consultar novamente uma nova lista de repositórios quando nenhum problema for retornado, mas lançar solicitações de rede recursivamente não parece uma boa ideia ... ahem ...

## A pilha

As principais bibliotecas deste projeto são:

- React (mas preact-compat é usado para obter um pacote menor)
- React Apollo
- Roteador React
- Um pouco de lodash

## ROTEIRO

É um primeiro rascunho, então muitas coisas ainda precisam ser feitas

 - Polir o estilo
 - Melhorar a possibilidade de classificação (até agora, está codificado por números de estrelas decrescentes).
 - Testes funcionais (porque sempre precisamos de testes :))
 - Como disse antes, um truque para obter uma maneira elegante de consultar apenas repositórios significativos que apresentam problemas.

Sinta-se à vontade para abrir o PR ou enviar questões :)

## LICENÇA

MIT.
