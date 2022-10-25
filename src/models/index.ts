export type Group = {
  id: number;
  name: string;
  color: string;
};

export type User = {
  id: number;
  name: string;
  groups: Array<number>;
}