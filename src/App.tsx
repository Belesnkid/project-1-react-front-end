import React, { useState } from 'react';
import MViewEmployeeTable from './components/m-view-employee-table';
import LoginPage from './components/loginPage';
import MViewReimbursementTable from './components/m-view-reimbusement-table';
import EViewReimbursementTable from './components/e-view-reimbursement-table';
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
            <MViewEmployeeTable user={user.username}/>
            <MViewReimbursementTable empID={user.id}/>
            <EViewReimbursementTable empID={user.id}/>
          </div>
        </>
          : <>
            <div className='page'>
              <h1>Employee view</h1>
              <button onClick={logout}>Logout</button>
              <EViewReimbursementTable empID={user.id}/>
            </div>
          </>
      }
    </>
  );
}

export default App;
