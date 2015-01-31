
var React = require('react'),
    Grid;


Grid = React.createClass({

    propTypes: {
      rows:     React.PropTypes.number,
      columns:  React.PropTypes.number
    },
    // mixins : [],

    // getInitialState: function() {},
    // getDefaultProps: function() {},

    // componentWillMount : function() {},
    // componentWillReceiveProps: function() {},
    // componentWillUnmount : function() {},

    // _parseData : function() {},
    // _onSelect : function() {},

    render : function() {

      return (
        <div className="comp-grid">
        </div>
      )
    }

});


module.exports = Grid;
