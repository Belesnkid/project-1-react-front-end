import Employee from "../dtos/employee";

export default function EmployeeRow(props:Employee){
    const {id, fName, lName, isManager} = props;

    return(
        <tr>
            <td>{fName}</td>
            <td>{lName}</td>
            <td>{id}</td>
            <td>{isManager? "Yes": "No"}</td>
        </tr>);
}