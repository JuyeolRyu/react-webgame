const React = require('react');
const {useState, useRef} = React;

const GuguDan = () =>{//함수 기능에 state와 ref를 추가한것이 hooks
    //React.useState() 로 상태를 사용한다.
    const [first, setFirst] = useState(Math.ceil(Math.random()*9));
    const [second, setSecond] = useState(Math.ceil(Math.random()*9));
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmit = (e) =>{
        e.preventDefault();
        if(parseInt(value) === first * second){
            setResult((prevResult) => {
                return '정답 : '+ value;
            });
            setFirst(Math.ceil(Math.random()*9));
            setSecond(Math.ceil(Math.random()*9));
            setValue('');
            inputRef.current.focus(); //hooks에서는 ref에 접근할때 current사용
        }else{
            setResult('땡!!');
            setValue('');
            inputRef.current.focus();
        }
    }
    const onChange = (e) =>{
        setValue(e.target.value);
    };

    console.log('렌더링');
    return (
        <>
            <div>{first} 곱하기 {second}는?</div>
            <form onSubmit = {onSubmit}>
                <input ref = {inputRef} type='number' value={value} onChange = {onChange}/>
                <button>입력!</button>
            </form>
            <div>{result}</div>
        </>
    );
};

module.exports = GuguDan;