A princípio, temos que entender que:
- Node é uma plataforma orientada a eventos.
- Uma transação passa por vários callbacks.
- O JS não trabalha de forma assíncrona, então, devemos definir: quando um processo terminar, faça isso (callback)
- Isso é bom pois aumenta a eficiência de operações

O event loop é um conceito central no Node.js e desempenha um papel crucial na sua arquitetura assíncrona e orientada a eventos. Vamos detalhar o que é o event loop, como ele funciona e por que é importante para o Node.js.

### O que é o Event Loop?

O event loop é um mecanismo que permite ao Node.js realizar operações não bloqueantes (como E/S de arquivos, operações de rede, etc.) — mesmo que o JavaScript seja monothread —, gerenciando essas operações de forma eficiente e permitindo que múltiplas operações sejam realizadas em paralelo.

### Como o Event Loop Funciona?

O funcionamento do event loop pode ser compreendido através de várias fases, cada uma das quais lida com diferentes tipos de eventos. Aqui está uma visão geral das principais fases:

1. **Timers**:
   - Executa callbacks programados por `setTimeout` e `setInterval`.
   
2. **Pending Callbacks**:
   - Executa callbacks de operações I/O que foram adiadas para a próxima iteração do loop.

3. **Idle, Prepare**:
   - Fases internas usadas em operações internas do Node.js.

4. **Poll**:
   - Busca novos eventos I/O, executa callbacks de I/O (quase todas as operações de I/O, exceto aquelas com timers agendados), e vai esperar por novas operações de I/O se necessário.

5. **Check**:
   - Executa callbacks agendados por `setImmediate`.

6. **Close Callbacks**:
   - Executa callbacks de eventos de fechamento, como `socket.on('close', ...)`.

### Detalhamento de Algumas Fases

1. **Timers**:
   - Quando você usa `setTimeout` ou `setInterval`, o Node.js coloca o callback correspondente em uma fila para ser executado após o tempo especificado. Quando o event loop entra na fase de Timers, ele verifica essa fila e executa os callbacks cujos tempos de espera expiraram.

2. **Poll**:
   - Esta é a fase onde a maior parte do trabalho acontece. O poll é responsável por buscar novos eventos I/O e executa seus callbacks imediatamente. Se não houver callbacks para processar, ele pode entrar em modo de espera e aguardar por novos eventos.

3. **Check**:
   - Callbacks agendados por `setImmediate` são executados nessa fase. `setImmediate` é utilizado para executar um callback imediatamente após o poll phase.

### Exemplo Prático

Aqui está um exemplo simples para ilustrar o comportamento do event loop:

```javascript
const fs = require('fs');

console.log('Início');

// Timer com setTimeout
setTimeout(() => {
  console.log('setTimeout');
}, 0);

// Immediate com setImmediate
setImmediate(() => {
  console.log('setImmediate');
});

// Operação de I/O assíncrona
fs.readFile(__filename, () => {
  console.log('readFile');
});

console.log('Fim');
```

A ordem esperada de saída é:

```
Início
Fim
setImmediate
readFile
setTimeout
```

### Importância do Event Loop

1. **Desempenho**:
   - O event loop permite que o Node.js seja altamente eficiente e escalável para operações I/O, o que é ideal para aplicações web que necessitam lidar com múltiplas conexões simultâneas.

2. **Não-bloqueante**:
   - Graças ao event loop, operações I/O são realizadas de forma não-bloqueante, permitindo que o servidor continue processando outras requisições enquanto espera por operações de I/O serem concluídas.

3. **Simplicidade de Código**:
   - A arquitetura assíncrona de Node.js simplifica o código em comparação com a necessidade de múltiplas threads em outras linguagens de programação, reduzindo a complexidade e o risco de condições de corrida e deadlocks.

# Ilustrando

O Event Loop, de forma resumida, possui uma pilha de execução principal, e uma fila de execução "paralela".

Suponhamos que temos o código:
```js
console.log('a')
setTimeout(() => console.log('b'), 1000)
console.log('c')
```

- A função `console.log(a)` é executada **imediatamente**
- A função `setTimeout` é registrada para ser executada após 1 segundo (1000 milissegundos). No entanto, o callback associado (`console.log(b)`) **não é executado imediatamente**. Ele é colocado na fila do Event Loop.
- A função `console.log(c)` é executada imediatamente após a linha que registra o `setTimeout`, imprimindo o valor de `c` no console.

Após isso, o Event Loop continua sua execução e, quando 1 segundo se passa, ele verifica a fila e executa o callback associado, que imprime o valor de `b`.

A ordem de saída então será de A, C, B

O callback do setTimeout só será executado quando a pilha estiver vazia.
O setTimeout, quando usa o parâmetro 1000, diz que **atrasará em um segundo a execução**, não que irá executar em um segundo.
Ou seja, pode acontecer de ter uma tarefa na pilha que demore 3 segundos, e só depois será executado seu callback. No total, será mais que um segundo.

### Explicação Completa

1. **Execução Inicial**:
    - O código começa executando `console.log(a)`, imprimindo `a`
    - Em seguida, `setTimeout` é chamado, registrando `console.log(b)` para ser executado após 1 segundo e continuando **sem bloquear** a execução
    - Logo depois, `console.log(c)` é executado, imprimindo `c`
2. **Fila de Timers**:
    - Quando o `setTimeout` é chamado, ele registra `console.log(b)` na fila de timers para ser executado após o tempo especificado
3. **Event Loop**:
    - O Event Loop verifica a pilha de execução, que agora está vazia
    - Depois de 1 segundo, o Event Loop move `console.log(b)` da fila de timers para a pilha de execução
    - `console.log(b)` é então executado, imprimindo `b`