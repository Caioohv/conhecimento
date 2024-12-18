/* RODAR COM npm run mocha */

import { expect } from "chai";
import { describe, it } from "mocha";

class NumberT {
  constructor(value) {
    this.value = value;
  }

  get() {
    return this.value;
  }

  toBeEven() {
    return this.value % 2 === 0;
  }

  toBeOdd() {
    return this.value % 2 !== 0;
  }

  sum(number) {
    this.value += number;
  }
}

class ArrayT {
  constructor(array) {
    this.array = array;
  }

  sort() {
    this.array.sort((a, b) => a - b);
  }

  push(number) {
    this.array.push(number);
  }

  pop() {
    this.array.pop();
  }
}

describe("Tests with NumberT", () => {
  let number;

  before(() => {
    number = new NumberT(10);
  })

  it('should be == 10', () => {
    expect(number.get()).to.be.equal(10);
  })

  it('should be even', () => {
    expect(number.toBeEven()).to.be.true;
  })

  it('should add one', () => {
    number.sum(1);
    expect(number.get()).to.be.equal(11);
  })

  it('should be odd', () => {
    expect(number.toBeOdd()).to.be.true;
  })

});

describe("Tests with ArrayT", () => {
  let array;

  before(() => {
    array = new ArrayT([3, 1, 2]);
  })

  it('should add 4', () => {
    array.push(4);
    expect(array.array).to.be.deep.equal([3, 1, 2, 4]);
  })

  it('should sort array', () => {
    array.sort();
    expect(array.array).to.be.deep.equal([1, 2, 3, 4]);
  })

  it('should remove item', () => {
    array.pop();
    expect(array.array).to.be.deep.equal([1, 2, 3]);
  })
})