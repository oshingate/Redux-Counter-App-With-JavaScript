//---------------------------------initializing store and counter variable -------------

let store = Redux.createStore(reducer);

let counter = store.getState();

//---------------------------------- selecting h1 to display counter value---------------

let h1 = document.querySelector('#counter');

h1.innerText = counter.value;

//----------------------------- display step ---------------------------------

let steph2 = document.querySelector('.step-display');
let maxh2 = document.querySelector('.max-display');
changeData();

//-----------------------------------selecting buttons and adding eventListener---------------

const increment = document.querySelector('#inc');
const decrement = document.querySelector('#dec');
const reset = document.querySelector('#reset');

increment.addEventListener('click', () => {
  store.dispatch({ type: 'increment' });
});

decrement.addEventListener('click', () => {
  store.dispatch({ type: 'decrement' });
});

reset.addEventListener('click', () => {
  store.dispatch({ type: 'reset' });
});

//-----------------------------------subscribing to display updated value in h1--------------------

store.subscribe(() => {
  counter = store.getState();
  h1.innerText = counter.value;
});

//----------------------------------  changing step ----------------------------

let stepbuttons = document.querySelectorAll('.btn-sec');

stepbuttons.forEach((each, i) => {
  each.addEventListener('click', () => {
    store.dispatch({ type: 'stepChange', newStep: Number(each.innerText) });
    changeData();
    handleClassName();
  });
});

//----------------------------------  changing max ----------------------------

let maxButtons = document.querySelectorAll('.btn-ter');

maxButtons.forEach((each, i) => {
  each.addEventListener('click', () => {
    store.dispatch({ type: 'maxChange', newMax: Number(each.innerText) });
    changeData();
    handleClassName();
  });
});

//----------------function to change step and max diplay

function changeData() {
  steph2.innerText = `Step :- ${counter.step}`;
  maxh2.innerText = `Max :- ${counter.max}`;
}

// -------------  function to change active class of buttons

function handleClassName() {
  stepbuttons.forEach((one, i) => {
    if (Number(one.innerText) === counter.step) {
      one.classList.add('active');
    } else {
      one.classList.remove('active');
    }
  });
  maxButtons.forEach((one, i) => {
    if (Number(one.innerText) === counter.max) {
      one.classList.add('active');
    } else {
      one.classList.remove('active');
    }
  });
}

//------------------------------------reducer function which contains all logic-----------------------

function reducer(state = 0, action) {
  switch (action.type) {
    case 'increment':
      if (state.value + state.step <= state.max) {
        return {
          value: state.value + state.step,
          step: state.step,
          max: state.max,
        };
      } else {
        return { value: state.value, step: state.step, max: state.max };
      }
    case 'decrement':
      if (state.value - state.step >= 0) {
        return {
          value: state.value - state.step,
          step: state.step,
          max: state.max,
        };
      } else {
        return { value: state.value, step: state.step, max: state.max };
      }
    case 'reset':
      setTimeout(() => {
        changeData();
        handleClassName();
      }, 0);
      return { value: 0, step: 1, max: 99999999 };
    case 'stepChange':
      return { value: state.value, step: action.newStep, max: state.max };

    case 'maxChange':
      return { value: state.value, step: state.step, max: action.newMax };
    default:
      return { value: state, step: 1, max: 99999999 };
  }
}
