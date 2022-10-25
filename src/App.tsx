import React, { useEffect } from 'react';
import './App.css';
import { useAppDispatch } from './hooks/store';
import { fetchGroups } from './store/groupsSlice';
import { fetchUsers } from './store/usersSlice';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/home';
import { CreateGroup } from './pages/createGroup';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <main className="w-full h-full p-4 bg-slate-100 flex flex-col">
      <h1 className="text-center mb-2">Users Management</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="create-group" element={<CreateGroup />} />
      </Routes>
    </main>
  );
}

export default App;
