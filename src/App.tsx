import React from 'react';
import {AccountDashboard,History} from './component';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <main>
      <ToastContainer position="top-center"/>
      <AccountDashboard />
      <History />
    </main>
   
  );
}

export default App;
