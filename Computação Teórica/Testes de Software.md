No mundo atual, testes de software são indispensáveis, especialmente em projetos compartilhados, pois previnem que alterações feitas gerem impatos negativos.

Em um cenário de desenvolvimento ágil e com entregas contínuas, testes de software são peças-chave para garantir qualidade e evitar regressões.

> Os testes pretendem mostrar que um programa faz o que foi destinado a fazer e descobrir defeitos antes que ele seja colocado em uso. 
> Em um teste de software, um programa é executado com uso de dados artificiais, e os resultados são conferidos em busca de erros, anomalias ou informações sobre os atributos não funcionais do programa.
   — Ian Sommerville, Engenharia De Software
## Tipos de Teste

Temos **testes manuais**, executado sem o uso de ferramentas automatizadas. Os testadores interagem diretamente com o sistema, 
vendo se o software atende as expectativas.

Os testes manuais incluem abordagens como o Teste Exploratório, onde os testadores interagem diretamente com o sistema para identificar comportamentos inesperados.

Temos também os **testes automatizados**, que são realizados de forma programática por ferramentas automatizadas.

Os testes automatizados podem ser classificados em: 
### Testes unitários
Os testes unitários têm como foco partes isoladas do código, como funções ou métodos individuais, sem considerar dependências externas. Eles garantem que cada unidade funcione conforme o esperado.

Usamos a metodologia AAA (Arrange, Act, Assert), onde Preparamos o teste com as variáveis e o que mais for necessário, então fazemos a execução da função e verificamos se seu retorno foi esperado.

Um exemplo:
```js
// Função a ser testada
function soma(a, b) {
  return a + b;
}

// Teste unitário
describe('Função soma', () => {
  it('deve retornar a soma de dois números', () => {
    // Arrange
    const num1 = 3;
    const num2 = 5;

    // Act
    const resultado = soma(num1, num2);

    // Assert
    expect(resultado).toBe(8);
  });

  it('deve retornar 0 quando ambos os números forem 0', () => {
    // Arrange
    const num1 = 0;
    const num2 = 0;

    // Act
    const resultado = soma(num1, num2);

    // Assert
    expect(resultado).toBe(0);
  });
});

```

### Testes de integração
Diferente dos testes de unidade, os testes de integração verificam como diferentes módulos interagem entre si, sem cobrir o sistema como um todo. Eles garantem que as unidades integradas funcionem corretamente em conjunto.

Em outras palavras, enquanto os testes unitários validam partes isoladas do código, os testes de integração garantem que essas partes interajam corretamente.

Exemplo: 

Um sistema tem um módulo `UserService` que depende de outro módulo `Database`. O objetivo do teste é verificar se o `UserService` consegue adicionar um usuário ao banco de dados e recuperá-lo corretamente.

```js
// Database.js
class Database {
  constructor() {
    this.data = [];
  }

  save(user) {
    this.data.push(user);
    return user;
  }

  findByUsername(username) {
    return this.data.find(user => user.username === username);
  }
}

module.exports = Database;

// UserService.js
class UserService {
  constructor(database) {
    this.database = database;
  }

  addUser(username, password) {
    const user = { username, password };
    return this.database.save(user);
  }

  getUser(username) {
    return this.database.findByUsername(username);
  }
}

module.exports = UserService;

// Teste de integração: UserService.test.js
const Database = require('./Database');
const UserService = require('./UserService');

describe('Teste de Integração: UserService e Database', () => {
  let database;
  let userService;

  // Configuração antes dos testes
  beforeEach(() => {
    database = new Database(); // Instância real do banco de dados
    userService = new UserService(database); // Serviço integrado com o banco
  });

  it('deve adicionar um usuário e recuperá-lo do banco de dados', () => {
    // Arrange
    const username = 'caio_dev';
    const password = '12345';

    // Act
    userService.addUser(username, password);
    const retrievedUser = userService.getUser(username);

    // Assert
    expect(retrievedUser).toEqual({ username, password });
  });

  it('deve retornar undefined para um usuário não existente', () => {
    // Act
    const retrievedUser = userService.getUser('usuario_inexistente');

    // Assert
    expect(retrievedUser).toBeUndefined();
  });
});
```

### Testes de componentes

Os testes de componentes avaliam a funcionalidade de partes maiores do sistema que combinam várias unidades de código, mas ainda não abrangem interações amplas como nos testes de integração. Eles são frequentemente usados em aplicações front-end para testar interfaces e elementos visuais.

Por exemplo, em aplicações front-end, um teste de componente pode verificar se um botão ou formulário está se comportando corretamente em diferentes estados.

Exemplo:
```js
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('deve exibir o texto correto no botão', () => {
  render(<Button label="Clique aqui" />);
  const buttonElement = screen.getByText(/Clique aqui/i);
  expect(buttonElement).toBeInTheDocument();
});

```

### Testes End-to-End (E2E)

Testes E2E verificam todo o fluxo de um sistema, simulando a interação do usuário final.
Esses testes avaliam o sistema como um todo, desde o começo até o fim, garantindo a integridade da aplicação.

Podemos usar ferramentas como Cypress, Selenium ou Playwright.

```js
// Exemplo com Cypress
describe('Teste E2E: Fluxo de login', () => {
  it('deve realizar o login com sucesso', () => {
    cy.visit('/login');
    cy.get('input[name="username"]').type('caio_dev');
    cy.get('input[name="password"]').type('12345');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.contains('Bem-vindo, Caio!');
  });
});
```

## Em resumo

Testes de software são tipo uma revisão de um carro antes de uma viagem. Queremos garantir que tudo esteja funcionando perfeitamente.

testes de software são como uma revisão de carro antes de uma viagem: os testes unitários verificam o motor, os de integração analisam o encaixe das peças, e os end-to-end garantem que o veículo funcione bem como um todo.

Combinando testes unitários, de integração, de componentes e end-to-end, garantimos que cada parte do sistema funciona corretamente, suas interações estão alinhadas e o fluxo geral atende às expectativas do usuário. A escolha do tipo de teste depende do que se quer validar, mas juntos eles proporcionam software confiável e robusto.