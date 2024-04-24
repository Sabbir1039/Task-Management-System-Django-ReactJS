import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateTask = () => {
    // const [user, setUser] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [completed, setCompleted] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const notifySuccess = () => toast.success('New task added!');
    const notifyError = () => toast.error('Error occured! Try again.');

    const formData = {
        // user: user,
        title: title,
        description: description,
        category: category,
        dueDate: dueDate,
        completed: completed,
    };

    const CATEGORY_CHOICES = [
        'Other',
        'Personal',
        'Study',
        'Work',
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const accessToken = localStorage.getItem('accessToken');
            const response = await fetch("http://127.0.0.1:8000/api/tasks/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            } else {
                notifySuccess();
                // setMessage('Task created!');
                setError('');
                navigate('/');
                console.log('Task created successfully!');
            }

            // setUser('');
            setTitle('');
            setDescription('');
            setCategory('');
            setDueDate('');
            setCompleted(false);

            } catch(error) {
                setMessage('');
                notifyError();
                // setError('Error occured! Try again.');
                console.log('Error occured: ', error);
            }
        
    };

    const handleReset = () => {
        // setUser('');
        setTitle('');
        setDescription('');
        setCategory('');
        setDueDate('');
        setCompleted(false);
    };

    return(
        <div className="container bg-light px-3 py-2">

            {/* Message or Error Section */}
            <div className="text-center mt-3">
                    {message && <div className="alert alert-success">{message}</div>}
                    {error && <div className="alert alert-danger">{error}</div>}
            </div>

            <h2 className="text-center my-2">Create New Task</h2>
            <form onSubmit={ (e) => handleSubmit(e) }>

            {/* <div className="form-group my-2">
                    <label htmlFor="user">Username</label>
                    <input
                        id="user"
                        type="text"
                        className="form-control"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                </div> */}

                <div className="form-group my-2">
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="form-group my-2">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-group my-2">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="" disabled>Select a category</option>
                        { CATEGORY_CHOICES.map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group my-2">
                    <label htmlFor="dueDate">Due Date</label>
                    <input
                        id="dueDate"
                        type="datetime-local"
                        className="form-control"
                        value={dueDate}
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            // Format the date and time in ISO 8601 format
                            const isoFormattedDate = new Date(inputValue).toISOString().slice(0, -8);
                            setDueDate(isoFormattedDate);
                        }}
                    />
                </div>

                <div className="form-group my-2">
                    <label htmlFor="completed">Completed</label>
                    <input
                        id="completed"
                        type="checkbox"
                        className="form-check-input ms-2"
                        value={completed}
                        onChange={() => setCompleted(!completed)}
                    />
                </div>

                <button type="submit" className="btn btn-sm btn-success my-2 me-2">Add Task</button>
                <button type="reset" className="btn btn-sm btn-warning" onClick={handleReset}>Reset</button>
            </form>
        </div>
    );
};

export default CreateTask;