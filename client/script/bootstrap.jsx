
var React         = require('react'),
    Grid          = require('./components/Grid.jsx'),
    InputControls = require('./components/InputControls.jsx'),
    targetEle;


//  the element to have React target to
targetEle = document.querySelector('#martian-app');


//  bootstrap on the  target element
React.render(
  <div>
    <InputControls />
    <Grid rows={5} columns={7} />
  </div>,
  targetEle
);
