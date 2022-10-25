import React, { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { setSelectedGroup, setUserSearch } from '../store/usersSlice';
import { UserGroupSelection } from './userGroupSelection';
import { Link } from 'react-router-dom';

export const UsersList = () => {
  const dispatch = useAppDispatch();
  const { loading, search, items, selectedGroup } = useAppSelector(state => state.users);

  const filteredUsers = useMemo(() => items.filter(item => {
    return selectedGroup
      ? item.groups.includes(selectedGroup) && item.name.toUpperCase().includes(search.toUpperCase())
      : item.name.toUpperCase().includes(search.toUpperCase());
  }), [items, search, selectedGroup]);

  if (loading && !items.length) {
    return <div>'Loading...'</div>;
  }

  return (
    <section className="overflow-hidden flex-grow flex flex-col">
      <div className="mb-2 flex">
        <h2 className="uppercase inline mr-2 h-10 leading-10">Users:</h2>
        <input
          value={search}
          className="rounded border border-slate-300 h-10 px-1"
          onChange={e => dispatch(setUserSearch(e.target.value))} />
        <UserGroupSelection selectedGroup={selectedGroup} onChange={e => dispatch(setSelectedGroup(e))} />
        {(!!search || selectedGroup) && (
          <button
            className="px-1 h-10 border border-slate-300 rounded ml-2 inline-block"
            onClick={() => {
              dispatch(setSelectedGroup(null));
              dispatch(setUserSearch(''));
            }}>Clear</button>
        )}
      </div>
      <ul className="overflow-y-auto">
        <Link to="/create-user">
          <li className="h-16 w-44 leading-16 text-center border border-slate-300 border-dashed rounded mb-2">+</li>
        </Link>
        {filteredUsers.map(item => (
          <li
            className="h-16 w-44 text-center p-2 border border-slate-300 rounded mb-2"
            key={item.id}>
            <Link to={`user/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};