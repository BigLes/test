import React, { useState } from 'react';
import { useAppDispatch } from '../hooks/store';
import { createGroup } from '../store/groupsSlice';
import { useNavigate } from 'react-router-dom';

export const CreateGroup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [name, setName] = useState('');

  return <div>
    <h2 className="inline">Group Name:</h2>
    <input
      value={name}
      className="rounded border border-slate-300 h-7 px-1 ml-2"
      onChange={e => setName(e.target.value)} />
    <button
      onClick={() => {
        dispatch(createGroup({ name })).then(() => navigate('/'));
      }}
      className="border border-slate-300 px-2 rounded h-7 ml-2">Create
    </button>
  </div>;
};