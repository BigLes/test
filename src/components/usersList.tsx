import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { setUserSearch } from '../store/usersSlice';

export const UsersList = () => {
  const dispatch = useAppDispatch();
  const { loading, search, items } = useAppSelector(state => state.users);

  if (loading && !items.length) {
    return <div>'Loading...'</div>;
  }

  return (
    <section>
      <div className="mb-2">
        <h2 className="uppercase inline mr-2">Users:</h2>
        <input
          value={search}
          className="rounded border border-slate-300"
          onChange={e => dispatch(setUserSearch(e.target.value))} />
      </div>
      <ul className="">
        {items.map(item => (
          <li
            className="h-16 w-44 text-center p-2 border border-slate-300 rounded mb-2"
            key={item.id}>{item.name}</li>
        ))}
      </ul>
    </section>
  )
}