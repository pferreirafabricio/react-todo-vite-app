import { FormEvent, useState } from "react";
import "./TodoForm.css";

export type TodoFormType = {
  currentTask?: string;
};

export type TodoFormProps = {
  onSubmit: (newTask: string) => void;
};

export default function TodoForm({ onSubmit }: Readonly<TodoFormProps>) {
  const [currentTask, setCurrentTask] = useState<string>("");
  const [invalidMessage, setInvalidMessage] = useState<string>();

  function validate(): boolean {
    if (!currentTask?.trim()) {
      setInvalidMessage("Please type something");
      return false;
    }

    setInvalidMessage(undefined);
    return true;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) return;

    onSubmit(currentTask);

    setCurrentTask("");
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)} className="task-form">
      <input
        id="currentTask"
        placeholder="What's need to be done?"
        value={currentTask}
        onChange={(event) => setCurrentTask(event.target.value)}
        required
        autoFocus
      />
      {invalidMessage && (
        <span className="invalid-feedback">{invalidMessage}</span>
      )}
      <button type="submit">+ Add</button>
    </form>
  );
}
