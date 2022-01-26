import { logout } from "../App";
import EViewReimbursementTable from "./e-view-reimbursement-table";
import MViewEmployeeTable from "./m-view-employee-table";
import MViewReimbursementTable from "./m-view-reimbusement-table";
import './CSS/login.css';
import SystemStatsPage from "./system-stats-page";
import ReimbursementForm from "./reimbursement-form";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";

export default function ManagerPage(props:{id:string, username:string}){
    
    const navigate = useNavigate();
    
    return(<>
        <div className='page'>
            <button onClick={logout}>Logout</button>
            <h1>Manager view</h1>
            <hr/>
            <h5>What Do you want to do?</h5>
            <button onClick={() => navigate("employees")}>View Employees</button>
            <button onClick={() => navigate("myRequests")}>View My Requests</button>
            <button onClick={() => navigate("review")}>Review Requests</button>
            <button onClick={() => navigate("create")}>Submit a new Request</button>
            <button onClick={() => navigate("stats")}>System Statistics</button>
            <Routes>
                <Route path={"employees"} element={<MViewEmployeeTable/>}/>
                <Route path={"myRequests"} element={<EViewReimbursementTable empID={props.id}/>}/>
                <Route path={"review"} element={<MViewReimbursementTable empID={props.id}/>}/>
                <Route path={"create"} element={<ReimbursementForm empId={props.id}/>}/>
                <Route path={"stats"} element={<SystemStatsPage/>}/>
            </Routes>
        </div>
    </>)
}