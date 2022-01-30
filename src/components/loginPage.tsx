import { useRef } from "react";
import { url } from "../App";
import Employee from "../dtos/employee";
import './CSS/appStyles.css';

export default function LoginPage(props: { updateUser: Function }) {

    const uNameInput = useRef(null);
    const passInput = useRef(null);

    async function login() {
        const loginPayloadInfo = {
            username: uNameInput.current.value,
            pass: passInput.current.value
        };

        const response = await fetch(`${url}/login`, {
            method: 'PATCH',
            body: JSON.stringify(loginPayloadInfo),
            headers: { 'content-type': 'application/json',
                        'Accept': 'application/json' }
        });

        const employee: Employee = await response.json();

        if (!employee.id) {
            alert("Login Failed\nUsername or Password do not match.");
        } else {
            props.updateUser({ username: employee.uName, id: employee.id, isManager: employee.isManager });
            sessionStorage.setItem("username", employee.uName);
            sessionStorage.setItem("ID", employee.id);
            sessionStorage.setItem("isManager", String(employee.isManager));
        }
    }

    return (
        <>
            <div className="page">
                <h1>XYZ Company Reimbursement System</h1>
                <h2>Login Page</h2>
                <div className="field">
                    <label htmlFor="uNameInput">Username </label>
                    <input className="input" type="text" id="uNameInput" placeholder="Username" ref={uNameInput} />
                </div>
                <div className="field">
                    <label htmlFor="passInput">Password </label>
                    <input className="input" type="password" id="passInput" placeholder="Password" ref={passInput} />
                </div>
                <button className="button" onClick={login}>Login</button>
            </div>
        </>)
}