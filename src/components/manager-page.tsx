import { logout } from "../App";
import EViewReimbursementTable from "./e-view-reimbursement-table";
import MViewEmployeeTable from "./m-view-employee-table";
import MViewReimbursementTable from "./m-view-reimbusement-table";
import './CSS/login.css';
import SystemStatsPage from "./system-stats-page";
import ReimbursementForm from "./reimbursement-form";

export default function ManagerPage(props:{id:string, username:string}){
    
    
    
    return(<>
        <div className='page'>
            <button onClick={logout}>Logout</button>
            <h1>Manager view</h1>
            <hr/>
            {/* put my routing in here */}
            <MViewEmployeeTable user={sessionStorage.getItem("username")}/>
            <MViewReimbursementTable empID={sessionStorage.getItem("ID")}/>
            <EViewReimbursementTable empID={sessionStorage.getItem("ID")}/>
            <SystemStatsPage/>
            <ReimbursementForm empId={sessionStorage.getItem("ID")}/>
        </div>
    </>)
}