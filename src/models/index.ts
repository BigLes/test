export type Group = {
  id: number;
  name: string;
};

export type User = {
  id: number;
  name: string;
  groups: Array<number>;
}