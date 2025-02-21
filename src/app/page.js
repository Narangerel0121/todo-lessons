"use client"
import { useState } from "react";
import { nanoid } from "nanoid";

const initialTasks = [];

export default function Home() {
  const [tasks, setTasks] = useState(initialTasks);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("All");

  function addTask() {
    const newTaskText = text;
    if (newTaskText) {
      const newTasks = [{ text: newTaskText, completed: false, id: nanoid() }, ...tasks];
      setTasks(newTasks);
    }
    setText("");
  }

  function handleKeyDown(element) {
    if (element.code === "Enter") {
      addTask();
    }
  }

  function toggleCompleted(index) {
    const clonedTasks = [...tasks];
    clonedTasks[index].completed = !clonedTasks[index].completed;
    setTasks(clonedTasks);
  }

  function editTask(index) {
    const updatedTaskText = prompt("Task?", tasks[index].text);

    if (updatedTaskText) {
      const clonedTasks = [...tasks];
      clonedTasks[index].text = updatedTaskText;
      setTasks(clonedTasks);
    }
  }

  function deleteTask(id) {
    if (confirm("U sure?")) {
      const clonedTasks = tasks.filter((task) => task.id !== id);
      setTasks(clonedTasks);
    }
  }

  let filteredTasks = [];

  if (status === "All") {
    filteredTasks = tasks;
  } else {
    filteredTasks = tasks.filter(filterByStatus);
  }

  function filterByStatus(task) {
    if (status === "Active") {
      return !task.completed;
    } else if (status === "Completed") {
      return task.completed;
    }
  }

  return (
    <div>
      <input placeholder="New task..." type="text" value={text} onKeyDown={handleKeyDown} onChange={(element) => setText(element.target.value)} />

      <button onClick={addTask}>Add</button>

<div>
  <button onClick={() => setStatus("All")} style={status === "All" ? { backgroundColor: "black", color: "white"} : {}}>All</button>
  <button onClick={() => setStatus("Active")} style={status === "Active" ? { backgroundColor: "black", color: "white"} : {}}>Active</button>
  <button onClick={() => setStatus("Completed")} style={status === "Completed" ? { backgroundColor: "black", color: "white"} : {}}>Completed</button>
</div>

      {filteredTasks.map((task, index) => (
        <div key={task.id} className="task">
          <input type="checkbox" checked={task.completed} onChange={() => toggleCompleted(index)} />

          <span className={task.completed ? "done" : ""} >{task.text}</span>

          <button onClick={() => editTask(index)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
      {status === "All" && <p>{`all tasks: ${filteredTasks.length}`}</p>}
      {status === "Active" && <p>{`${filteredTasks.length} of ${tasks.length} is active`}</p>}
      {status === "Completed" && <p>{`${filteredTasks.length} of  ${tasks.length} is active`}</p>}
    </div>
  );
}