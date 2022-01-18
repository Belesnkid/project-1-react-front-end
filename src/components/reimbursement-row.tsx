import ReimbursementRequest from "../dtos/reimbursement-request";

export default function ReimbursementRow(props:ReimbursementRequest){
    const {id, employeeId, amount, pending} = props;

    return(
        <tr>
            <td>{id}</td>
            <td>{employeeId}</td>
            <td>{amount}</td>
            <td>{pending? "Yes": "No"}</td>
            <td><button>Details</button></td>
        </tr>
    )
}