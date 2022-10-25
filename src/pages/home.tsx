import React from 'react';
import { GroupsList } from '../components/groupsList';
import { UsersList } from '../components/usersList';

export const Home = () => {
  return (
    <>
      <GroupsList />
      <UsersList />
    </>
  )
}