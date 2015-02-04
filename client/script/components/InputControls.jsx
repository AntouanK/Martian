
var React     = require('react'),
    Actions   = require('../actions/Actions'),
    InputControls;


InputControls = React.createClass({

  getInitialState(){
    return {
      initialRow: undefined,
      initialColumn: undefined,
      initialOrientation: undefined
    };
  },

  _setRow(event){

    var row = event.target.value;

    if(row === '' || isNaN(row)){
      this.setState({
        initialRow: undefined
      });
    } else {
      this.setState({
        initialRow: +row
      });
    }
  },

  _setColumn(event){

    var column = event.target.value;

    if(column === '' || isNaN(column)){
      this.setState({
        initialColumn: undefined
      });
    } else {
      this.setState({
        initialColumn: +column
      });
    }
  },

  _setOrientation(event){

    var orientation = event.target.value;

    if(orientation.match(/^[NSEW]$/gi) === null){
      this.setState({
        initialOrientation: undefined
      });
    } else {
      this.setState({
        initialOrientation: orientation.toUpperCase()
      });
    }
  },

  _setCommands(event){

    var commands = event.target.value;

    if(commands.match(/^[FRLfrl]+$/) === null || commands.length > 100){
      this.setState({
        commands: undefined
      });
    } else {
      this.setState({
        commands: commands.toUpperCase()
      });
    }
  },

  _isInitialPointReady(){

    return  (this.state.initialRow > -1) &&
            (this.state.initialColumn > -1) &&
            (typeof this.state.initialOrientation === 'string') &&
            (this.state.initialOrientation.match(/^[NSWE]$/i));
  },

  _readyForSimulation(){

    return this._isInitialPointReady() && this.state.commands !== undefined;
  },

  _simulate(){

    Actions
    .simulate(
      {
        row: this.state.initialRow,
        column: this.state.initialColumn,
        orientation: this.state.initialOrientation
      },
      this.state.commands
    );
  },

  render(){

    var self                = this,
        initialStateLabels  = {};

    if(self.state.initialRow > -1){
      initialStateLabels.row = self.state.initialRow;
    } else {
      initialStateLabels.row = 'Row';
    }

    if(self.state.initialColumn > -1){
      initialStateLabels.column = self.state.initialColumn;
    } else {
      initialStateLabels.column = 'Column';
    }

    if(self.state.initialOrientation){
      initialStateLabels.orientation = self.state.initialOrientation;
    } else {
      initialStateLabels.orientation = 'Orientation';
    }

    return (
      <div className="comp-input-controls">
        <div className="initial-state-form">

          <label>
            Initial Position ( { initialStateLabels.row }, { initialStateLabels.column }, { initialStateLabels.orientation } )
          </label>

          <input
            className="small"
            type="number"
            id="input-initial-row"
            onChange={self._setRow} required />

          <input
            className="small"
            type="number"
            id="input-initial-column"
            onChange={self._setColumn} required />

          <input
            className="small"
            type="text"
            id="input-initial-orientation"
            onChange={self._setOrientation} required />
        </div>
        <div className="commands-form">

          <label>
            Commands ( max 100 )
          </label>

          <input
            type="text"
            id="input-commands"
            onChange={self._setCommands} required />
        </div>

        <button
          type="button"
          disabled={!self._readyForSimulation()}
          onClick={self._simulate}>

          Simulate
        </button>
      </div>
    )
  }

});


module.exports = InputControls;
