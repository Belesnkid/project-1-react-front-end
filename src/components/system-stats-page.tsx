import { useEffect, useState } from "react";
import { url } from "../App";
import Employee from "../dtos/employee";
import ReimbursementRequest from "../dtos/reimbursement-request";
import './CSS/appStyles.css';
import MViewEmployeeDetails from "./m-view-employee-details";

export default function SystemStatsPage(){
    
    const [employees,setEmployees] = useState<Employee[]>([]);
    const [submittedRequests,setRequests] = useState<ReimbursementRequest[]>([]);

    async function getEmployees(){
        const response = await fetch(`${url}/employees`);
        const employees:Employee[] = await response.json()
        setEmployees(employees);
    }

    async function getRequests(){
        const response = await fetch(`${url}/reimbursements`);
        const requests:ReimbursementRequest[] = await response.json();
        setRequests(requests);
    }

    useEffect(() => {
        getEmployees();
        getRequests();
    }, []);

    const details = employees.map(e => <MViewEmployeeDetails key={e.id} emp={e} submittedRequests={extractEmpRequests(submittedRequests,e.id)}/>);
    
    return(<>
        <h1>System Data Statistics Page</h1>
        <hr/>

        <p>Total Employees: {totEmployees()}</p>
        <p>Total Requests: {totRequests()}</p>
        <p>Number of currently open requests: {numOpen()}</p>
        <p>Highest Single Expenditure: {highest()}</p>
        <p>System Average Requested Amount: {sysAverage()}</p>
        <p>System Median Requested Amount: {sysMedian()}</p>

        <hr/>
        <h3>Details by Employee</h3>
        {details}
    </>)

    function extractEmpRequests(requests:ReimbursementRequest[], eID:string):ReimbursementRequest[]{
        let temp:ReimbursementRequest[] = [];
        for(let r of requests){
            if(r.employeeId === eID){
                temp.push(r);
            }
        }
        return temp;
    }

    function sortArr(arr:ReimbursementRequest[]):ReimbursementRequest[]{
        let myArr = arr;
        myArr.sort(function(a,b){
            return a.amount - b.amount;
        })
        return myArr;
    }

    function numOpen():number{
        let open = 0;
        for (let r of submittedRequests){
            if(r.pending){
                open++;
            }
        }
        return open;
    }

    function highest():number{
        let amt = 0;
        for (let r of submittedRequests){
            if(r.amount > amt){
                amt = r.amount;
            }
        }
        return amt;
    }

    function sysAverage():number{
        if(submittedRequests.length > 0){
            let sum = 0;
            for(let r of submittedRequests){
                sum += r.amount;
            }
            return Number.parseFloat((sum/submittedRequests.length).toFixed(2));}
    }

    function sysMedian():number{
        if (submittedRequests.length > 0){
            const sorted = sortArr(submittedRequests);
            if(sorted.length % 2 === 1){
                return sorted[Math.floor(sorted.length/2)].amount;
            }
            else{
                const rightIndex = Math.floor(sorted.length/2);
                return ((sorted[rightIndex].amount + sorted[rightIndex-1].amount) / 2)
            }}
    }

    function totRequests(){
        return submittedRequests.length;
    }

    function totEmployees(){
        return employees.length;
    }
}