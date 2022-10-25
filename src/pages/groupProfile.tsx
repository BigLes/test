import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../hooks/store';

export const GroupProfile = () => {
  const params = useParams<{ id: string }>();
  const { items } = useAppSelector(state => state.groups);
  const users = useAppSelector(state => state.users.items);

  const idNumber = parseInt(params.id as string, 10);
  const selectedGroup = items.filter(item => item.id === idNumber)[0];

  const groupUser = users.filter(item => item.groups.includes(idNumber))

  return <div>
    <h3 className="text-center">{selectedGroup.name}</h3>
    <ul className="overflow-y-auto">{
      groupUser
        .map(item => (
          <li
            className="h-16 w-44 text-center p-2 border border-slate-300 rounded mb-2"
            key={item.id}>{item.name}</li>
        ))
    }</ul>
    {!groupUser.length && (
      <div className="flex justify-center w-full mt-4">
        <button className="text-center p-2 border border-red-500 rounded mb-2">DELETE GROUP</button>
      </div>
    )}
  </div>
};
