const person = {
    name: "Alice",
    age: 30,
    introduce: function(city, country) {
        console.log(`Hi, I'm ${this.name}, I'm ${this.age} years old and I live in ${city}, ${country}.`);
    }
};

const anotherPerson = {
    name: "Bob",
    age: 25
};

// person.introduce для anotherPerson с помощью call
person.introduce.call(anotherPerson, "Moscow", "Russia");
// person.introduce для anotherPerson с помощью apply
person.introduce.apply(anotherPerson, ["Yekaterinburg", "Russia"]);
// bind, чтобы создать introduceAnotherPerson, привязав this к anotherPerson
const introduceAnotherPerson = person.introduce.bind(anotherPerson, "New York", "USA");
introduceAnotherPerson();
