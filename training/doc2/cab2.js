const calculator = {
    add: function(a, b) {
        return a + b;
    }
};

const mathOperations = {
    num1: 5,
    num2: 10
};

// add от имени mathOperations и передаю num1 и num2

const result = calculator.add.apply(mathOperations, [mathOperations.num1, mathOperations.num2]);
console.log(result); // 15

/////////////////////////////////////////////////////////////////////////////////////////////

const user = {
    firstName: "John",
    lastName: "Doe",
    getFullName: function() {
        return `${this.firstName} ${this.lastName}`;
    }
};

// printFullName, которая всегда будет использовать getFullName для объекта user

const printFullName = user.getFullName.bind(user); 

console.log(printFullName()); 