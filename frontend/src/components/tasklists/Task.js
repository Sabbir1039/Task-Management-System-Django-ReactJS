import './Task.css'

function TaskCard({ task, onEdit, onDelete }) {

    const handleEdit = () => {
        onEdit(task.id);
    };

    const handleDelete = () => {
        onDelete(task.id);
    };

    return (
        <div className="task-card my-1">
            <div className='task-left'>
                <p className='title'>{task.title}</p>
                <p><span className='description'>Details:</span> {task.description}</p>

                {task.completed ? 
                <p className="status">Status: <span id="comp">Completed</span></p> :
                <p className="status">Status: <span id="pen">Pending</span></p> }
                
                {/* <p><span className='duedate'>Due Date:</span> {task.dueDate}</p> */}
            </div>

            <div className='task-right'>
                <button className='btn btn-sm btn-warning button' onClick={handleEdit}>Edit task</button>
                <button className='btn btn-sm btn-danger button' onClick={handleDelete}>Delete task</button>
            </div>
        </div>
      );
}

export default TaskCard;