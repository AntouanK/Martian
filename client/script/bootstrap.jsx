
var React     = require('react'),
    Grid      = require('./components/Grid.jsx'),
    targetEle;


//  the element to have React target to
targetEle = document.querySelector('#martian-app');


React.render(
  <Grid />,
  targetEle
);

console.log(React);
