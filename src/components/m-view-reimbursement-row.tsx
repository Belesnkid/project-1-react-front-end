import { useRef } from "react";
import ReimbursementRequest from "../dtos/reimbursement-request";

export default function MViewReimbursementRow(r:ReimbursementRequest, refresh:Function){
    
    const {employeeId, amount, approved} = r;
    const rid = r.id;
    
    const manReasonInput = useRef(null);

    async function approve(){
        if(!manReasonInput.current.value){
            alert("Please enter a reason.")
        } else {
            let update:ReimbursementRequest = {...r};
            update.manReason = manReasonInput.current.value;
            update.pending = false;
            update.approved = true;
            const response = await fetch('http://localhost:3001/reimbursements', {
                method: 'PATCH',
                body: JSON.stringify(update),
                headers: { 'content-type': 'application/json' }
            });
            alert("Approved, refresh the list to see changes");
            refresh();
        }
    }

    async function deny(){
        if(!manReasonInput.current.value){
            alert("Please enter a reason.")
        } else {
            let update:ReimbursementRequest = {...r};
            update.manReason = manReasonInput.current.value;
            update.pending = false;
            update.approved = true;
            const response = await fetch('http://localhost:3001/reimbursements', {
                method: 'PATCH',
                body: JSON.stringify(update),
                headers: { 'content-type': 'application/json' }
            });
            alert("Denied, refresh the list to see changes");
            refresh();
        }
    }

    return(
        <tr>
            <td>{rid}</td>
            <td>{employeeId}</td>
            <td>{amount}</td>
            <td>{r.empReason? r.empReason: "No Reason Given"}</td>
            <td><input type="text" ref={manReasonInput} id="manReasonInput" placeholder="Reason"></input></td>
            <td><button onClick={() => approve()}>Approve</button>
            <button onClick={() => deny()}>Deny</button></td>
        </tr>
    );
}