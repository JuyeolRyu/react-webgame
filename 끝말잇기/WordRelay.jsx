const React = require('react');
const {Component} = React; //구조분해 문법 {}

class WordRelay extends Component{
    state = {
        text: 'hello webpack',
    }

    render(){
        return <h1>{this.state.text}</h1>;
    }
}

module.exports  = WordRelay;