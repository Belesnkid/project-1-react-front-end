import { useRef } from "react";
import Employee from "../dtos/employee";
import './CSS/login.css';

export default function LoginPage(props: { updateUser: Function }) {

    const uNameInput = useRef(null);
    const passInput = useRef(null);

    async function login() {
        const loginPayloadInfo = {
            username: uNameInput.current.value,
            pass: passInput.current.value
        };

        const response = await fetch('http://localhost:3001/login', {
            method: 'PATCH',
            body: JSON.stringify(loginPayloadInfo),
            headers: { 'content-type': 'application/json' }
        });

        const employee: Employee = await response.json();

        if (!employee) {
            alert("Login Failed");
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
                <h1>Login Page</h1>
            </div>
            <div className="page">
                <label htmlFor="uNameInput">Username</label>
                <input type="text" id="uNameInput" placeholder="Username" ref={uNameInput} />
            </div>
            <div className="page">
                <label htmlFor="passInput">Password</label>
                <input type="password" id="passInput" ref={passInput} />
            </div>
            <div className="page">
            <button onClick={login}>Login</button>
            </div>
        </>)
}