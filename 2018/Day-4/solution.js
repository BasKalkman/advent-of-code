const fs = require('fs');

// Read log and sort chronologically
const logs = fs
  .readFileSync('input.txt', { encoding: 'utf-8' })
  .split('\r\n')
  .sort((a, b) => {
    let checkA = new Date(a.match(/\[[0-9,\-\s:]{1,}/g)[0].replace('[', ''));
    let checkB = new Date(b.match(/\[[0-9,\-\s:]{1,}/g)[0].replace('[', ''));

    if (checkA > checkB) {
      return 1;
    } else {
      return -1;
    }
  });

const guardObservations = [];

function guardTimes() {
  let currentGuard = 0;
  let wentToSleep = 0;
  let minutesAsleep = [];

  // Check through logs. Note shift starts, times asleep into object.
  logs.forEach(log => {
    // Did the guards change?
    if (log.match(/Guard #[0-9]{1,}/g)) {
      // If so, write minutes asleep to guardObservations for currentGuard.
      // Check if currentGuard already exists in Array, otherwise push
      if (findGuard(currentGuard) === -1) {
        //Guard not found
        let guard = {};
        guard.id = currentGuard;
        guard.asleep = minutesAsleep;
        guardObservations.push(guard);
      } else {
        let index = findGuard(currentGuard);
        minutesAsleep.forEach(minute => {
          guardObservations[index].asleep.push(minute);
        });
      }
      // Set new guard
      let guardId = parseInt(log.match(/#[0-9]{1,}/g)[0].replace('#', ''));
      currentGuard = guardId;
      minutesAsleep = [];
      // Just in case guard start shift asleep
      let minute = parseInt(log.match(/:[0-9]{2}/g)[0].replace(':', ''));
      wentToSleep = minute;
    }

    // If the guards didn't change
    // Did they wake up? Write all minutes from wentToSleep till now to minutesAsleep
    if (log.match(/wakes up/g)) {
      let now = parseInt(log.match(/:[0-9]{2}/g)[0].replace(':', ''));
      if (wentToSleep < now) {
        for (let i = wentToSleep; i < now; i++) {
          minutesAsleep.push(i);
        }
      } else {
        for (let i = wentToSleep; i < 60; i++) {
          minutesAsleep.push(i);
        }
        for (let i = 0; i < now; i++) {
          minutesAsleep.push(i);
        }
      }
    }
    // Did they fall asleep? Write minute to wentToSleep
    if (log.match(/falls asleep/g)) {
      let minute = parseInt(log.match(/:[0-9]{2}/g)[0].replace(':', ''));
      wentToSleep = minute;
    }
  });
}

function findGuard(number) {
  let index = guardObservations.findIndex(obj => obj.id === number);
  return index;
}

guardTimes();

// Check guardObservations. Which guard was asleep most minutes?
function asleepMost() {
  // Sort guards
  guardObservations.sort((a, b) => {
    if (a.asleep.length > b.asleep.length) {
      return -1;
    } else {
      return 1;
    }
  });
  // Guard that sleeps most
  console.log('Guard ID: ', guardObservations[0].id);

  // Which minute?
  let temp = {};
  let minute = guardObservations[0].asleep;

  for (let i = 0; i < minute.length; i++) {
    if (!temp[minute[i]]) {
      temp[minute[i]] = 0;
    }
    temp[minute[i]]++;
  }
  let chosenMinute = Object.keys(temp).reduce((a, b) => {
    return temp[a] > temp[b] ? a : b;
  });
  console.log('Minute: ', chosenMinute);
  console.log('Result: ', chosenMinute * guardObservations[0].id);
}

asleepMost();
console.log('----------Part 2----------');
// PART 2

function whichMinuteMost() {
  let minuteMost = 0;
  let minuteCheck = 0;
  let guardMost = 0;

  guardObservations.forEach(guard => {
    let minutes = {};
    for (let i = 0; i < guard.asleep.length; i++) {
      if (!minutes[guard.asleep[i]]) {
        minutes[guard.asleep[i]] = 0;
      }
      minutes[guard.asleep[i]]++;
      if (minutes[guard.asleep[i]] > minuteCheck) {
        minuteCheck = minutes[guard.asleep[i]];
        minuteMost = guard.asleep[i];
        guardMost = guard.id;
      }
    }
  });
  console.log('Guard ID: ', guardMost);
  console.log('Minute slept most: ', minuteMost);
  console.log('result: ', parseInt(guardMost) * parseInt(minuteMost));
}
whichMinuteMost();
