const user = {
     name: "Eric",
     age: 25,
     address: "Ha noi"
}

// const name = user.name;
// const age = user.age;
// const address = user.address;


const { name, age, address } = user;

const level = ["internship", "fresher", "junior", "middle", "senior"];

// const a = level[0];


const [a, , , , d] = level


const arr1 = [1, 2, 3]
const arr2 = [0, ...arr1, 5];

const obj1 = { foo: "bar", x: 42 };
const obj2 = { foo: "baz", y: 13 };
const clonedObj = { ...obj1 };
// { foo: "bar", x: 42 }
const mergedObj = { ...obj1, ...obj2 };
// { foo: "baz", x: 42, y: 13 }