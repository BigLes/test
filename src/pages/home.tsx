import React, { useEffect } from 'react';
import { GroupsList } from '../components/groupsList';
import { UsersList } from '../components/usersList';
import { fetchGroups } from '../store/groupsSlice';
import { fetchUsers } from '../store/usersSlice';
import { useAppDispatch } from '../hooks/store';

export const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      <GroupsList />
      <UsersList />
    </>
  )
}