import React, { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { deleteUser, toggleGroupForUser } from '../store/usersSlice';
import Select from 'react-select';

export const UserProfile = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.users);
  const groups = useAppSelector(state => state.groups.items);

  const idNumber = parseInt(params.id as string, 10);
  const selectedUser = useMemo(() => items.filter(item => item.id === idNumber)[0], [idNumber, items]);

  useEffect(() => {
    if (!selectedUser) {
      navigate('/');
    }
  }, [navigate, selectedUser])

  const userGroups = groups.filter(item => selectedUser?.groups.includes(item.id));
  const nonUserGroups = groups.filter(item => !selectedUser?.groups.includes(item.id));

  const options = nonUserGroups.map(item => ({ value: item.id, label: item.name }))

  return <div>
    <h3 className="text-center">{selectedUser?.name}</h3>
    <div className="mb-2">
      <h4 className="inline mr-2">Assign group:</h4>
      <Select
        onChange={(selectedOption) => {
          dispatch(toggleGroupForUser({ userId: idNumber, groupId: selectedOption?.value || 0 }))
        }}
        options={options} />
    </div>
    <ul className="overflow-y-auto">{
      userGroups
        .map(item => (
          <li
            onClick={() => dispatch(toggleGroupForUser({ userId: idNumber, groupId: item.id }))}
            className="h-16 w-44 text-center p-2 border border-slate-300 rounded mb-2 cursor-pointer"
            key={item.id}>{item?.name}</li>
        ))
    }</ul>
    <div className="flex justify-center w-full mt-4">
      <button
        onClick={() => {
          dispatch(deleteUser(idNumber)).then(() => navigate('/'))
        }}
        className="text-center p-2 border border-red-500 rounded mb-2">DELETE USER</button>
    </div>
  </div>;
};
