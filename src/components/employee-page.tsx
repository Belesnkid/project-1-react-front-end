import { logout } from "../App";
import EViewReimbursementTable from "./e-view-reimbursement-table";
import ReimbursementForm from "./reimbursement-form";
import './CSS/appStyles.css';
import { useNavigate, Routes, Route } from "react-router-dom";

export default function EmployeePage(props:{id:string}){
    
    const navigate = useNavigate();
    
    return(<>
        <div className='page'>
            <button className="logoutButton" onClick={logout}>Logout</button>
            <h1>Employee view</h1>
            <div className="field">
            <button className="button" onClick={() => navigate("requests")}>View My Requests</button>
            <button className="button" onClick={() => navigate("form")}>Submit a new Request</button>
            </div>

            <Routes>
                <Route path="requests" element={<EViewReimbursementTable empID={props.id}/>}/>
                <Route path="form" element={<ReimbursementForm empId={props.id}/>}/>
            </Routes>
        </div>
    </>)
}