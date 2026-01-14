import { useState } from 'react';
import '../style/addtask.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { apiRequest } from '../utils/api';

import Loader from '../components/Loader';

function AddTask() {
    const [taskData, setTaskData] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAddTask = async () => {
        console.log(taskData)
        setLoading(true);
        try {
            const result = await apiRequest('/add-task', {
                method: 'POST',
                body: JSON.stringify(taskData),
            });

            if (result.success) {
                navigate("/")
                toast.success("Task added successfully");
                console.log('New task added')
            } else {
                toast.error("Failed to add task");
            }
        } catch (error) {
            toast.error("Error adding task");
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            {loading && <Loader />}
            <div className="container">
                <h1>Add New Task</h1>

                <label htmlFor="">Title</label>
                <input onChange={(event) => setTaskData({ ...taskData, title: event.target.value })} type="text" name="title" placeholder="Enter task title" />
                <label htmlFor="">Description</label>
                <textarea onChange={(event) => setTaskData({ ...taskData, description: event.target.value })} rows={4} name="description" placeholder="Enter task description" id=""></textarea>
                <button onClick={handleAddTask} className="submit">Add New Task</button>

            </div>
        </>
    )
}

export default AddTask;