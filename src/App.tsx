import React, { useState } from 'react';
import EmployeeTable from './components/employee-table';
import LoginPage from './components/loginPage';
import ReimbursementTable from './components/reimbusement-table';

export function logout() {
  sessionStorage.clear();
  window.location.reload();
}

function App() {

  const [user, setUser] = useState({ username: sessionStorage.getItem("username"), password: sessionStorage.getItem("pass"), isManager: Boolean(sessionStorage.getItem("isManager")) });

  return (<>
    {!user.username ? <LoginPage updateUser={setUser} />
    : user.isManager ? <EmployeeTable />
    : <>
      <p>Employee view</p>
      <button onClick={logout}>Logout</button></>}
      {/* <ReimbursementTable/> */}
    </>
  );
}

export default App;
