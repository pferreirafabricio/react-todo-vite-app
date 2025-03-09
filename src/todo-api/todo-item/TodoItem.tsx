import { Task as TodoItemType } from "../todo-managment/TodoManagment.types";
import "./TodoItem.styles.css";

export type TodoItemProps = {
  todo: TodoItemType;
  onChange: (todoId: number) => void;
  onRemove: (todoId: number) => void;
};

export default function TodoItem({
  todo,
  onChange,
  onRemove,
}: Readonly<TodoItemProps>) {
  return (
    <div className="todo-container">
      <input
        checked={todo.completed}
        type="checkbox"
        title="Undone the task"
        onChange={() => onChange(todo.id)}
      />
      {todo.description}
      <button title="Remove the task" onClick={() => onRemove(todo.id)}>❌</button>
    </div>
  );
}
