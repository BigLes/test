import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './app.css';
import { Home } from './pages/home';
import { CreateGroup } from './pages/createGroup';
import { CreateUser } from './pages/createUser';
import { GroupProfile } from './pages/groupProfile';
import { UserProfile } from './pages/userProfile';

function App() {
  return (
    <main className="w-full h-full p-4 bg-slate-100 flex flex-col">
      <h1 className="text-center mb-2">Users Management</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create-group" element={<CreateGroup />} />
        <Route path="create-user" element={<CreateUser />} />
        <Route path="group/:id" element={<GroupProfile />} />
        <Route path="user/:id" element={<UserProfile />} />
      </Routes>
    </main>
  );
}

export default App;
