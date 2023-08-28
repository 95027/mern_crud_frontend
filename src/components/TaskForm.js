
const TaskForm = ({name, handleInputChange, createTask, isEditing, updateTask}) => {
  return (
    <div>
      <form onSubmit={isEditing ? updateTask : createTask}>
        <input type="text" name = "name" placeholder="Add a Task" value={name} onChange={handleInputChange}/>
        <button type="submit">{isEditing ? "Update" : "Add"}</button>
      </form>
    </div>
  )
}

export default TaskForm