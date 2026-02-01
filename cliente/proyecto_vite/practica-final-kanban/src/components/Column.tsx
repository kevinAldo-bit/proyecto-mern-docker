import { Task, TaskStatus } from "./types";
import TaskCard from "./TaskCard";

interface Props {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onDropTask: (id: string, status: TaskStatus) => void;
}

export default function Column({ title, status, tasks, onDropTask }: Props) {
  const handleDrop = (e: React.DragEvent) => {
    const id = e.dataTransfer.getData("id");
    onDropTask(id, status);
  };

  return (
    <div
      className={`column ${status}`}
      onDragOver={e => e.preventDefault()}
      onDrop={handleDrop}
    >
      <h2>{title}</h2>
      {tasks.map(task => (
        <div
          key={task.id}
          onDragStart={e => e.dataTransfer.setData("id", task.id)}
        >
          <TaskCard task={task} />
        </div>
      ))}
    </div>
  );
}
