//// module.exports
// const messages = require("./module");
// const lang = "en";

// console.log(messages);
// console.log(`zoo, ${messages[lang]}`); // zoo, hello world!

//// 객체구조분해할당
// const { en } = require("./module");

// console.log(`zoo, ${en}`); // zoo, hello world!

// //sum
// const sum = require("./module");
// console.log(sum(1, 2)); // 3

const { addition, multiple } = require("./module");
const Math = require("./module");
console.log(addition(1, 5), multiple(2, 6));
console.log(Math[addition(2, 5)]);
