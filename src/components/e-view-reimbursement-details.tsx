import { useEffect, useState } from "react";
import ReimbursementRequest from "../dtos/reimbursement-request";

export default function EViewReimbursementDetails(props:{rId:string}){
    
    const [request,setRequest] = useState<ReimbursementRequest>(null);

    async function getRequest(){
        const response = await fetch(`http://localhost:3001/reimbursements/${props.rId}`);
        const request:ReimbursementRequest = await response.json();
        setRequest(request);
    }

    useEffect(() => {
        getRequest();
    }, [])
    
    return(<>
        {!request? 
            <h1>Loading...</h1> 
            :<>
                <h1>Details of request: {props.rId}</h1>
                <hr/>
                <br/>
                <p>Amount Requested: ${request.amount}</p>
                {request.empReason? <p>Reason for request: {request.empReason}</p>:<></>}
                <p>Status:</p>
                {request.pending? <p>Pending</p>:
                request.approved? <p>Approved!</p> : <p>Denied</p>}
                {request.manReason?
                <p>Reason for Descision: {request.manReason}</p>: <></>}
            </>
        }
        </>)
}