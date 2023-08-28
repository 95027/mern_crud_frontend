import {MdCheckCircle, MdEdit, MdDelete} from 'react-icons/md';

const Task = ({task, index, deleteTask, getSingleTask, setToComplete}) => {
  return (
    <div className={task.completed ? "task completed" : "task"}>
      <p>
        <b>{index + 1}. </b>
        {task.name}
      </p>
      <div className='icons'>
        <MdCheckCircle className='icon' color={task.completed && "green"} onClick={() => setToComplete(task)}/>
        <MdEdit className='icon' color='purple' onClick={() =>getSingleTask(task)}/>
        <MdDelete className='icon' color='brown' onClick={() => deleteTask(task._id)}/>
      </div>
    </div>
  )
}

export default Task