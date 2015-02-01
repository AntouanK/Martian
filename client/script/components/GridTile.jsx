
var React = require('react'),
    GridStore = require('../stores/GridStore'),
    GridTile;


GridTile = React.createClass({

    propTypes: {
      x:  React.PropTypes.number,
      y:  React.PropTypes.number
    },

    getInitialState() {
      return {
        text: '',
        initialPosition: false,
        passed: false
      };
    },

    _onChange(){

      var tileState = GridStore.getStateFor(this.props.x, this.props.y);

      if(tileState !== undefined){
        this.setState(tileState);
      } else {
        this.setState( this.getInitialState() );
      }
    },

    componentWillMount () {
      GridStore.addChangeListener(this._onChange);
    },

    componentWillUnmount () {
      GridStore.removeChangeListener(this._onChange);
    },

    render() {

      var self = this,
          styles = {};

      if(self.state.initialPosition === true){
        styles.backgroundColor = 'green';
      }

      if(self.state.passed === true){
        styles.backgroundColor = 'yellow';
      }

      return (
        <div
          className="comp-grid-tile"
          style={styles}
          data-x={self.props.x}
          data-y={self.props.y}>
          {self.state.text}

          <div className="coordinates-info">
            {self.props.x},{self.props.y}
          </div>
        </div>
      )
    }

});


module.exports = GridTile;
