import React,{useRef, useState,useEffect} from 'react';

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

const RSP = () => {
    const [result,setResult] = useState('');
    const [imgCoord,setImgCoord] = useState(rspCoords.바위);
    const [score,setScore] = useState(0);
    const interval = useRef();

    useEffect(()=>{//componentDidMount,Update와 비슷한 역할을 한다.
        interval.current = setInterval(changeHand, 100)
        return() =>{//componentWillUnmount 역할
            clearInterval(interval.current);
        }
    },[imgCoord]);//imgCoord가 바뀌면 실행
    const changeHand = () =>{
        if(imgCoord === rspCoords.바위){
            setImgCoord(rspCoords.가위);
        }else if(imgCoord === rspCoords.가위){
            setImgCoord(rspCoords.보);
        }else if(imgCoord === rspCoords.보){
            setImgCoord(rspCoords.바위);
        }
    }

    const onClickBtn = (choice) =>{
        clearInterval(interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        //점수계산
        if(diff === 0){
            setResult('비겼습니다.');
        }else if([-1,2].includes(diff)){
            setResult('이겼습니다.');
            setScore((prevScore) => prevScore + 1)
        }else{
            setResult('졌습니다.');
            setScore((prevScore) => prevScore - 1);
        }
        setTimeout(()=>{
            interval.current = setInterval(changeHand,100);
        },2000);
    };

    return(
        <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            {/* <div id="computer" style={{background: `url(.\가위바위보.png) ${imgCoord} 0`}} /> */}
            <div>
                <button id="rock" className="btn" onClick={()=> onClickBtn('바위')}>바위</button>
                <button id="scissor" className="btn" onClick={()=> onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={()=> onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현제 {score}점</div>
        </>
    );
}


export default RSP;