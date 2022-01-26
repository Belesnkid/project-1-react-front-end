import { useRef } from "react";
import ReimbursementRequest from "../dtos/reimbursement-request";

export default function MViewReimbursementRow(props:ReimbursementRequest){
    
    const {employeeId, amount, approved} = props;
    const rid = props.id;

    return(
        <tr>
            <td>{rid}</td>
            <td>{employeeId}</td>
            <td>{amount}</td>
            {approved? <td>Approved</td>: <td>Denied</td>}
            <td><button>Details</button></td>
        </tr>
    );
}