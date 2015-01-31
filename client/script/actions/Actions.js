
'use strict';

var MartianAppDispatcher = require('../dispatcher/MartianAppDispatcher'),
    Actions;

Actions = {

  setGridSize(rows, columns) {

    MartianAppDispatcher
    .handleViewAction({
      actionType: 'SET_GRID_SIZE',
      rows: rows,
      columns: columns
    });
  },

  simulate(initialState, commands) {

    MartianAppDispatcher
    .handleViewAction({
      actionType: 'SIMULATE',
      initialState: initialState,
      commands: commands
    });
  }

};

module.exports = Actions;
