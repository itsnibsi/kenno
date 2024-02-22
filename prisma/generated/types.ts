import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type Task = {
    id: string;
    title: string;
    completed: Generated<number>;
    createdAt: Generated<Timestamp>;
    updatedAt: Timestamp | null;
};
export type DB = {
    Task: Task;
};
