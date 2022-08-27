import React, { useEffect, useState } from 'react';
import { ITask, IdeleteTask, IeditTask, IdoneTask } from '../models';

interface TaskProps {
  task: ITask,
  deleteTask: IdeleteTask,
  editTask: IeditTask,
  doneTask: IdoneTask
};

function Task(props: TaskProps) {
  const [task, setTask] = useState(props.task);
  const deleteTask = props.deleteTask.deleteTask;
  const editTask = props.editTask.editTask;
  const doneTask = props.doneTask.doneTask;
  const [classBtns, setBtns] = useState('');

  useEffect(() => {
    setTask(props.task);
    if (task.status === false) { setBtns('none') };
  }, [props.task, task.status]);

  return (
    <div key={task.id} className={(task.status === false) ? "container-task task-done" : "container-task"}>
      <div className='box-task'>
        <div className='content-task'>{task.content}</div>
        <button className={`btn-edit ${classBtns}`} onClick={(e) => editTask(task.id, task.content)}></button>
        <button className={`btn-delete ${classBtns}`} onClick={(e) => deleteTask(task.id)}></button>
        <button className={`btn-done ${classBtns}`} onClick={(e) => doneTask(task.id)}></button>
      </div>
    </div>
  )
}

export default Task;