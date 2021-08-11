//---------------------------------initializing store and counter variable -------------

let store = Redux.createStore(reducer);

let counter = store.getState();

//---------------------------------- selecting h1 to display counter value---------------

let h1 = document.querySelector('#counter');

h1.innerText = counter;

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
  h1.innerText = counter;
});

//------------------------------------reducer function which contains all logic-----------------------

function reducer(state = 0, action) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    case 'reset':
      return 0;
    default:
      return state;
  }
}
