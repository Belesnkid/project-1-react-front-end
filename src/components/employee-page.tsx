import { logout } from "../App";
import EViewReimbursementTable from "./e-view-reimbursement-table";
import ReimbursementForm from "./reimbursement-form";
import './CSS/login.css';

export default function EmployeePage(props:{id:string}){
    
    
    
    return(<>
        <div className='page'>
            <h1>Employee view</h1>
            <button onClick={logout}>Logout</button>
            <EViewReimbursementTable empID={sessionStorage.getItem("ID")}/>
            <ReimbursementForm empId={sessionStorage.getItem("ID")}/>
        </div>
    </>)
}