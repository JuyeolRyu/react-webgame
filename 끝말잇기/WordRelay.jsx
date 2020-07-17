const React = require('react');
const {useState, useRef} = React; //구조분해 문법 {}


const WordRelay = () =>{
    const [word, setWord] = useState('코몽');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmitForm = (e) =>{
        e.preventDefault();
        if(value[0] === word[word.length-1]){
            setResult('딩동댕');
            setWord(value);
            setValue('');
            
            inputRef.current.focus();
        }else{
            setResult('땡!!');
            setValue('');

            inputRef.current.focus();
        }
    };
    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmitForm}>
                <input ref={inputRef} value={value} onChange={onChangeInput}/>
                <button>입력</button>
            </form>
            <div>{result}</div>
        </>
    );
}

module.exports  = WordRelay;