import { useEffect, useState } from "react";
import Employee from "../dtos/employee";
import MViewEmployeeRow from "./m-view-employee-row";
import axios from "axios";
import { url } from "../App";

export default function MViewEmployeeTable(){

    const [employees,setEmployees] = useState([]);

    async function getEmployees(){
        const response = await axios.get(`${url}/employees`);
        const employees:Employee[] = await response.data;
        setEmployees(employees);
    }

    useEffect(() => {
        getEmployees();
    }, []);

    const tableRows = employees.map(e => <MViewEmployeeRow key={e.id} {...e}/>);
    
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