const fs = require('fs');

const data = fs.readFileSync('./input.txt', { encoding: 'utf8' }).split('\r\n');

const steps = [];
const workers = [];
const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
makeWorkers();

function makeWorkers() {
  for (let i = 0; i < 5; i++) {
    let obj = {
      workerID: i + 1,
      assigned: '',
      completedAt: -1
    };
    workers.push(obj);
  }
}

function checkWorkersAvailable() {
  for (let i = 0; i < workers.length; i++) {
    if (!workers[i].assigned) {
      return true;
    }
  }
}

function assignWorker(step) {
  let stepAssigned = false;
  let stepIndex = alpha.indexOf(step);
  let indexStep = findStep(step);
  if (steps[indexStep].assigned === false) {
    workers.forEach(worker => {
      if (worker.assigned === '' && stepAssigned === false) {
        worker.assigned = step;
        worker.completedAt = counter + stepIndex + 61; // Because arrays go from 0
        steps[indexStep].assigned = true;
        stepAssigned = true;
      }
    });
  }
}

function checkJobsCompleted() {
  workers.forEach(worker => {
    // console.log(worker.completedAt, worker.assigned);
    if (worker.completedAt === counter) {
      let index = findStep(worker.assigned);
      steps[index].completed = true;
      completedSteps.push(worker.assigned);
      worker.assigned = '';
      worker.completedAt = -1;
    }
  });
}

// Populate steps in instructions and their requirements
data.forEach(line => {
  let step = line.match(/[A-Z] can/g)[0].replace(' can', '');
  let requires = line.match(/[A-Z] must/g)[0].replace(' must', '');

  if (findStep(step) === -1) {
    let obj = {
      step: step,
      requires: [],
      completed: false,
      assigned: false
    };
    obj.requires.push(requires);
    steps.push(obj);
  } else {
    let index = findStep(step);
    steps[index].requires.push(requires);
  }
  if (findStep(requires) === -1) {
    let obj = {
      step: requires,
      requires: [],
      completed: false,
      assigned: false
    };
    steps.push(obj);
  }
});

// Sort Steps Alphabetically
steps.sort((a, b) => {
  if (a.step > b.step) {
    return 1;
  } else {
    return -1;
  }
});

// Return index of a step in steps
function findStep(search) {
  let index = steps.findIndex(step => step.step === search);
  return index;
}

// Write completed steps
let completedSteps = [];

let counter = -1;

// While there are still steps to take
while (completedSteps.length !== steps.length) {
  console.log(counter);
  console.log(workers);
  counter++;
  // Check if work is completed
  checkJobsCompleted();
  // Check if workers are available
  let workersAvailable = 0;
  workers.forEach(worker => {
    if (worker.assigned === '') {
      workersAvailable++;
    }
  });
  if (workersAvailable > 0) {
    // Check each step
    for (let i = 0; i < steps.length; i++) {
      // Is it completed?
      if (steps[i].completed === false) {
        // Can it be completed?
        let requirementsUnfulfilled = 0;
        for (let j = 0; j < steps[i].requires.length; j++) {
          let index = findStep(steps[i].requires[j]);
          if (steps[index].completed === false) {
            requirementsUnfulfilled++;
          }
        }
        // If it can be completed
        if (requirementsUnfulfilled === 0) {
          assignWorker(steps[i].step);
          // steps[i].completed = true;
          // completedSteps.push(steps[i].step);
          // i = -1; // Next step is to increment i, so we start from beginning of array again
        }
      }
    }
  }
}

console.log(completedSteps.join(''));
