import React, { useEffect } from 'react';
import './App.css';
import { GroupsList } from './components/groupsList';
import { UsersList } from './components/usersList';
import { useAppDispatch } from './hooks/store';
import { fetchGroups } from './store/groupsSlice';
import { fetchUsers } from './store/usersSlice';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <main className="w-full h-full p-4 bg-slate-100 flex flex-col">
      <h1 className="text-center mb-2">Users Management</h1>
      <GroupsList />
      <UsersList />
    </main>
  );
}

export default App;
