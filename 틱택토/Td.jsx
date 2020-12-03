import React, { useCallback,useEffect, useRef,memo } from 'react';
import {CLICK_CELL} from './TicTacToe';

const Td = memo( ({rowIndex,cellIndex, dispatch, cellData}) =>{

    const ref = useRef([]);
    useEffecft(()=>{

        ref.current = [rowIndex,cellIndex,dispatch,cellData];
    },[rowIndex,cellIndex,dispatch,cellData])
    const onClickTd = useCallback( () =>{//usecallback 내부를 기억
        console.log(rowIndex,cellIndex);
        if(cellData){//이미 누른 칸인 경우
            return;
        }
        dispatch({type : CLICK_CELL, row: rowIndex, cell: cellIndex});

    }, [cellData]);//cellData가 바뀔때마다 함수를 새로 만든다
    return(
        <td onClick={onClickTd}>{cellData}</td>
    )
});

export default Td;