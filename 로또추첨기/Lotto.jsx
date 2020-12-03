import React,{useState,useRef,useEffect,useMemo,useCallback}from 'react';
import Ball from './Ball';

function getWinNumbers(){
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v,i) => i+1);
  const shuffle=[];
  while(candidate.length>0){
      shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length),1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length-1];
  const winNumbers = shuffle.slice(0,6).sort((p,c) => p-c);
  return [...winNumbers,bonusNumber];
}

const Lotto = () =>{
  /* Hooks는 계속 실행 되기 때문에 getWinNumbers가 계속 실행됨
     그래서 useMemo를 사용해서 값을 기억해둔다.
     useMemo의 두번째 인자가 바뀌어야지만 다시실행되게 된다. 비워두면 다시실행X
     useMemo ==> 함수의 리턴값을 기억
  */
  const lottoNumbers = useMemo(()=> getWinNumbers(),[])
  const [winNumbers,setWinNumbers] = useState(lottoNumbers);
  const [winBalls,setWinBalls] = useState([]);
  const [bonus,setBonus] = useState(null);
  const [redo,setRedo] = useState(false);
  const timeouts = useRef([]);

  /* useCallback ==> 함수 자체를 기억한다.
     함수 생성에 실행이 오래 걸리는 경우 사용한다.
     따라서 winNumbers 를 출력해보면 첫번째 winNumbers만 계속 기억하게됨
     두번째 인자에 어떨때 다시 실행할지 결정할 변수를 넣어준다.
  */
  const onClickRedo = useCallback(() =>{
    console.log('onClickRedo');
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  },[winNumbers]);

  
  useEffect(() =>{
    console.log('useEffect');
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {//timeouts 의 요소가 바뀌는 거라 useEffect 영향이 없다
        setWinBalls((prevBalls) => [...prevBalls,winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);

    return () =>{
      timeouts.current.forEach((v)=>{
        clearTimeout(v);
      })
    }
  },[timeouts.current]);
  /* 배열에 요소가 있어도 componentDidMount && componentDidUpdate 둘다 기능 수행한다. */

  return(
    <>
      <div>당첨숫자</div>
      <div id="결과창">
          {winBalls.map((v) => <Ball key={v} number={v} />)}
      </div>
      <div>보너스</div>
      {bonus && <Ball number={bonus} onClick = {onClickRedo} />}
      {redo && <button onClick={onClickRedo}>한번더!</button>}
    </>
  );
}

export default Lotto;