import Task from "./Task";

export default function Column({ title, tasks, color, onMove }: any) {
  let bg = "green";

  if (tasks.length >= 3) bg = "orange";
  if (tasks.length >= 5) bg = "red";

  return (
    <div className={`column ${bg}`}>
      <h2>{title}</h2>

      {tasks.map((task: any) => (
        <Task key={task.id} task={task} onMove={onMove} />
      ))}
    </div>
  );
}
