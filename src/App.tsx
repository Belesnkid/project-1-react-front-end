import React, { useState } from 'react';
import LoginPage from './components/loginPage';
import ManagerPage from './components/manager-page';
import EmployeePage from './components/employee-page';
import { Routes, Route } from 'react-router-dom';

export function logout() {
  sessionStorage.clear();
  window.location.reload();
}

function App() {

  const [user, setUser] = useState({ username: sessionStorage.getItem("username"), id: sessionStorage.getItem("ID"), isManager: Boolean(sessionStorage.getItem("isManager")) });

  return (<>
    <Routes>
      <Route path="/*" element={user.username? user.isManager? <ManagerPage id={user.id} />
      : <EmployeePage id={user.id}/> 
      : <LoginPage  updateUser={setUser}/>}/>
    </Routes>
    </>
  );
}

export default App;
