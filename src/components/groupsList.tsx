import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { setGroupsSearch } from '../store/groupsSlice';

export const GroupsList = () => {
  const dispatch = useAppDispatch();
  const { loading, search, items } = useAppSelector(state => state.groups);

  if (loading && !items.length) {
    return <div>'Loading...'</div>;
  }

  return (
    <section>
      <div>
        <span>Groups:</span>
        <input value={search} onChange={e => dispatch(setGroupsSearch(e.target.value))} />
      </div>
      <ul>
        {items.map(item => (<li key={item.id}>{item.name}</li>))}
      </ul>
    </section>
  )
}