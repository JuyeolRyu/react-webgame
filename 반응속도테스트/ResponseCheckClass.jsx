import React,{Component} from 'react';

class ResponseCheck extends Component{
    state = {
        state : 'waiting',
        message : "클릭해서 시작하세요",
        result : [],
    };

    /*아래 변수들 바뀌어도 렌더링 안됨*/ 
    timeout; //setTimeout을 초기화 시켜주기 위해서 사용한다.
    startTime;
    endTime;

    onClickScreen = () => {
        const {state} = this.state;
        if(state === 'waiting'){
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요.'
            });
            this.timeout = setTimeout(()=>{
                this.setState({
                    state:'now',
                    message:'지금 클릭하세요.',
                });
            },Math.floor(Math.random() * 1000) + 2000);//2~3초 랜덤
            this.startTime = new Date();

        }else if(state === 'ready'){//성급하게 클릭한 경우
            clearTimeout(this.timeout);//timeout 초기화
            this.setState({
                state: 'waiting',
                message: '빨라.',
            });

        }else if(state === 'now'){//반응속도 체크
            this.endTime = new Date();
            this.setState((prevState) => {
                return{
                    state: 'waiting',
                    message: '클릭해서 시작하세요',
                    result:[...prevState.result,this.endTime - this.startTime],
                };
            });
        }
    };

    onReset = () => {
        this.setState({
            result: [],
        });
    };
    renderAverage = () => {
        const {result} = this.state;
        // reduce = 배열의 합계구하는 함수
        return result.length === 0
        ? null 
        : <>
            <div>평균시간 : {result.reduce((a,c) => a + c) / this.state.result.length}ms</div>
            <button onClick={this.onReset}>리셋</button>
        </>
    };

    render(){
        const {state, message} = this.state;
        return(
            <>
                <div
                    id="screen"
                    className={state}
                    onClick = {this.onClickScreen}
                >
                    {message}
                </div>
                {this.renderAverage()}
            </>
        );
    }
}

export default ResponseCheckClass;