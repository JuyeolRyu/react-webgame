import React, { useEffect ,useReducer, useRef, useCallback} from 'react';
import Table from './Table';

const initialState = {
    winner:'',
    turn:'o',
    tableData: [['','',''],['','',''],['','','']],
    recentCell:[-1,-1],
}//초기 state

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state,action) =>{
    switch(action.Type){
        case SET_WINNER:
            return{
                ...state,
                winner: action.winner,
            };
        case CLICK_CELL:{
            const tableData = [...state.tableData];
            tableData[action.row] = [...tableData[action.row]];
            tableData[action.row][action.cell] = state.turn;
            return{
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            };
        }
        case CHANGE_TURN:{
            return{
                ...state,
                turn: state.turn === 'o' ? 'x':'o',
            };
        }
        case RESET_GAME:{
            return{
                ...state,
                turn:'o',
                tableData: [['','',''],['','',''],['','','']],
                recentCell:[-1,-1],
            };
        }
        default:
            return state;
    }
}//action 했을 경우 할 일들을 정의

const TicTacToe = () =>{
    const [state,dispatch] = useReducer(reducer,initialState);
    const {tableData, turn} = state;
    // const [winner,setWinner] = useState('');
    // const [turn,setTurn] = useState('');
    // const [tableData,setTableData] = useState([['','',''],['','',''],['','','']]);

    const onClickTable = useCallback(()=>{
        dispatch({type:SET_WINNER , winner:'o'})
    },[]);

    useEffect(()=>{
        const [row,cell] = recentCell;

        if (row <0){
            return;
        }
        let win = false;

        if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn){
            win = true;
        }
        if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn){
            win = true;
        }
        if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn){
            win = true;
        }
        if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn){
            win = true;
        }

        if(win){//승리시
            dispatch({type: SET_WINNER, winner:turn});
        }else{//무승부시
            let all = true; //all === true 이면 무승부
            tableData.forEach((row)=>{
                row.forEach((cell)=>{
                    if(!cell){
                        all=false;
                    }
                });
            });

            if(all){
                dispatch({type : RESET_GAME });
            }else{
                dispatch({type : CHANGE_TURN });
            }
        }
    },[recentCell]);

    return(
        <>
            <Table onClick={onClickTable} tableData={tableData} dispatch = {dispatch}/>
            {winner && <div>{winner}님의 승리</div>}
        </>
    )
};

export default TicTacToe;