const input = 793061;
const inputStr = input.toString();

let posElfOne = 0;
let posElfTwo = 1;

let recipes = ['3', '7'];

for (let i = 0; i < input + 10; i++) {
  let numOne = parseInt(recipes[posElfOne]);
  let numTwo = parseInt(recipes[posElfTwo]);

  let recipeScore = numOne + numTwo;

  let toAdd = recipeScore.toString().split('');
  recipes.push(...toAdd);

  posElfOne = (posElfOne + numOne + 1) % recipes.length;
  posElfTwo = (posElfTwo + numTwo + 1) % recipes.length;
}

let resultP1 = recipes.slice(input, input + 10).join('');
console.log('Part 1: ', resultP1);

// Part 2 -- Takes a while
let found = false;

while (!found) {
  let numOne = parseInt(recipes[posElfOne]);
  let numTwo = parseInt(recipes[posElfTwo]);

  let recipeScore = numOne + numTwo;

  let toAdd = recipeScore.toString().split('');
  recipes.push(...toAdd);

  if (recipes.length % 1e5 === 0) {
    console.log('Checking ', recipes.length);
    let check = recipes.join('').match(new RegExp(inputStr));
    if (check) {
      console.log('Part 2: ', check.index);
      found = true;
      return;
    }
  }

  posElfOne = (posElfOne + numOne + 1) % recipes.length;
  posElfTwo = (posElfTwo + numTwo + 1) % recipes.length;
}
