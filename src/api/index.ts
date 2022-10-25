import { Group, User } from '../models';

export const fetchGroupsApi = (): Promise<Array<Group>> =>
  fetch('http://localhost:3001/groups')
    .then(res => res.status === 200 ? res.json() : Promise.reject(res.statusText))
    .then(json => json as Array<any>)
    .then(array => array.map(item => ({
      id: parseInt(item.id, 10),
      name: item.name,
      color: item.color,
    })));

export const fetchUsersApi = (): Promise<Array<User>> =>
  fetch('http://localhost:3001/users')
    .then(res => res.status === 200 ? res.json() : Promise.reject(res.statusText))
    .then(json => json as Array<any>)
    .then(array => array.map(item => ({
      id: parseInt(item.id, 10),
      name: item.name,
      groups: item.groups.map((group: string) => parseInt(group, 10))
    })));

export const createGroupApi = (body: { name: string }): Promise<string> =>
  fetch('http://localhost:3001/groups', { method: 'post', body: JSON.stringify(body) })
    .then(res => res.status === 200 ? res.json() : Promise.reject(res.statusText))
    .then(json => json.groupId);

export const createUserApi = (body: { name: string, group: number }): Promise<string> =>
  fetch('http://localhost:3001/users', { method: 'post', body: JSON.stringify(body) })
    .then(res => res.status === 200 ? res.json() : Promise.reject(res.statusText))
    .then(json => json.userId);

export const deleteGroupApi = (id: number): Promise<string> =>
  fetch(`http://localhost:3001/groups/${id}`, { method: 'delete' })
    .then(res => res.status === 200 ? res.json() : Promise.reject(res.statusText))
    .then(json => json.groupId);

export const deleteUserApi = (id: number): Promise<string> =>
  fetch(`http://localhost:3001/users/${id}`, { method: 'delete' })
    .then(res => res.status === 200 ? res.json() : Promise.reject(res.statusText))
    .then(json => json.groupId);
