import React from 'react';
import { useAppSelector } from '../hooks/store';

type UserGroupSelectionParams = {
  selectedGroup: number | null;
  onChange: (selected: number | null) => void
}

export const UserGroupSelection = ({ selectedGroup, onChange }: UserGroupSelectionParams) => {
  const groups = useAppSelector(state => state.groups.items);

  return (<select
    className="rounded border border-slate-300 ml-2 h-7"
    onChange={e => {
      onChange(e.target.value ? parseInt(e.target.value, 10) : null);
    }}>
    <option selected={selectedGroup === null} value="">No selection</option>
    {groups.map(item => (
      <option
        key={item.id}
        value={item.id}
        selected={selectedGroup === item.id}>{item.name}</option>
    ))}
  </select>);
};