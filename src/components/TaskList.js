import { useEffect, useState } from "react";
import Task from "./Task";
import TaskForm from "./TaskForm";
import {toast} from "react-toastify";
import axios from 'axios';
import { URL } from "../App";
import Loading from "../assets/Loading";


const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [taskId, setTaskId] = useState("");

  const [formData, setformData] = useState({
    name : "",
    completed : false,
  });

  const {name} = formData;

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setformData({
      ...formData, [name] : value
    })
  }

  // fetching tasks from db
  const getTasks = async () => {
    try {
      const {data} = await axios.get(`${URL}/api/tasks`);
      setTasks(data);
      setIsLoading(false);
      
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getTasks();
  }, [tasks]);
  
  // creating a task
  const createTask = async (e) => {
    e.preventDefault();
    if(name === ""){
      return toast.error("Please add a task...!");
    }

    try {
      await axios.post(`${URL}/api/tasks`, formData);
      setformData({...formData, name : ""});
      toast.success("Task added successfully...")
      
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  // deleting a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      toast.success("Task deleted successfully...!");
    } catch (error) {
      toast.error(error.message);
    }
  }

  if(isLoading) return <Loading/>;

  // getting sigle task
  const getSingleTask = async (task) => {
    setformData({name : task.name, completed : false});
    setTaskId(task._id);
    setIsEditing(true);
  }

  // update a task
  const updateTask = async (e) => {
    e.preventDefault();

    if(name === "") return toast.error('Please add a task...!');

    try {
      await axios.put(`${URL}/api/tasks/${taskId}`, formData);
      toast.success("Task updated successfully...!");
      setformData({...formData, name : ""});
      setIsEditing(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  // completed or not
  const setToComplete = async (task) => {
    const newFormData = {
      name : task.name,
      completed : !task.completed,
    }
    try {
      await axios.put(`${URL}/api/tasks/${task._id}`, newFormData);
    } catch (error) {
      toast.error(error.message);
    }
  }


  return (
    <div className="app">
      <h2>Task Manager</h2>
      <TaskForm
      name = {name}
      handleInputChange = {handleInputChange}
      createTask = {createTask}
      isEditing = {isEditing}
      updateTask = {updateTask}
      />
      <div className="status">
        <p>
          <b>Total Tasks :</b> {tasks.length}
        </p>
        <p>
          <b>Completed Tasks :</b> {tasks.filter(task => task.completed === true).length}
        </p>
      </div>
      <hr/>
      {
        !isLoading && tasks.length === 0 ? (
          <p>No tasks found ...!</p>
        ) : (
          <>
          {tasks.map((task, index) => {
            return(
              <Task
                 key={task._id}
                 task={task}
                 index = {index}
                 deleteTask = {deleteTask}
                 getSingleTask = {getSingleTask}
                 setToComplete = {setToComplete}
              />
            )
          })}
          </>
        )
      }
    </div>
  )
}

export default TaskList