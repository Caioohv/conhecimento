## Definição

Injeção de dependências (DI) é um padrão de design que promove a separação de responsabilidades de um sistema.
Esse padrão consiste em fornecer as dependências que um objeto precisa para funcionar, invés de deixar que ele as crie ou busque.

O uso de DI melhora significativamente a modularidade do sistema, permitindo que diferentes componentes trabalhem de maneira independente.
A DI também facilita a testabilidade do código, pois se torna mais fácil substituir dependências reais por mocks ou stubs em cenários de teste.

## Como Funciona?

Existem diversas maneiras de criar uma injeção de dependência: Temos injeção via construtor, onde as dependências são passadas na instância do objeto, via método setter e, por fim, via interface, onde as dependências são passadas via interfaces especializadas em resolução de dependências.

Exemplos:
1. Via construtor
```js
// Dependência
class Motor {
    ligar() {
        console.log("Motor ligado.");
    }
}

// Classe que depende de Motor
class Carro {
    constructor(motor) {
        this.motor = motor; // Injeção de dependência pelo construtor
    }

    dirigir() {
        this.motor.ligar();
        console.log("Carro em movimento.");
    }
}

// Uso
const motor = new Motor();
const carro = new Carro(motor); // Dependência injetada aqui
carro.dirigir();
```

2. Via Setter
```js
class Motor {
    ligar() {
        console.log("Motor ligado.");
    }
}

class Carro {
    setMotor(motor) {
        this.motor = motor; // Dependência injetada via setter
    }

    dirigir() {
        this.motor.ligar();
        console.log("Carro em movimento.");
    }
}

const motor = new Motor();
const carro = new Carro();
carro.setMotor(motor);
carro.dirigir();
```

## Benefícios
**Redução de acoplamento**: A classe não tem relação com a criação ou gestão de dependências, de forma a separar as responsabilidades.
**Facilidade de Substituição**: Dependências podem ser facilmente substituídas por outras implementações, sem alterações significativas no código.
**Suporte a Testes**: Durante os testes, é possível incluir mocks ou stubs, facilitando os testes unitários das classes que tem dependências.

## Implementação

Frameworks como **NestJS** e **Awilix** oferecem formas eficientes de gerenciar DI. Eles utilizam contêineres de injeção para resolver e gerenciar dependências automaticamente.

### Usando Awilix

Awilix é um contêiner de injeção de dependências que facilita a organização e gerenciamento de dependências.

`npm install awilix`

#### Exemplo com Awilix

```js
const { createContainer, asClass } = require('awilix');

// Dependências
class Motor {
    ligar() {
        console.log("Motor ligado.");
    }
}

class Carro {
    constructor({ motor }) { // Awilix injeta as dependências automaticamente
        this.motor = motor;
    }

    dirigir() {
        this.motor.ligar();
        console.log("Carro em movimento.");
    }
}

// Criando o contêiner
const container = createContainer();

// Registrando dependências
container.register({
    motor: asClass(Motor),
    carro: asClass(Carro),
});

// Resolvendo a dependência principal
const carro = container.resolve('carro');
carro.dirigir();
```