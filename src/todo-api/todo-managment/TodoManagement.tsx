import TodoForm from "../../components/todo-form/TodoForm";
import { Task } from "./TodoManagment.types";
import "./TodoManagement.styles.css";
import TodoItem from "../todo-item/TodoItem";
import usePersistentState from "../../core/hooks/usePersistentState";

export default function TodoManagement() {
  const [tasks, setTasks] = usePersistentState<Task[]>("todos", []);

  function handleOnAdd(newTask: string) {
    const newId = (tasks[tasks.length - 1]?.id ?? 0) + 1;

    const newItem: Task = {
      id: newId,
      description: newTask,
      completed: false,
    };

    setTasks((prev) => [...prev, newItem]);
  }

  function handleOnRemove(todoId: number) {
    setTasks((prev) => [...prev.filter((x) => x.id !== todoId)]);
  }

  function onCompleteTask(id: number, completed?: boolean) {
    const itemToChange = tasks.find((x) => x.id === id);

    if (!itemToChange) {
      alert("The tasks didn't exists");
      throw Error("The tasks didn't exists");
    }

    itemToChange.completed = completed;

    setTasks((prev) => [...prev.filter((x) => x.id !== id), itemToChange]);
  }

  return (
    <div className="container">
      <h1>Organize your tasks</h1>
      <TodoForm onSubmit={handleOnAdd} />
      <div className="inner-container">
        <div className="column">
          <h3>✅ You did it!</h3>
          {tasks
            .filter((task) => task.completed)
            .map((task) => (
              <TodoItem
                key={task.id}
                todo={task}
                onChange={(todoId) => onCompleteTask(todoId, false)}
                onRemove={(todoId) => handleOnRemove(todoId)}
              />
            ))}
        </div>
        <div className="column">
          <h3>🚨 Pending to do</h3>
          {tasks
            .filter((task) => !task.completed)
            .map((task) => (
              <TodoItem
                key={task.id}
                todo={task}
                onChange={(todoId) => onCompleteTask(todoId, true)}
                onRemove={(todoId) => handleOnRemove(todoId)}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
