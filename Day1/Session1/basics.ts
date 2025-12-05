// TypeScript basics demo
let username: string = 'Hellion';
const age: number = 30;
let isTrainer: boolean = false;

// fun <fun name> (params/args): return_type {}
// function greet(name: string): string {
//   return `Hello, ${name}!`;
// }

function greet(name: string): string {
  return `Hello, ${name} is almost ${10 * 2 + 5}yrs old.`;
}

console.log(greet(username));


// if (true) {
//   var x = 10;
//   let y = 20; // block scoped
// }

// console.log(x);
// console.log(y);

let arr = [11, 20, 31, 40, 51, 60];
// even -> % 2 == 0
// const evenNumbers = arr.filter(function(number) {
//   if(number % 2 == 0) {
//     return number
//   }
// });

// const evenNumbers = arr.filter(number => number % 2 == 0 && number + 1 > 22);
// evenNumbers.forEach(function(num) {console.log(num)})
// evenNumbers.forEach(num => console.log(num));
// arr.filter(number => number % 2 == 0 && number + 1 > 22)
//   .forEach(num => console.log(num));


// Without destruting
// const arr2 = [10, 20, 30];
// const a = arr2[0];
// const b = arr2[1];
// const c = arr2[2];

// console.log(a, b, c);

// const [, , c, d = 20] = [10, 20, 30];
// console.log(c, d);

let a = 5;
let b = 6;

// let c = a;
// a = b;
// b = c;

// console.log(a, b)

// [a, b] = [b, a];
// console.log(a, b);
 

const user = { name: 'Aaryan', exp: 16, country: 'India', age: 40 }
// const name = user.name;
// const exp = user.exp;
// const age = user.age;
const {name: fullName, exp: totalExp, age: userAge = 30} = user;
console.log(fullName, totalExp, userAge);

let arr2 = [200, 300, 400, ...arr] // arr2, arr values
// arr.forEach(num => arr2.push(num))
console.log(arr2)
