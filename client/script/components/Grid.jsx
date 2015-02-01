
var React       = require('react'),
    GridTile    = require('../components/GridTile.jsx'),
    GridStore   = require('../stores/GridStore'),
    Grid;


Grid = React.createClass({

    propTypes: {
      rows:     React.PropTypes.number,
      columns:  React.PropTypes.number
    },
    // mixins : [],

    getInitialState() {
      return {
        outcome: 'UNKNOWN YET'
      };
    },

    getDefaultProps() {
      return {
        rows: 0,
        columns: 0
      }
    },

    _onChange(){

      this.setState({
        outcome: GridStore.getOutcome()
      });
    },

    componentWillMount () {
      GridStore.addChangeListener(this._onChange);
    },

    componentWillUnmount () {
      GridStore.removeChangeListener(this._onChange);
    },

    _createTile(x, y){

      return (
        <GridTile x={x} y={y} key={'tile-'+x+'-'+y} />
      );
    },

    _createRow(width, yOfRow){

      var tiles   = [],
          self    = this;

      //  check required arguments
      if( isNaN(width) || isNaN(yOfRow) ){
        throw new Error('width or yOfRow is not a number!');
      }

      for(let i = 0; i < width; i+=1){
        tiles
        .push( self._createTile(i, yOfRow) );
      }

      return (
        <div className="grid-row" key={'row-'+yOfRow}>
          {tiles}
        </div>
      );
    },

    render() {

      var self          = this,
          rowsToRender  = [],
          columns       = this.props.columns;


      for(let i = 0; i < self.props.rows; i += 1){

        let currentRow = self._createRow(columns, i);

        rowsToRender.push(currentRow);
      }

      //  we want row 0 to be at the bottom
      rowsToRender = rowsToRender.reverse();

      return (
        <div className="comp-grid">
          <div className="outcome-container">
            Outcome: {this.state.outcome}
          </div>
          {rowsToRender}
        </div>
      );
    }

});


module.exports = Grid;
