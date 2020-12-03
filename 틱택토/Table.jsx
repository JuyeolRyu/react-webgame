import React,{memo} from 'react';
import Tr from './Tr';

const Table = memo( ({tableData,dispatch}) =>{
    return(
        <Table>
            {Array(tableData.length).fill().map((tr,i) => (
                <Tr key={i} rowIndex={i} rowData={tableData[i]} dispatch = {dispatch}/>
            ))};
        </Table>
    );
});

export default Table;