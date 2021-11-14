const input = 377;

// Start linked list
let current = {
  value: 0
};
current.next = current;
current.prev = current;

// Insert function
function insertAfter(value, position) {
  const toAdd = {
    value,
    prev: position,
    next: position.next
  };
  position.next.prev = toAdd;
  position.next = toAdd;
  return toAdd;
}

// Run process
for (let i = 1; i <= 2017; i++) {
  for (let j = 0; j < input; j++) {
    current = current.next;
  }
  current = insertAfter(i, current);
}

console.log('Part 1: ', current.next.value);

// Part 2 -- Value after 0, after 50 million total insertions
let currentIndex = 0;
let valueAfterZero = 0;
let listLength = 1;

for (let i = 1; i <= 5e7; i++) {
  currentIndex = (currentIndex + input) % listLength;
  if (currentIndex === 0) {
    valueAfterZero = i;
    listLength++;
    currentIndex = ++currentIndex % listLength;
  } else {
    currentIndex++;
    listLength++;
  }
}

console.log('Part 2: ', valueAfterZero);
