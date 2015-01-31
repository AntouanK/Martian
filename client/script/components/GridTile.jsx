
var React = require('react'),
    GridStore = require('../stores/GridStore'),
    GridTile;


GridTile = React.createClass({

    propTypes: {
      x:  React.PropTypes.number,
      y:  React.PropTypes.number
    },

    _onChange(){


    },

    componentWillMount () {
      GridStore.addChangeListener(this._onChange);
    },

    componentWillUnmount () {
      GridStore.removeChangeListener(this._onChange);
    },

    render() {

      var self = this;

      return (
        <div
          className="comp-grid-tile"
          data-x={self.props.x}
          data-y={self.props.y}>

          <div className="coordinates-info">
            {self.props.x},{self.props.y}
          </div>
        </div>
      )
    }

});


module.exports = GridTile;
