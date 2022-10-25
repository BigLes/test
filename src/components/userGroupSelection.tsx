import React from 'react';
import { useAppSelector } from '../hooks/store';
import Select from 'react-select';

type UserGroupSelectionParams = {
  selectedGroup: number | null;
  onChange: (selected: number | null) => void
}

export const UserGroupSelection = ({ selectedGroup, onChange }: UserGroupSelectionParams) => {
  const groups = useAppSelector(state => state.groups.items);

  const options = groups.map(item => ({ value: item.id, label: item.name }));

  return <Select
    value={options.filter(item => item.value === selectedGroup)[0] || { value: 0, label: '' }}
    className="rounded ml-2 w-44 h-10"
    options={options}
    onChange={option => onChange(option?.value || 0)} />;
};