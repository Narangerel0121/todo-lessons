"use client"
import { useState } from "react";
import { nanoid } from "nanoid";

export default function Home() {
  // const tasks = [
  //   {
  //     text: "geree tseverleh",
  //     isCompleted: false,
  //     id: new Date().toISOString()
  //   },
  //   {
  //     text: "hooloo tseverleh",
  //     isCompleted: false,
  //     id: new Date().toISOString()
  //   }
  // ]
  // {console.log(tasks[1].id)} // ajilj bainaa
  const initialTasks = [];
  const [tasks, setTasks] = useState(initialTasks);

  function addTask() {
    const newTaskText = prompt("task?")

    if (newTaskText) {
      const newTasks = [{ text: newTaskText, isCompleted: false, id: nanoid() }, ...tasks];
      setTasks(newTasks)
    }
  }

  function editTask(index) {
    const updatedTaskText = prompt("Edit?", tasks[index].text);

    if (updatedTaskText) {
      const newTasks = [...tasks];
      newTasks[index].text = updatedTaskText;
      setTasks(newTasks);
    }
  }

  function deleteTask(id) {
    if(confirm("U sure?")) {
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks)
    }
  }

  return (
    <div>
      <button onClick={addTask} >Add</button>
      {tasks.map((task, index) => (
        <div key={task.id} className={task}>

          <input type="checkbox"></input>

          <span>{task.text}</span>

          <button onClick={() => editTask(index)}>Edit</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>

        </div>
      ))}
    </div>
  );
}
