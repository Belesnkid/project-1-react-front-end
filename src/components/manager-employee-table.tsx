import { useEffect, useState } from "react";
import Employee from "../dtos/employee";
import EmployeeRow from "./employee-row";
import axios from "axios";
import { logout } from "../App";

export default function ManagerEmployeeTable(props:{user:string}){

    const [employees,setEmployees] = useState([]);

    async function getEmployees(){
        const response = await axios.get('http://localhost:3001/employees');
        const employees:Employee[] = await response.data;
        for(let e of employees){
            if(e.uName === props.user.toString()){
                employees.splice(employees.indexOf(e),1);
            }
        }
        setEmployees(employees);
    }

    useEffect(() => {
        getEmployees();
    }, []);

    const tableRows = employees.map(e => <EmployeeRow key={e.id} {...e}/>);
    
    return(<>
        <h3>Employee Table</h3>
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>ID</th>
                    <th>Manager</th>
                </tr>
            </thead>
            <tbody>
                {tableRows}
            </tbody>
        </table>
        <button onClick={getEmployees}>Refresh List</button>
    </>)
}