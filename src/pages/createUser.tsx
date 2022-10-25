import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/store';
import { createUser } from '../store/usersSlice';
import { useNavigate } from 'react-router-dom';
import { UserGroupSelection } from '../components/userGroupSelection';

export const CreateUser = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');
  const [group, setGroup] = useState<number | null>(null);

  return <div>
    <h2 className="inline">User Name:</h2>
    <input
      value={name}
      className="rounded border border-slate-300 h-7 px-1 ml-2"
      onChange={e => setName(e.target.value)} />
    <UserGroupSelection selectedGroup={group} onChange={setGroup} />
    <button
      disabled={!name || !group}
      onClick={() => {
        group && dispatch(createUser({ name, group })).then(() => navigate('/'));
      }}
      className="border border-slate-300 px-2 rounded h-7 ml-2">Create
    </button>
  </div>;
};