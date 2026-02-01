import { Task } from "./types";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const seconds = Math.floor((Date.now() - task.createdAt) / 1000);

  return (
    <div className="task" draggable>
      <strong>{task.title}</strong>
      <p>{task.description}</p>
      <span>⏱ {seconds}s</span>
    </div>
  );
}
