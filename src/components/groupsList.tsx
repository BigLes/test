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
    <section className="mb-4">
      <div className="mb-2">
        <h2 className="uppercase inline mr-2">Groups:</h2>
        <input
          value={search}
          className="rounded border border-slate-300"
          onChange={e => dispatch(setGroupsSearch(e.target.value))} />
      </div>
      <ul className="overflow-x-auto whitespace-nowrap">
        {items.map(item => (
          <li
            className="h-16 w-16 leading-16 text-center inline-block align-bottom	border border-slate-300 rounded mr-2"
            key={item.id}>{item.name}</li>
        ))}
      </ul>
    </section>
  )
}