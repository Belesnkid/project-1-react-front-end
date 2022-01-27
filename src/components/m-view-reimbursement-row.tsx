import { useRef } from "react";
import ReimbursementRequest from "../dtos/reimbursement-request";

export default function MViewReimbursementRow(props:{r:ReimbursementRequest, refresh:Function}){
    
    const request:ReimbursementRequest = props.r;
    const rid = request.id;
    const refresh = props.refresh;
    
    const manReasonInput = useRef(null);

    async function approve(){
        if(!manReasonInput.current.value){
            alert("Please enter a reason.")
        } else {
            let update:ReimbursementRequest = {...request};
            update.manReason = manReasonInput.current.value;
            update.pending = false;
            update.approved = true;
            const response = await fetch('http://localhost:3001/reimbursements', {
                method: 'PATCH',
                body: JSON.stringify(update),
                headers: { 'content-type': 'application/json' }
            });
            alert("Request Successfully Approved!\nrefresh the list to see changes");
            refresh();
        }
    }

    async function deny(){
        if(!manReasonInput.current.value){
            alert("Please enter a reason.")
        } else {
            let update:ReimbursementRequest = {...request};
            update.manReason = manReasonInput.current.value;
            update.pending = false;
            update.approved = false;
            const response = await fetch('http://localhost:3001/reimbursements', {
                method: 'PATCH',
                body: JSON.stringify(update),
                headers: { 'content-type': 'application/json' }
            });
            alert("Request Successfully Denied!\nrefresh the list to see changes");
            refresh();
        }
    }

    return(
        <tr>
            <td>{rid}</td>
            <td>{request.employeeId}</td>
            <td>{request.amount}</td>
            <td>{request.empReason? request.empReason: "No Reason Given"}</td>
            <td><input type="text" ref={manReasonInput} id="manReasonInput" placeholder="Reason"></input></td>
            <td><button onClick={() => approve()}>Approve</button>
            <button onClick={() => deny()}>Deny</button></td>
        </tr>
    );
}