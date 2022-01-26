import { useState } from "react";
import ReimbursementRequest from "../dtos/reimbursement-request";

export default function MViewReimbursementDetails(props:{request:ReimbursementRequest}){

    const [request,setRequest] = useState(props.request);
    
    async function approve(){
        // let update:ReimbursementRequest = {...props};
        // update.manReason = manReasonInput.current.value;
        // update.pending = false;
        // update.approved = true;
        // const response = await fetch('http://localhost:3001/reimbursements', {
        //     method: 'PATCH',
        //     body: JSON.stringify(update),
        //     headers: { 'content-type': 'application/json' }
        // });
        alert("Approved")
    }

    async function deny(){
        // let update:ReimbursementRequest = {...props};
        // update.manReason = manReasonInput.current.value;
        // update.pending = false;
        // update.approved = true;
        // const response = await fetch('http://localhost:3001/reimbursements', {
        //     method: 'PATCH',
        //     body: JSON.stringify(update),
        //     headers: { 'content-type': 'application/json' }
        // });
        alert("Denied")
    }
    
    return (<>
        <h1>Request Details</h1>
        <hr/>
        <h3>Request ID: {props.request.id}</h3>
        <h3>Requested by: {props.request.employeeId}</h3>
        <br/>
        <p>Amount Requested: {props.request.amount}</p>
        <p>Reason for request: {props.request.empReason ?? 'No reason given'}</p>
        {props.request.pending? 
        <>
            <input type="text" id="reasonInput" placeholder="My Reason"></input>
            <button onClick={() => approve()}>Approve</button> 
            <button onClick={() => deny()}>Deny</button>
        </> 
        : props.request.approved? <p>Approved</p> : <p>Denied</p>}
    </>)
}