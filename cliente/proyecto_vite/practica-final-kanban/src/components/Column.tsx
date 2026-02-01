import type { Task, TaskStatus } from "./types";

interface Props {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onDropTask: (id: string, status: TaskStatus) => void;
}

export default function Column({ title, status, tasks, onDropTask }: Props) {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        const id = e.dataTransfer.getData("id");
        onDropTask(id, status);
      }}
      style={{
        border: "2px solid white",
        padding: "10px",
        width: "300px",
        minHeight: "300px",
      }}
    >
      <h2>{title}</h2>

      {tasks.map((task) => (
        <div
          key={task.id}
          draggable
          onDragStart={(e) => e.dataTransfer.setData("id", task.id)}
          style={{
            background: "#1e293b",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          <strong>{task.title}</strong>
          <div>⏱️ {task.seconds}s</div>
        </div>
      ))}
    </div>
  );
}

