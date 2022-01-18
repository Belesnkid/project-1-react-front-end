import axios from "axios";
import { useEffect, useState } from "react";
import ReimbursementRequest from "../dtos/reimbursement-request";
import ReimbursementRow from "./reimbursement-row";

export default function ReimbursementTable(){

    // const initialRows:ReimbursementRequest[] = [
    //     {id:"101", employeeId:"103", amount:10, pending:false},
    //     {id:"102", employeeId:"101", amount:1000, pending:true},
    //     {id:"103", employeeId:"102", amount:1000000, pending:true}
    // ];

    const [list,setList] = useState([]);

    function logout(){
        sessionStorage.clear();
        window.location.reload();
    }

    async function getReimbursements(){
        const response = await axios.get('http://localhost:3001/reimbursements');
        const reimbursements:ReimbursementRequest[] = await response.data;
        setList(reimbursements);
    }

    useEffect(() => {
        getReimbursements();
    }, [])

    const tableRows = list.map(r => <ReimbursementRow key={r.id} {...r}/>);

    return(<>
        <button onClick={logout}>Logout</button>
        <h3>Reimbursements Table</h3>
        <table>
            <thead>
                <tr>
                    <th>Request ID</th>
                    <th>Employee ID</th>
                    <th>Amount Requested</th>
                    <th>Pending</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
        <button onClick={getReimbursements}>Refresh List</button>
    </>);
}