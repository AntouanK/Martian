
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

    if(+event.target.value > 0){
      this.setState({
        rows: +event.target.value
      });
    } else {
      this.setState({
        rows: undefined
      });
    }
  },

  _setColumns(event){

    if(+event.target.value > 0){
      this.setState({
        columns: +event.target.value
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

    Actions.setGridSize(this.state.rows, this.state.columns);
  },

  render() {

    var self = this;

    return (
      <div className="comp-create-grid-form">
        <div className="input-wrapper">
          <label htmlFor="input-rows">Rows</label>
          <input type="number" id="input-rows" onChange={self._setRows} />
        </div>
        <div className="input-wrapper">
          <label htmlFor="input-columns">Columns</label>
          <input type="number" id="input-columns" onChange={self._setColumns} />
        </div>
        <button type="button" disabled={!self._canCreateGrid()} onClick={self._createTheGrid}>
          Create the Grid
        </button>
      </div>
    )
  }

});


module.exports = CreateGridForm;
