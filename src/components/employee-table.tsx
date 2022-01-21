import { useEffect, useState } from "react";
import Employee from "../dtos/employee";
import EmployeeRow from "./employee-row";
import axios from "axios";
import { logout } from "../App";

export default function EmployeeTable(){

    const [employees,setEmployees] = useState([]);

    async function getEmployees(){
        const response = await axios.get('http://localhost:3001/employees');
        const employees:Employee[] = await response.data;
        setEmployees(employees);
    }

    useEffect(() => {
        getEmployees();
    }, []);

    const tableRows = employees.map(e => <EmployeeRow key={e.id} {...e}/>);
    
    return(<>
        <button onClick={logout}>Logout</button>
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