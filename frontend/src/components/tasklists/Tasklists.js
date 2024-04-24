import React, { useState } from "react";
import TaskCard from "./Task";
import useFetch from '../../api/useFetch';

function TaskList() {
    const [message, setMessage] = useState(null);

    const { data: tasks, isPending, error, refetch } = useFetch(
        "http://127.0.0.1:8000/api/tasks/"
    );

    const editTask = (taskId) => {
        console.log(taskId)
    };

    const deleteTask = (taskId) => {
        const accessToken = localStorage.getItem('accessToken');
        fetch(`http://127.0.0.1:8000/api/tasks/${taskId}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                setMessage('Task deleted successfully');
                console.log('Task deleted successfully');
                refetch();
            })
            .catch(error => {
                console.log('There was a problem deleting the task:', error);
                setMessage('There was a problem deleting the task');
            });

    };

    return (
        <div className="p-0 mx-auto">

            <div className="text-center">
                {message ? (
                    <div className="alert alert-info">{message}</div>
                ) : null}
            </div>

            {/* Message for empty tasks */}
            <div className="text-center">
                {!tasks || tasks.length === 0 ? (
                    <div className="alert alert-info">No tasks available!</div>
                ) : null}
            </div>

            {error && <div className="text-center">Error: {error}</div>}

            {isPending ? (
                <div className="text-center">Loading Data ...</div>
            ) : (
                tasks &&
                tasks.map((task, index) => (
                    <TaskCard
                        key={index}
                        task={task}
                        onEdit={editTask}
                        onDelete={deleteTask}
                    />
                )
                )
            )}
        </div>
    );
}

export default TaskList;
