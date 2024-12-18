Os princípios SOLID são um conjunto de diretrizes usadas no desenvolvimento orientado à objetos que ajudam a criar sistemas mais flexíveis, manuteníveis e com baixo acoplamento.

A Sigla S.O.L.I.D. se refere à:

## S - Single Responsability

> Cada classe deve ter apenas uma razão para existir

Esse princípio sugere que cada classe deve ter apenas uma única responsabilidade no sistema.
Isso facilita a manutenção e evita que mudanças nela impactem diferentes partes do sistema.

Exemplo:
```js
class GerenciadorDeArquivos {
    salvarArquivo(dados) {
        console.log("Salvando arquivo: ", dados);
    }
}

class Logger {
    registrar(log) {
        console.log("Log: ", log);
    }
}

const gerenciador = new GerenciadorDeArquivos();
gerenciador.salvarArquivo("meu_arquivo.txt");

const logger = new Logger();
logger.registrar("Arquivo salvo com sucesso.");
```

## O - Open/Closed Principle

> Classes devem estar abertas para extensão, mas, fechadas para modificação.

Em resumo, você deve ser capaz de adicionar funcionalidades a uma classe sem alterar o código existente, protegendo as implementações pré-existentes.

Exemplo:

```js
class Calculadora {
    calcular(operacao, a, b) {
        return operacao.executar(a, b);
    }
}

class Soma {
    executar(a, b) {
        return a + b;
    }
}

class Multiplicacao {
    executar(a, b) {
        return a * b;
    }
}

const calculadora = new Calculadora();
console.log(calculadora.calcular(new Soma(), 5, 3)); // 8
console.log(calculadora.calcular(new Multiplicacao(), 5, 3)); // 15
```

## L - Liskov Substitution Principle

> Subtipos dever ser substituíveis por seus tipos básicos

Esse princípio garante que, ao usar uma classe derivada, ela possa substituir a classe base sem alterar o comportamento esperado do programa. Isso exige que as subclasses mantenham a lógica contratual definida pela classe base e respeitem os métodos e propriedades esperados.

Exemplo:

```js
class Forma {
    area() {
        throw new Error("Método 'area' deve ser implementado.");
    }
}

class Retangulo extends Forma {
    constructor(largura, altura) {
        super();
        this.largura = largura;
        this.altura = altura;
    }

    area() {
        return this.largura * this.altura;
    }
}

class Quadrado extends Forma {
    constructor(lado) {
        super();
        this.lado = lado;
    }

    area() {
        return this.lado * this.lado;
    }
}

const formas = [
    new Retangulo(10, 5),
    new Quadrado(4)
];

formas.forEach(forma => {
    console.log("Área: ", forma.area());
});
```

Nesse exemplo, tanto `Retangulo` quanto `Quadrado` são subclasses de `Forma` e implementam o método `area` respeitando a lógica esperada. Isso permite que ambas sejam usadas de forma intercambiável, sem quebrar o funcionamento do código.
## I - Interface Segregation Principle

> Uma classe não deve ser forçada a implementar interfaces que não utiliza.

Divida interfaces grandes em interfaces menores e mais específicas, garantindo que as classes só implementam realmente o que precisam.

## D - Dependency Inversion

> Dependa de Abstrações, não de implementações.

Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações.