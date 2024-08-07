import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTasks, deleteTask } from '../features/tasks/tasksThunks';
import { toggleComletion } from '../features/tasks/tasksSlice';

const MainPage = () => {
  const dispatch = useDispatch();
  const taskList = useSelector(state => state.tasks.taskList);
  const loading = useSelector(state => state.tasks.loading);
  const theme = useSelector(state => state.theme);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if(loading) {
    return <div>Loading . . .</div>;
  }

  return (
    <div className='MainPage'>
      <Link to="/create">Create New Task</Link>
      {taskList.map((task) => (
        <div key={task.id} className={`Task ${theme}`}>
          <h3>Task: {task.taskName}</h3>
          <p>Author's Name: {task.taskAuthorName}</p>
          <p>Author's Lastname: {task.taskAuthorLastname}</p>
          <p>Date: {task.taskDate}</p>
          <p>Completed: {task.isCompleted ? "Yes" : "No"}</p>
          <div className="taskButtons">
            <button
              className={task.isCompleted ? 'MarkIncomplete' : 'MarkComplete'}
              onClick={() => dispatch(toggleComletion(task.id))}
            >
              {task.isCompleted ? "Mark as Incomplete" : "Mark as Complete"}
            </button>
            <Link to={`/edit/${task.id}`}>
              <button className='Edit'>Edit</button>
            </Link>
            <button
              style={{ backgroundColor: 'red', color: 'white', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }}
              className='Delete'
              onClick={() => dispatch(deleteTask(task.id))}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainPage;