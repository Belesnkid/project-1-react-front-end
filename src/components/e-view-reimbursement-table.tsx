import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "../App";
import ReimbursementRequest from "../dtos/reimbursement-request";
import EViewReimbursementRow from "./e-view-reimbursement-row";


export default function EViewReimbursementTable(props:{empID:string}){
    
    const [list,setList] = useState([]);

    useEffect(() => {
        (async()=>{
            const response = await axios.get(`${url}/reimbursements/employee/${props.empID}`);
            const reimbursements:ReimbursementRequest[] = await response.data;
            setList(reimbursements);
        })()
     
    }, [props.empID])

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
    </>);
}