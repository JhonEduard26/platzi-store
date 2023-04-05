const sum = (a: number, b: number) => {
  return a + b;
};

sum(2, 4);

class Person {
  constructor(private name: string, private age: number) {}

  getSummary() {
    return `My name is ${this.name}, ${this.age}`;
  }
}

const jhon = new Person('Jhon', 23);
jhon.getSummary();
