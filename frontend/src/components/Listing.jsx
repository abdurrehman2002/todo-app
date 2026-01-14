import { Fragment, useEffect, useState } from "react"
import '../style/list.css'
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import { apiRequest } from '../utils/api';

function Listing() {
    const [taskData, setTaskData] = useState([]);
    const [selectedTask, setSelectedTask] = useState([]);

    useEffect(() => {
        getListData();
    }, []);

    const getListData = async () => {
        try {
            const list = await apiRequest('/tasks');
            if (list.success) {
                setTaskData(list.result)
            } else {
                toast.error('Failed to fetch tasks');
            }
        } catch (error) {
            console.error(error);
            toast.error('Network error');
        }
    }

    const deleteTask = async (id) => {
        try {
            const item = await apiRequest('/delete/' + id, { method: 'DELETE' });
            if (item.success) {
                toast.success("Task deleted successfully");
                getListData()
            } else {
                toast.error('Failed to delete task');
            }
        } catch (error) {
            toast.error('Error deleting task');
        }
    }

    const selectAll = (event) => {
        if (event.target.checked) {
            let items = taskData.map((item) => item._id)
            setSelectedTask(items)
        } else {
            setSelectedTask([])
        }

    }
    const selectSingleItem = (id) => {
        if (selectedTask.includes(id)) {
            let items = selectedTask.filter((item) => item != id)
            setSelectedTask([items])
        } else {
            setSelectedTask([id, ...selectedTask])
        }

    }

    const deleteMultiple = async () => {
        try {
            const item = await apiRequest('/delete-multiple/',
                {
                    method: 'DELETE',
                    body: JSON.stringify(selectedTask),
                }
            );
            if (item.success) {
                toast.success("Selected tasks deleted");
                getListData();
                setSelectedTask([]);
            } else {
                toast.error('Failed to delete tasks');
            }
        } catch (error) {
            toast.error('Error deleting multiple tasks');
        }
    }

    return (
        <div className="list-container">
            <div className="list-header-actions">
                {selectedTask.length > 0 && (
                    <button onClick={deleteMultiple} className="delete-multiple-btn">
                        Delete Selected ({selectedTask.length})
                    </button>
                )}
            </div>

            <div className="task-table">
                <div className="table-header">
                    <div className="col-checkbox"><input onChange={selectAll} type="checkbox" /></div>
                    <div className="col-sno">#</div>
                    <div className="col-title">Title</div>
                    <div className="col-desc">Description</div>
                    <div className="col-action">Action</div>
                </div>

                {taskData?.map((item, index) => {
                    return (
                        <div key={item?._id} className="table-row">
                            <div className="col-checkbox">
                                <input
                                    onChange={() => selectSingleItem(item._id)}
                                    checked={selectedTask.includes(item._id)}
                                    type="checkbox"
                                />
                            </div>
                            <div className="col-sno">{index + 1}</div>
                            <div className="col-title">{item?.title}</div>
                            <div className="col-desc">{item?.description}</div>
                            <div className="col-action">
                                <Link to={"/update/" + item?._id} className="icon-btn edit-btn" title="Edit">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                                </Link>
                                <button onClick={() => deleteTask(item?._id)} className="icon-btn delete-btn" title="Delete">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Listing;