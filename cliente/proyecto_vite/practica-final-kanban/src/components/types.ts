export type TaskStatus = "pending" | "doing" | "done";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  seconds: number;
};
