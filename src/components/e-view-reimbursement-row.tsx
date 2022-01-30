import ReimbursementRequest from "../dtos/reimbursement-request";

export default function EViewReimbursementRow(props:ReimbursementRequest){
    const {id, amount, pending, approved, empReason} = props;

    return(
        <tr>
            <td>{id}</td>
            <td>{empReason}</td>
            <td>{amount}</td>
            <td>{pending? "Yes": "No"}</td>
            {approved === undefined?
            <td>Pending</td> : <td>{approved? "Approved":"Denied"}</td>}
        </tr>
    );
}