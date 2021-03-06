import { logout } from "../App";
import EViewReimbursementTable from "./e-view-reimbursement-table";
import MViewEmployeeTable from "./m-view-employee-table";
import MViewReimbursementTable from "./m-view-reimbusement-table";
import './CSS/appStyles.css';
import SystemStatsPage from "./system-stats-page";
import ReimbursementForm from "./reimbursement-form";
import { Routes, Route, useNavigate } from "react-router-dom";

export default function ManagerPage(props:{id:string}){
    
    const navigate = useNavigate();
    
    return(<>
        <div className='page'>
            <button className="logoutButton" onClick={logout}>Logout</button>
            <h1>Manager view</h1>
            <h3>Welcome {sessionStorage.getItem("username")}</h3>
            <div className="field">
                <button className="button" onClick={() => navigate("employees")}>View Employees</button>
                <button className="button" onClick={() => navigate("myRequests")}>View My Requests</button>
                <button className="button" onClick={() => navigate("review")}>Review Requests</button>
                <button className="button" onClick={() => navigate("create")}>Submit a new Request</button>
                <button className="button" onClick={() => navigate("stats")}>System Statistics</button>
            </div>
            
            <Routes>
                <Route path={"employees"} element={<MViewEmployeeTable/>}/>
                <Route path={"myRequests"} element={<EViewReimbursementTable empID={props.id}/>}/>
                <Route path={"review"} element={<MViewReimbursementTable/>}/>
                <Route path={"create"} element={<ReimbursementForm empId={props.id}/>}/>
                <Route path={"stats"} element={<SystemStatsPage/>}/>
            </Routes>
        </div>
    </>)
}