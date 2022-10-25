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
    <main>
      <h1 className="text-sm font-bold underline">Users Management</h1>
      <GroupsList />
      <UsersList />
    </main>
  );
}

export default App;
