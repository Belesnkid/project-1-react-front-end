import { useEffect, useState } from "react";
import Employee from "../dtos/employee";
import ReimbursementRequest from "../dtos/reimbursement-request";

export default function SystemStatsPage(){
    
    const [employees,setEmployees] = useState<Employee[]>(null);
    const [submittedRequests,setRequests] = useState<ReimbursementRequest[]>([]);

    async function getEmployees(){
        const response = await fetch(`http://localhost:3001/employees`);
        const employees:Employee[] = await response.json()
        setEmployees(employees);
    }

    async function getRequests(){
        const response = await fetch(`http://localhost:3001/reimbursements`);
        const requests:ReimbursementRequest[] = await response.json();
        setRequests(requests);
    }

    useEffect(() => {
        getEmployees();
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
    
    </>)
}