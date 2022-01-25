import { useRef } from "react";
import ReimbursementRequest from "../dtos/reimbursement-request";

export default function MViewReimbursementRow(props:ReimbursementRequest){
    
    const {employeeId, amount, approved} = props;
    const rid = props.id;
    
    const manReasonInput = useRef(null);

    async function approve(){
        let update:ReimbursementRequest = {...props};
        update.manReason = manReasonInput.current.value;
        update.pending = false;
        update.approved = true;
        const response = await fetch('http://localhost:3001/reimbursements', {
            method: 'PATCH',
            body: JSON.stringify(update),
            headers: { 'content-type': 'application/json' }
        });
        alert("Approved, refresh the list to see changes")
    }

    async function deny(){
        let update:ReimbursementRequest = {...props};
        update.manReason = manReasonInput.current.value;
        update.pending = false;
        update.approved = true;
        const response = await fetch('http://localhost:3001/reimbursements', {
            method: 'PATCH',
            body: JSON.stringify(update),
            headers: { 'content-type': 'application/json' }
        });
        alert("Denied, refresh the list to see changes")
    }

    return(
        <tr>
            <td>{rid}</td>
            <td>{employeeId}</td>
            <td>{amount}</td>
            <td><input type="text" id="manReasonInput" placeholder="Reason"></input></td>
            <td><button onClick={() => approve()}>Approve</button></td>
            <td><button onClick={() => deny()}>Deny</button></td>
        </tr>
    );
}