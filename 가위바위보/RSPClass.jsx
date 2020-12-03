import React,{Component} from 'react';

const rspCoords = {
    바위: '0',
    가위: '-200px',
    보: '-415px'
}

const scores={
    바위: 0,
    가위: 1,
    보: -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord;
    })[0];
};

class RSP extends Component{
    state = {
        result: '',
        imgCoord: rspCoords.바위,
        score: 0,
    };

    interval;
    //처음 렌더링이 성공적으로 실행되면 componentDidMount 가 실행 됨
    componentDidMount(){
        //이미지 1초마다 돌리기
        this.interval = setInterval(this.changeHand,100);
    }
    //컴포넌트가 제거 되기전 실행
    componentWillUnmount(){
        clearInterval(this.interval);
    }

    changeHand = () =>{
        const {imgCoord} = this.state;

        if(imgCoord === rspCoords.바위){
            this.setState({
                imgCoord : rspCoords.가위
            });
        }else if(imgCoord === rspCoords.가위){
            this.setState({
                imgCoord : rspCoords.보
            });
        }else if(imgCoord === rspCoords.보){
            this.setState({
                imgCoord : rspCoords.바위
            });
        }
    }
    onClickBtn = (choice) =>{
        const {imgCoord} = this.state;
        //하던거 멈추고
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        //점수계산
        if(diff === 0){
            this.setState({
                result:'비겼습니다.',
            });
        }else if([-1,2].includes(diff)){
            this.setState((prevState) => {
                return{
                    result:'이겼습니다.',
                    score: prevState.score + 1,
                };
            });
        }else{
            this.setState((prevState) => {
                return{
                    result:'졌습니다.',
                    score: prevState.score - 1,
                };
            });
        }
        setTimeout(()=>{
            this.interval = setInterval(this.changeHand,100);
        },2000);
    };
    render(){
        const {result,score,imgCoord} = this.state;
        return(
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                {/* <div id="computer" style={{background: `url(.\가위바위보.png) ${imgCoord} 0`}} /> */}
                <div>
                    <button id="rock" className="btn" onClick={()=> this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={()=> this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={()=> this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현제 {score}점</div>
            </>
        );
    }
}

export default RSP;