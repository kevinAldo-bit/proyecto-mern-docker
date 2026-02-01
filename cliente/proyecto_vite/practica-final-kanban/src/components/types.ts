export type TaskStatus = "pending" | "doing" | "done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: number;
}
