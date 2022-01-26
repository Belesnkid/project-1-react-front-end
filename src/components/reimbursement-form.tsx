import { useRef } from "react"

export default function ReimbursementForm(props:{empId:string}){

    const amountInput = useRef(null);
    const reasonInput = useRef(null);
    
    //method not tested yet
    async function validateAndSubmit(){
        if(amountInput.current.value === '' || reasonInput.current.value === ''){
            alert('One or more fields were left empty.')
        }
        else{
            const payload = {
                id: "",
                employeeId: props.empId,
                amount: amountInput.current.value,
                empReason: reasonInput.current.value,
                pending: true
            }
            const response = await fetch('http://localhost:3001/reimbursements',{
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
            <p>Employee ID: {props.empId}</p>
            <label htmlFor="amountInput">Amount:</label>
            <input type="number" id="amountInput" placeholder="10"/>
            <label htmlFor="reasonInput">Reason:</label>
            <input type="text" id="reasonInput" placeholder="Office Supplies"/>
            <button onClick={validateAndSubmit}>Submit Request</button>
        </div>
    </>)
}