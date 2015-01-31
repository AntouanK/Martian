
'use strict';

var MartianAppDispatcher = require('../dispatcher/MartianAppDispatcher'),
    EventEmitter    = require('events').EventEmitter,
    assign          = require('object-assign'),
    CHANGE_EVENT    = 'change',
    GridStore,
    GRID_SIZE       = [0,0],
    GRID_STATE,
    move            = {},
    turn            = {};

EventEmitter.prototype.setMaxListeners(100);

move.forward = (orientation, x, y) => {

  switch(orientation){

    case 'N':
    case 'n':
      y += 1;
      break;

    case 'E':
    case 'e':
      x += 1;
      break;

    case 'S':
    case 's':
      y -= 1;
      break;

    case 'W':
    case 'w':
      x -= 1;
      break;
  }
};

turn.left = orientation => {

  switch(orientation){

    case 'N':
    case 'n':
      orientation = 'W';
      break;

    case 'E':
    case 'e':
      orientation = 'N';
      break;

    case 'S':
    case 's':
      orientation = 'E';
      break;

    case 'W':
    case 'w':
      orientation = 'S';
      break;
  }
};

turn.right = orientation => {

  switch(orientation){

    case 'N':
    case 'n':
      orientation = 'E';
      break;

    case 'E':
    case 'e':
      orientation = 'S';
      break;

    case 'S':
    case 's':
      orientation = 'W';
      break;

    case 'W':
    case 'w':
      orientation = 'N';
      break;
  }
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
    console.log(initialState, commands);
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
