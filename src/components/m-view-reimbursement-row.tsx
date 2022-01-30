import { useRef } from "react";
import { url } from "../App";
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
            await fetch(`${url}/reimbursements`, {
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
            await fetch(`${url}/reimbursements`, {
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
            <td><input className="input" type="text" ref={manReasonInput} id="manReasonInput" placeholder="Reason"></input></td>
            <td><button className="smallbutton" onClick={() => approve()}>Approve</button>
            <button className="smallbutton" onClick={() => deny()}>Deny</button></td>
        </tr>
    );
}