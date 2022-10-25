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
      <div>
        <span>Users:</span>
        <input value={search} onChange={e => dispatch(setUserSearch(e.target.value))} />
      </div>
      <ul>
        {items.map(item => (<li key={item.id}>{item.name}</li>))}
      </ul>
    </section>
  )
}