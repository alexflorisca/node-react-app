let React =                 require('react'),
    ReactDOM =              require('react-dom');

class SampleComponent extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (<p className="title">Node App</p>);
    }
}

module.exports = SampleComponent;