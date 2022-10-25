import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { deleteUser } from '../store/usersSlice';

export const UserProfile = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.users);
  const groups = useAppSelector(state => state.groups.items);

  const idNumber = parseInt(params.id as string, 10);
  const selectedUser = items.filter(item => item.id === idNumber)[0];

  const userGroups = groups.filter(item => selectedUser.groups.includes(item.id));

  return <div>
    <h3 className="text-center">{selectedUser.name}</h3>
    <ul className="overflow-y-auto">{
      userGroups
        .map(item => (
          <li
            className="h-16 w-44 text-center p-2 border border-slate-300 rounded mb-2"
            key={item.id}>{item.name}</li>
        ))
    }</ul>
    <div className="flex justify-center w-full mt-4">
      <button
        onClick={() => {
          dispatch(deleteUser(idNumber))
            .then(() => navigate('/'))
        }}
        className="text-center p-2 border border-red-500 rounded mb-2">DELETE USER</button>
    </div>
  </div>;
};
