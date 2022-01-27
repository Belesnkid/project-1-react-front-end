import axios from "axios";
import { useEffect, useState } from "react";
import ReimbursementRequest from "../dtos/reimbursement-request";
import MViewReimbursementRow from "./m-view-reimbursement-row";

export default function MViewReimbursementTable(props:{empID:string}){

    const [list,setList] = useState([]);

    async function getReimbursements(){
        const response = await axios.get('http://localhost:3001/reimbursements/open');
        const reimbursements:ReimbursementRequest[] = await response.data;
        for(let r of reimbursements){
            if(r.employeeId === props.empID){
                reimbursements.splice(reimbursements.indexOf(r),1);
            }
        }
        setList(reimbursements);
    }

    useEffect(() => {
        getReimbursements();
    }, [])

    const tableRows = list.map(r => <MViewReimbursementRow key={r.id} r={r} refresh={getReimbursements}/>);

    return(<>
        <h3>Reimbursements Table</h3>
        <table>
            <thead>
                <tr>
                    <th>Request ID</th>
                    <th>Employee ID</th>
                    <th>Amount Requested</th>
                    <th>Given Reason</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
        <button onClick={() => getReimbursements()}>Refresh List</button>
    </>);
}