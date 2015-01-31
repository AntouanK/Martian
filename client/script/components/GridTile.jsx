
var React = require('react'),
    GridTile;


GridTile = React.createClass({

    propTypes: {
      x:  React.PropTypes.number,
      y:  React.PropTypes.number
    },
    // mixins : [],

    // getInitialState() {},

    // componentWillMount () {},
    // componentWillReceiveProps() {},
    // componentWillUnmount () {},

    // _parseData () {},
    // _onSelect () {},


    render() {

      var self = this;


      return (
        <div className="comp-grid-tile" data-x={self.props.x}  data-y={self.props.y}>
          <div className="coordinates-info">{self.props.x},{self.props.y}</div>
        </div>
      )
    }

});


module.exports = GridTile;
