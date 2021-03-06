
var React         = require('react'),
    GridStore     = require('../stores/GridStore'),
    assign        = require('object-assign'),
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
        passed: false,
        finish: false,
        orientation: false
      };
    },

    _onChange(){

      var tileState = GridStore.getStateFor(this.props.x, this.props.y),
          newState;

      newState = assign(this.getInitialState(), tileState);

      this.setState( newState );
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


      if(self.state.passed === true){
        styles.backgroundColor = '#87ba67';
      }

      if(self.state.initialPosition === true){
        styles.backgroundColor = '#98d017';
      }

      if(self.state.finish === true){
        styles.backgroundColor = '#79a9a8';

        switch(self.state.orientation){

          case 'N':
            styles.borderTop = '1px solid #10170b';
            break;

          case 'E':
            styles.borderRight = '1px solid #10170b';
            break;

          case 'S':
            styles.borderBottom = '1px solid #10170b';
            break;

          case 'W':
            styles.borderLeft = '1px solid #10170b';
            break;
        }
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
