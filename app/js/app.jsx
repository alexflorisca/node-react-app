'use strict';

let React =                 require('react'),
    ReactDOM =              require('react-dom'),
    SampleComponent =       require('./components/SampleComponent.jsx');


ReactDOM.render(
    <SampleComponent />,
    document.getElementById("app")
);