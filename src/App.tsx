import React, { useState } from 'react';
import ManagerEmployeeTable from './components/manager-employee-table';
import LoginPage from './components/loginPage';
import ManagerReimbursementTable from './components/manager-reimbusement-table';
import PersonalReimbursementTable from './components/personal-reimbursement-table';
import './components/CSS/login.css'

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
          <div className='page'>
            <h1>Manager view</h1>
            <button onClick={logout}>Logout</button>
            <ManagerEmployeeTable user={user.username}/>
            <ManagerReimbursementTable empID={user.id}/>
            <PersonalReimbursementTable empID={user.id}/>
          </div>
        </>
          : <>
            <div className='page'>
              <h1>Employee view</h1>
              <button onClick={logout}>Logout</button>
              <PersonalReimbursementTable empID={user.id}/>
            </div>
          </>
      }
    </>
  );
}

export default App;
