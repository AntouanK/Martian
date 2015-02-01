
'use strict';

var MartianAppDispatcher  = require('../dispatcher/MartianAppDispatcher'),
    EventEmitter          = require('events').EventEmitter,
    assign                = require('object-assign'),
    CHANGE_EVENT          = 'change',
    GridStore,
    GRID_SIZE             = [0,0],
    GRID_STATE,
    move                  = {},
    turn                  = {},
    setInitialState,
    resetGridState,
    isOutOfBounds;

EventEmitter.prototype.setMaxListeners(100);


move.forward = state => {

  switch(state.orientation){

    case 'N':
      state.y += 1;
      break;

    case 'E':
      state.x += 1;
      break;

    case 'S':
      state.y -= 1;
      break;

    case 'W':
      state.x -= 1;
      break;
  }
};

turn.left = state => {

  switch(state.orientation){

    case 'N':
      state.orientation = 'W';
      break;

    case 'E':
      state.orientation = 'N';
      break;

    case 'S':
      state.orientation = 'E';
      break;

    case 'W':
      state.orientation = 'S';
      break;
  }
};

turn.right = state => {

  switch(state.orientation){

    case 'N':
      state.orientation = 'E';
      break;

    case 'E':
      state.orientation = 'S';
      break;

    case 'S':
      state.orientation = 'W';
      break;

    case 'W':
      state.orientation = 'N';
      break;
  }
};

resetGridState = function(){
  GRID_STATE = {};
};

setInitialState = (x, y) => {
  GRID_STATE[x+'-'+y] = {
    initialPosition: true,
    text: 'Start'
  };
};


isOutOfBounds = (x, y) => {

  var width = GRID_SIZE[0],
      height = GRID_SIZE[1];

  return (x >= width) || (y >= height);
};


//  ===================================================== GridStore
GridStore = assign({}, EventEmitter.prototype, {

  getGridSize(){
    return GRID_SIZE;
  },

  setGridSize(rows, columns){
    GRID_SIZE = [rows, columns];
  },

  simulate(initialState, commands){

    var state = {
      x: initialState.row,
      y: initialState.column,
      orientation: initialState.orientation
    };

    //  reset the GRID STATE
    resetGridState();

    //  check if we are already out of bounds
    if(isOutOfBounds(state.x, state.y)){
      GRID_STATE.outcome = 'LOST';
      console.log(GRID_STATE);
      return true;
    }

    //  set the initial position
    setInitialState(state.x, state.y);

    //  split the commands, and execute them
    commands
    .split('')
    .forEach( (letter, stepNumber) => {

      switch(letter){

        case 'R':
          turn.right(state);
          break;

        case 'L':
          turn.left(state);
          break;

        case 'F':
          move.forward(state);
          break;
      }

      if(isOutOfBounds(state.x, state.y)){
        GRID_STATE.outcome = 'LOST';
        console.log(GRID_STATE);
        return false;
      }
      else {
        GRID_STATE[state.x+'-'+state.y] = {
          text: 'passed '+stepNumber,
          passed: true
        };
      }

      console.log('o, x, y', state);
    });

    console.log(initialState, commands);
  },

  getStateFor(x, y){

    var stateOfTarget = GRID_STATE[x+'-'+y];

    return stateOfTarget;
  },

  /**
  * Emit a 'change' event to all the listeners
  */
  emitChange() {
    this.emit(CHANGE_EVENT);
  },

  /**
  * @param {function} callback
  */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
  * @param {function} callback
  */
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});


// Register to handle all updates
MartianAppDispatcher.register(function(payload) {

  var action = payload.action,
  //  flag to let us know if there is a change in this store
  seenChange = true;

  switch(action.actionType) {

    case 'SET_GRID_SIZE':
      GridStore.setGridSize(action.rows, action.columns);
      break;

    case 'SIMULATE':
      GridStore.simulate(action.initialState, action.commands);
      break;

    default:
      seenChange = false;
      return true;
  }


  //  update the listeners
  seenChange && GridStore.emitChange();

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = GridStore;
