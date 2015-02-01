
'use strict';

var MartianAppDispatcher  = require('../dispatcher/MartianAppDispatcher'),
    EventEmitter          = require('events').EventEmitter,
    assign                = require('object-assign'),
    CHANGE_EVENT          = 'change',
    GridStore,
    GRID_SIZE             = [0,0],
    GRID_STATE,
    LAST_COMMAND,
    COMMANDS_BEFORE_DEATH = {},
    move                  = {},
    turn                  = {},
    setInitialState,
    resetGridState,
    recordLastStateCommand,
    getLastStateCommand,
    amIGoingToDie,
    isOutOfBounds;

//  let many tiles attach listeners
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


//  reset the state of the whole grid
resetGridState = () => {
  GRID_STATE = {};
};


//  set the initial point for our robot
setInitialState = (x, y) => {
  GRID_STATE[x+'-'+y] = {
    initialPosition: true,
    text: 'Start'
  };
};


//  a cache for keeping the last state-command
recordLastStateCommand = (state, command) => {
  LAST_COMMAND = state.x+'-'+state.y+'-'+state.orientation+'-'+command;
};

// getter for the last state-command cache
getLastStateCommand = () => {
  return LAST_COMMAND;
};


//  check if the state and the command we have, is a death combination
amIGoingToDie = (state, command) => {

  var key = state.x+'-'+state.y+'-'+state.orientation+'-'+command;
  if(COMMANDS_BEFORE_DEATH[key] === true){
    return true;
  }
  else {
    return false;
  }
};

//  check if that point is out of the grid
isOutOfBounds = (x, y) => {

  var width = GRID_SIZE[0],
      height = GRID_SIZE[1];

  return (
    (x >= width) ||
    (x < 0) ||
    (y >= height) ||
    (y < 0)
  );
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

    //  ----------------------------------------  execution loop
    //  split the commands, and execute them
    commands
    .split('')
    .some( (command, stepNumber) => {

      //  cache the state-command before we move
      recordLastStateCommand(state, command);

      console.log('current state', state);
      console.log('current command', command);

      //  check if it's a death move
      if( amIGoingToDie(state, command) ){
        console.log('that was close');
        console.log('----------------');
        return false;
      }

      switch(command){

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

      console.log('after command', state);
      console.log('----------------');

      if(isOutOfBounds(state.x, state.y)){

        //  get the last state before we moved
        let lastStateCommand = getLastStateCommand();
        //  and save it in the "death" commands
        COMMANDS_BEFORE_DEATH[lastStateCommand] = true;

        console.log('----------------');
        console.log('----------------');
        GRID_STATE.outcome = 'LOST';
        //  exit
        return true;
      }
      else {
        GRID_STATE[state.x+'-'+state.y] = {
          text: 'step '+stepNumber,
          passed: true
        };
      }

      if(stepNumber === commands.length-1){
        GRID_STATE.outcome = 'DONE';
        GRID_STATE[state.x+'-'+state.y].finish = true;
      }

      return false;
    });

    console.log(initialState, commands);
  },

  getStateFor(x, y){

    var stateOfTarget = GRID_STATE[x+'-'+y];

    return stateOfTarget;
  },

  getOutcome(){
    if(GRID_STATE !== undefined){
      return GRID_STATE.outcome;
    } else {
      return 'UNKNOWN';
    }
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
