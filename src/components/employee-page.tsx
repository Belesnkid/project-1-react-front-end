import { logout } from "../App";
import EViewReimbursementTable from "./e-view-reimbursement-table";
import ReimbursementForm from "./reimbursement-form";
import './CSS/appStyles.css';
import { useNavigate, Routes, Route } from "react-router-dom";

export default function EmployeePage(props:{id:string}){
    
    const navigate = useNavigate();
    
    return(<>
        <div className='page'>
            <button onClick={logout}>Logout</button>
            <h1>Employee view</h1>
            <hr></hr>
            <br/>
            <h5>What would you like to do?</h5>
            <br/>
            <button onClick={() => navigate("requests")}>View My Requests</button>
            <button onClick={() => navigate("form")}>Submit a new Request</button>
            <Routes>
                <Route path="requests" element={<EViewReimbursementTable empID={props.id}/>}/>
                <Route path="form" element={<ReimbursementForm empId={props.id}/>}/>
            </Routes>
            {/* <EViewReimbursementTable empID={sessionStorage.getItem("ID")}/>
            <ReimbursementForm empId={sessionStorage.getItem("ID")}/> */}
        </div>
    </>)
}