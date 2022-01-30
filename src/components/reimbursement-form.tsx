import { useRef } from "react"
import { url } from "../App";

export default function ReimbursementForm(props:{empId:string}){

    const amountInput = useRef(null);
    const reasonInput = useRef(null);
    
    //method not tested yet
    async function validateAndSubmit(){
        if(amountInput.current.value === '' || reasonInput.current.value === '' || Number(amountInput.current.value) < 1){
            alert('Errors in form.')
        }
        else{
            const payload = {
                id: "",
                employeeId: props.empId,
                amount: Number.parseInt(amountInput.current.value),
                empReason: reasonInput.current.value,
                pending: true
            }
            const response = await fetch(`${url}/reimbursements`,{
                method:'POST',
                body: JSON.stringify(payload),
                headers: { 'content-type': 'application/json' }
            });
            if(response.status === 201){
                alert("Request Created Successfully");
                amountInput.current.value = '';
                reasonInput.current.value = '';
            }
            else{
                alert(`Something went wrong, Status code recieved ${response.status}`);
            }
        }
    }
    
    return(<>
        <div>
            <h1>Reimbursement Request Submission Form</h1>
            <hr/>
                <div className="page">
                <p>Employee ID: {props.empId}</p>
            </div>
            <div className="field">
                <label htmlFor="amountInput">Amount:</label>
                <input className="input" type="number" ref={amountInput} id="amountInput" min={1} placeholder="10"/>
            </div>
            <div className="field">
                <label htmlFor="reasonInput">Reason:</label>
                <input className="input" type="text" ref={reasonInput} id="reasonInput" placeholder="Office Supplies"/>
            </div>
            <div className="field">
                <button className="smallbutton" onClick={validateAndSubmit}>Submit Request</button>
            </div>
        </div>
    </>)
}