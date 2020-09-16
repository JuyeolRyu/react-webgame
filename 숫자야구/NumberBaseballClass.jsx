import React, {Component, createRef} from 'react';
import Try from './TryClass';

function getNumbers(){//숫자 4개 뽑기
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for (let i = 0; i < 4; i += 1) {
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}
//화살표 함수 사용하는 이유 () =>{} 안에서 this.로 값에 접근하기 위해서
//위의 함수의 경우 this.를 사용할 일이 없으므로 클래스밖에 선언해준다.


class NumberBaseballClass extends Component{
    state={
        result: '',
        value: '',
        answer: getNumbers(),
        tries: [],
    };

    onSubmitForm =(e)=>{
        e.preventDefault();
        if(this.state.value === this.state.answer.join('')){
            this.setState((prevState) => {
                return{
                    result: '홈런',//this.state.tries.push()로 하면 리액트가 배열 변화를 모름
                    tries: [...prevState.tries,{try:this.state.value,result:'홈런'}],
                }
            });
            alert('게임을 다시 시작합니다');
            this.setState({
                value:'',
                answer: getNumbers(),
                tries: [],
            });
            this.inputRef.current.focus();
        }else{
            const answerArray = this.state.value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(this.state.tries.length >= 9){
                this.setState({
                    result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')}입니다.`,
                })
                alert('게임을 다시 시작합니다');
                this.setState({
                    value:'',
                    answer: getNumbers(),
                    tries: [],
                });
                this.inputRef.current.focus();
            }else{
                for(let i=0;i<4;i+=1){
                    if(answerArray[i] === this.state.answer[i]){
                        strike += 1;
                    }else if(this.state.answer.includes(answerArray[i])){
                        ball+=1;
                    }
                }
                this.setState((prevState) => {
                    return{
                        tries: [...prevState.tries, {try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}],
                        value:'',
                    }
                });
                this.inputRef.current.focus();
            }
        }
    };
    onChangeInput = (e) =>{
        this.setState({
            value: e.target.value,
        })
    };
    
    inputRef = createRef();

    render(){
        const {result,value,tries} = this.state
        return(
            <>
                <h1></h1>
                <h1>{result}</h1>
                <form onSubmit={this.onSubmitForm}>
                    <input ref = {this.inputRef} maxLength = {4} value={value} onChange={this.onChangeInput} />
                </form>
                <div>시도: {tries.length}</div>
                <ul>
                    {tries.map((v,i)=>{
                        return(
                            <Try key={`${i+1}차 시도: `}  tryInfo={v} index={i}/>
                        );
                    })}
                </ul>
            </>
        );
    }
}

export default NumberBaseballClass;