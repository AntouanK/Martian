
var React           = require('react'),
    Grid            = require('./components/Grid.jsx'),
    InputControls   = require('./components/InputControls.jsx'),
    CreateGridForm  = require('./components/CreateGridForm.jsx'),
    GridStore       = require('./stores/GridStore'),
    targetEle,
    onChange;


//  the element to have React target to
targetEle = document.querySelector('#martian-app');


GridStore.addChangeListener(function(){

  var gridSize = GridStore.getGridSize();

  React.render(
    <div>
      <InputControls />
      <Grid rows={gridSize[0]} columns={gridSize[1]} />
    </div>,
    targetEle
  );

});


//  bootstrap on the target element
React.render(
  <div>
    <CreateGridForm />
  </div>,
  targetEle
);
