import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import ReimbursementRequest from "../dtos/reimbursement-request";
import EViewReimbursementRow from "./e-view-reimbursement-row";

export default function EViewReimbursementTable(props:{empID:string}){
    
    const [list,setList] = useState([]);

    const getReimbursements = useCallback(() =>{
        let reimbursements:ReimbursementRequest[] = [];
        axios.get(`http://localhost:3001/reimbursements/employee/${props.empID}`).then(response => {reimbursements = response.data;});
        setList(reimbursements);
    },[]);{
        
    }

    useEffect(() => {
        getReimbursements();
    }, [useCallback(getReimbursements,[])])

    const tableRows = list.map(r => <EViewReimbursementRow key={r.id} {...r}/>);

    return(<>
        <h3>Your Reimbursements Table</h3>
        <table>
            <thead>
                <tr>
                    <th>Request ID</th>
                    <th>Employee ID</th>
                    <th>Amount Requested</th>
                    <th>Pending</th>
                    <th>Approved</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tableRows.length > 0? tableRows :<p>No Requests to Display</p>}
            </tbody>
        </table>
        <button onClick={getReimbursements}>Refresh List</button>
    </>);
}