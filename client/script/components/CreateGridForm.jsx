
var React     = require('react'),
    Actions   = require('../actions/actions'),
    CreateGridForm;


CreateGridForm = React.createClass({

    //  initial state
  getInitialState() {
    return {
      rows: undefined,
      columns: undefined
    };
  },

  _setRows(event){

    var numberValue = +event.target.value;

    if(numberValue > 0 && numberValue < 51){
      this.setState({
        rows: numberValue
      });
    } else {
      this.setState({
        rows: undefined
      });
    }
  },

  _setColumns(event){

    var numberValue = +event.target.value;

    if(numberValue > 0 && numberValue < 51){
      this.setState({
        columns: numberValue
      });
    } else {
      this.setState({
        columns: undefined
      });
    }
  },

  _canCreateGrid() {
    return !isNaN(this.state.rows) && !isNaN(this.state.columns);
  },

  _createTheGrid() {

    Actions
    .setGridSize({
      width: this.state.columns,
      height: this.state.rows
    });
  },

  render() {

    var self = this;

    return (
      <div className="comp-create-grid-form">
        <div className="input-wrapper">
          <label htmlFor="input-columns">Columns ( 1 - 50 ) </label>
          <input type="number" id="input-columns" onChange={self._setColumns} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="input-rows">Rows ( 1 - 50 ) </label>
          <input type="number" id="input-rows" onChange={self._setRows} />
        </div>
        <button type="button" disabled={!self._canCreateGrid()} onClick={self._createTheGrid}>
          Create the Grid
        </button>
      </div>
    )
  }

});


module.exports = CreateGridForm;
