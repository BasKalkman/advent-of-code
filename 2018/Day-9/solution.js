const numPlayers = 413;
const numMarbles = 71082 * 100;

const addAfter = (value, marble) => {
  const toAdd = {
    value,
    prev: marble,
    next: marble.next
  };
  marble.next.prev = toAdd;
  marble.next = toAdd;
  return toAdd;
};

const scores = {};

let current = {
  value: 0
};
current.next = current;
current.prev = current;

for (let i = 1; i <= numMarbles; i++) {
  if (i % 23 === 0) {
    current = current.prev.prev.prev.prev.prev.prev;
    scores[i % numPlayers] = (scores[i % numPlayers] || 0) + i + current.prev.value;
    current.prev.prev.next = current;
    current.prev = current.prev.prev;
  } else {
    current = addAfter(i, current.next);
  }
}

let result = Object.entries(scores).reduce((a, b) => (a > b[1] ? a : b[1]), 0);
console.log(result);
