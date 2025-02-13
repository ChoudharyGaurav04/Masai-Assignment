function Person(name, age) {
    this.name = name;
    this.age = age;
  }
  Person.prototype.introduce = function() {
    console.log("Hi, my name is " + this.name + " and I am " + this.age + " years old.");
  };
  
  function Employee(name, age, jobTitle) {
    Person.call(this, name, age); 
    this.jobTitle = jobTitle;
  }

  Employee.prototype = Object.create(Person.prototype);
  Employee.prototype.constructor = Employee; 

  Employee.prototype.work = function() {
    console.log(this.name + " is working as a " + this.jobTitle + ".");
  };
  

  const person1 = new Person("Vipul", 22);
  const employee1 = new Employee("Gaurav Tyagi", 25, "Software Engineer");
  
  person1.introduce(); // Output: Hi, my name is Vipul and I am 30 years old.
  employee1.introduce(); // Output: Hi, my name is Gaurav Tyagi and I am 25 years old.
  employee1.work();      // Output: Gaurav Tyagi is working as a Software Engineer.
  
  const employee2 = new Employee("Shivam", 40, "Manager");
  employee2.introduce(); // Output: Hi, my name is shivam and I am 40 years old.
  employee2.work(); // Output: Shivam is working as a Manager.
  
  console.log(person1 instanceof Person); // true
  console.log(employee1 instanceof Person); // true (because Employee inherits from Person)
  console.log(employee1 instanceof Employee); // true