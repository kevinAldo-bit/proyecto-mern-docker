export default function Task({ task, onMove }: any) {
  return (
    <div className="task">
      <strong>{task.title}</strong>
      <p>⚠️ {task.priority}</p>

      {onMove && (
        <button onClick={() => onMove(task)}>➡️ Mover</button>
      )}
    </div>
  );
}
