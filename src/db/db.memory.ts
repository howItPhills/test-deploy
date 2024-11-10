export type DbUserModel = {
  id: number;
  name: string;
  age: number;
};

export type DbType = {
  users: DbUserModel[];
};

export const db = {
  users: [
    { id: 2, name: "Ivan", age: 24 },
    { id: 1, name: "Igor", age: 23 },
    { id: 3, name: "Lena", age: 26 },
    { id: 5, name: "Vitya", age: 28 },
  ],
};
