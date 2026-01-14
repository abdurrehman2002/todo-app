import { useEffect, useState } from 'react';
import '../style/addtask.css';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function UpdateTask() {
    const [taskData, setTaskData] = useState({ title: '', description: '' });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getTask(id);
    }, [])

    const getTask = async (id) => {
        let task = await fetch(`http://localhost:3200/task/` + id, {
            credentials: "include"
        })
        task = await task.json()
        if (task.result) {
            setTaskData(task.result)
        }
    }

    const handleUpdateTask = async () => {
        let task = await fetch("http://localhost:3200/update-task", {
            method: "put",
            body: JSON.stringify(taskData),
            credentials: "include",
            headers: {
                "Content-Type": "Application/Json"
            }
        });
        task = await task.json()
        if (task) {
            toast.success("Task updated successfully");
            navigate('/')
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