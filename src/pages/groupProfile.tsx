import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { deleteGroup } from '../store/groupsSlice';
import { toggleGroupForUser } from '../store/usersSlice';

export const GroupProfile = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
            onClick={() => dispatch(toggleGroupForUser({ userId: item.id, groupId: idNumber }))}
            className="h-16 w-44 text-center p-2 border border-slate-300 rounded mb-2 cursor-pointer"
            key={item.id}>{item.name}</li>
        ))
    }</ul>
    {!groupUser.length && (
      <div className="flex justify-center w-full mt-4">
        <button
          onClick={() => {
            dispatch(deleteGroup(idNumber)).then(() => navigate('/'))
          }}
          className="text-center p-2 border border-red-500 rounded mb-2">DELETE GROUP</button>
      </div>
    )}
  </div>
};
