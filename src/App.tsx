import React, { useState } from 'react';
import LoginPage from './components/loginPage';
import './components/CSS/login.css';
import ManagerPage from './components/manager-page';
import EmployeePage from './components/employee-page';

export function logout() {
  sessionStorage.clear();
  window.location.reload();
}

function App() {

  const [user, setUser] = useState({ username: sessionStorage.getItem("username"), id: sessionStorage.getItem("ID"), isManager: Boolean(sessionStorage.getItem("isManager")) });

  return (
    <>
      {!user.username ? <LoginPage updateUser={setUser} />
        : user.isManager ? <>
          <ManagerPage username={user.username} id={user.id}/>
        </>
          : <>
            <EmployeePage id={user.id}/>
          </>
      }
    </>
  );
}

export default App;
