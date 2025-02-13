function Animal() {
    this.type = "Animal";
  }
  Animal.prototype.sound = function() {
    console.log("Animal sound");
  };
  
  // Dog constructor function
  function Dog() {
    // Dog calls the Animal constructor
    Animal.call(this);
    this.type = "Dog";
  }
  // Dog.prototype from Animal.prototype
  Dog.prototype = Object.create(Animal.prototype);
  Dog.prototype.constructor = Dog;
  
  // Override method
  Dog.prototype.sound = function() {
    console.log("Bark");
  };
  const myDog = new Dog();
  myDog.sound(); // Output: "Bark"
  
  // Scenarios 2
  const anotherAnimal = new Animal();
  anotherAnimal.sound(); // Output: "Animal sound"
  
  console.log(myDog instanceof Dog); // true
  console.log(myDog instanceof Animal); // true
  