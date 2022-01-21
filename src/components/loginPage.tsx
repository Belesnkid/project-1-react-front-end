import axios from "axios";
import { json } from "express";
import { useRef } from "react";
import Employee from "../dtos/employee";

export default function LoginPage(props: { updateUser: Function }) {

    const uNameInput = useRef(null);
    const passInput = useRef(null);

    async function login() {
        const loginPayloadInfo = {
            username: uNameInput.current.value,
            pass: passInput.current.value
        }

        const loginPayload: string = JSON.stringify(loginPayloadInfo);

        console.log(loginPayload);

        const response = await fetch('http://localhost:3001/login', {
            method: 'PATCH',
            body: JSON.stringify(loginPayloadInfo),
            headers: { 'content-type': 'application/json' }
        });

        const employee: Employee | Error = await response.json();

        if (employee instanceof Error) {
            alert("Login Failed");
        }
        else {
            props.updateUser({ username: employee.uName, pass: employee.pass, isManager: employee.isManager });
            sessionStorage.setItem("username", employee.uName);
            sessionStorage.setItem("pass", employee.pass);
            sessionStorage.setItem("isManager", String(employee.isManager));
        }
    }

    return (
        <>
            <h1>Login Page</h1>
            <label htmlFor="uNameInput">Username</label>
            <input type="text" id="uNameInput" placeholder="Username" ref={uNameInput} />
            <br />
            <label htmlFor="passInput">Password</label>
            <input type="password" id="passInput" ref={passInput} />
            <br />
            <button onClick={login}>Login</button>
        </>)
}