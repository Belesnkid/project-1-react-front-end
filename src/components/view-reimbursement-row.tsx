import ReimbursementRequest from "../dtos/reimbursement-request";

export default function ViewReimbursementRow(props:ReimbursementRequest){
    const {id, employeeId, amount, pending, approved} = props;

    return(
        <tr>
            <td>{id}</td>
            <td>{employeeId}</td>
            <td>{amount}</td>
            <td>{pending? "Yes": "No"}</td>
            {approved === undefined?
            <td>Pending</td> : <td>{approved? "Approved":"Denied"}</td>}
            <td><button>Details</button></td>
        </tr>
    );
}