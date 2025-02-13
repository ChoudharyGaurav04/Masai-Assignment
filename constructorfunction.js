function Car(make, model, year, isAvailable = true) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.isAvailable = isAvailable;
  }
  // Create the Customer constructor function
  function Customer(name) {
    this.name = name;
    this.rentedCars = [];
  }
  // Add a rentCar method to Customer prototype
  Customer.prototype.rentCar = function(car) {
    if (car.isAvailable) {
      car.isAvailable = false;
      this.rentedCars.push(car);
      console.log(`${this.name} successfully rented the ${car.make} ${car.model}.`);
    } else {
      console.log(`The ${car.make} ${car.model} is already rented.`);
    }
  };
  
  //Add a returnCar method to Customer prototype
  Customer.prototype.returnCar = function(car) {
    const carIndex = this.rentedCars.indexOf(car);
    if (carIndex !== -1) {
      car.isAvailable = true;
      this.rentedCars.splice(carIndex, 1);
      console.log(`${this.name} has returned the ${car.make} ${car.model}.`);
      setTimeout(() => {
        console.log(`${car.make} ${car.model} is now available for rent again.`);
      }, 2000);
    } else {
      console.log(`${this.name} did not rent this car.`);
    }
  };

  function PremiumCustomer(name, discountRate = 0.1) {
    Customer.call(this, name); 
    this.discountRate = discountRate;
  }

  PremiumCustomer.prototype = Object.create(Customer.prototype);
  PremiumCustomer.prototype.constructor = PremiumCustomer;
  
  //function to calculate rental prices
  function calculateRentalPrice(carType, days, customer) {
    let basePricePerDay = 50;
    let typeMultiplier = 1;
  
    switch (carType) {
      case 'SUV':
        typeMultiplier = 1.5;
        break;
      case 'Sedan':
        typeMultiplier = 1.2;
        break;
      case 'Truck':
        typeMultiplier = 2.0;
        break;
      default:
        typeMultiplier = 1;
    }
  
    let totalPrice = basePricePerDay * typeMultiplier * days;

    if (customer instanceof PremiumCustomer) {
      totalPrice *= (1 - customer.discountRate);
    }
  
    return totalPrice;
  }

  function Maintenance(car, delay) {
    setTimeout(() => {
      car.isAvailable = true;
      console.log(`The ${car.make} ${car.model} is now available after maintenance.`);
    }, delay);
  }

  const car1 = new Car('Toyota', 'Corolla', 2020);
  const car2 = new Car('Honda', 'Civic', 2019);
  const car3 = new Car('Ford', 'Explorer', 2021);
  
  const customer1 = new Customer('Vipul');
  const premiumCustomer1 = new PremiumCustomer('Shivam', 0.15);
  
  // Renting cars
  customer1.rentCar(car1); // Vipul rents the Toyota Corolla
  customer1.rentCar(car2); // Vipul rents the Honda Civic
  premiumCustomer1.rentCar(car3); // Shivam rents the Ford Explorer
  
  // Calculate rental prices
  console.log(`Rental price for Vipul (Toyota, 3 days): $${calculateRentalPrice('Sedan', 3, customer1)}`);
  console.log(`Rental price for Shivam (SUV, 5 days): $${calculateRentalPrice('SUV', 5, premiumCustomer1)}`);

  customer1.returnCar(car1);
  Maintenance(car2, 3000);
  