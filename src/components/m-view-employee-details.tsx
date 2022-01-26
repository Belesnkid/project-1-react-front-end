import { useEffect, useState } from "react";
import Employee from "../dtos/employee";
import ReimbursementRequest from "../dtos/reimbursement-request";

export default function MViewEmployeeDetails(props:{empId:string}){
    
    const [employee,setEmployee] = useState<Employee>(null);
    const [submittedRequests,setRequests] = useState<ReimbursementRequest[]>([]);

    async function getEmployee(){
        const response = await fetch(`http://localhost:3001/employees/${props.empId}`);
        const employee:Employee = await response.json()
        setEmployee(employee);
    }

    async function getRequests(){
        const response = await fetch(`http://localhost:3001/reimbursements/employee/${props.empId}`);
        const requests:ReimbursementRequest[] = await response.json();
        setRequests(requests);
    }

    useEffect(() => {
        getEmployee();
        getRequests();
    }, []);

    function numOpen(){
        let open = 0;
        for (let r of submittedRequests){
            if(r.pending){
                open++;
            }
        }
        return open;
    }

    function highest(){
        let amt = 0;
        for (let r of submittedRequests){
            if(r.amount > amt){
                amt = r.amount;
            }
        }
        return amt;
    }

    function average(){
        let sum = 0;
        for(let r of submittedRequests){
            sum += r.amount;
        }
        return (sum/submittedRequests.length);
    }
    
    return(<>
        {!employee? <h1>Loading...</h1>
        : <>
            <h3>Details for {employee.fName} {employee.lName}</h3>
            <p>ID: {employee.id}</p>
            <p>Total Requests: {submittedRequests.length}</p>
            <p>Total Open Requests: {numOpen()}</p>
            <p>Highest Expenditure: {highest()}</p>
            <p>Average expenditure: {average()}</p>
        </>
        }
    </>)
}