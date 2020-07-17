const React = require('react');
const {Component} = React; //구조분해 문법 {}

class WordRelay extends Component {
    state = {
        word: '코몽',
        value: '',
        result: '',
    }
    onSubmitForm = (e) =>{
        e.preventDefault();
        if(this.state.value[0] === this.state.word[this.state.word.length-1]){
            this.setState(() => {
                return {
                    word: this.state.value,
                    value: '',
                    result: '딩동댕',
                }
            });
            this.input.focus();
        }else{
            this.setState(() =>{
                return {
                    value: '',
                    result: '땡!!',
                }
            });
            this.input.focus();
        }
    };
    onChangeInput = (e) =>{
        this.setState({value: e.target.value})
    };
    input;
    onRefInput = (c) =>{
        this.input = c;
    };
    render(){
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmitForm}>
                    <input ref={this.onRefInput} value={this.state.value} onChange={this.onChangeInput}/>
                    <button>입력</button>
                </form>
                <div>{this.state.result}</div>
            </>
        );
    }
}

module.exports  = WordRelay;