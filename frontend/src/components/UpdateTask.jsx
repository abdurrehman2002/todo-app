import { useEffect, useState } from 'react';
import '../style/addtask.css';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { apiRequest } from '../utils/api';

function UpdateTask() {
    const [taskData, setTaskData] = useState({ title: '', description: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getTask(id);
    }, [])

    const getTask = async (id) => {
        try {
            const task = await apiRequest(`/task/${id}`);
            if (task.result) {
                setTaskData(task.result)
            }
        } catch (error) {
            toast.error("Failed to fetch task details");
        }
    }

    const handleUpdateTask = async () => {
        try {
            const task = await apiRequest("/update-task", {
                method: "PUT",
                body: JSON.stringify(taskData),
            });

            if (task.success) {
                toast.success("Task updated successfully");
                navigate('/')
            } else {
                toast.error("Failed to update task");
            }
        } catch (error) {
            toast.error("Error updating task");
        }
    }

    return (
        <div className="container">
            <h1>Update Task</h1>

            <label htmlFor="">Title</label>
            <input value={taskData?.title || ''} onChange={(event) => setTaskData({ ...taskData, title: event.target.value })} type="text" name="title" placeholder="Enter task title" />
            <label htmlFor="">Description</label>
            <textarea value={taskData?.description || ''} onChange={(event) => setTaskData({ ...taskData, description: event.target.value })} rows={4} name="description" placeholder="Enter task description" id=""></textarea>
            <button onClick={handleUpdateTask} className="submit">Update Task</button>

        </div>
    )
}

export default UpdateTask;