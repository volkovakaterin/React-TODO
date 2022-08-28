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
  const [visibleTask, setVisible] = useState('');

  const clickEdit =()=> {
    editTask(task.id, task.content);
    setVisible('none');
  }

  useEffect(() => {
    setTask(props.task);
    setVisible('');
    if (task.status === false) { setBtns('none') }; //если статус задачи-выполнена, скрываем все кнопки 
  }, [props.task, task.status]);

  return (
    <div className={(task.status === false) ? "container-task task-done" : `container-task ${visibleTask}`}>
      <div className='box-task'>
        <div className='content-task'>{task.content}</div>
        <div className='box-btns'>
          <button className={`btn-edit ${classBtns}`} onClick={(e) =>clickEdit()}></button>
          <button className={`btn-delete ${classBtns}`} onClick={(e) => deleteTask(task.id)}></button>
          <button className={`btn-done ${classBtns}`} onClick={(e) => doneTask(task.id)}></button>
        </div>
      </div>
    </div>
  )
}

export default Task;