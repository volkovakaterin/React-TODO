import React, { useState } from 'react';
import './index';
import Task from './components/Task';
import { IdeleteTask, ITask, IeditTask, IdoneTask } from './models';
import { nanoid } from 'nanoid';

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [form, setForm] = useState('');
  const [error, setError] = useState('');
  const [idEdit, setIdEdit] = useState('');

  const deleteTask: IdeleteTask = {
    deleteTask: function (id: string): void {
      setTasks(prevTasks => ([...prevTasks.filter(i => i.id !== id)]));
    }
  };

  const editTask: IeditTask = {
    editTask: function (id: string, content: string): void {
      setForm(content);
      setIdEdit(id);
    }
  };

  const doneTask: IdoneTask = {
    doneTask: function (id: string): void {
      const newTasks = tasks.map((i) => {
        if (i.id === id) {
          return { ...i, status: false }
        } else return i
      })
      console.log(newTasks);
      setTasks(newTasks);
    }
  };

  const listTask = tasks.map(i => (
    <Task task={i} deleteTask={deleteTask} editTask={editTask} doneTask={doneTask} />
  ));

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (form.trim().length === 0) {
      setError('Форма пуста, введите текст');
      return
    }
    if (idEdit.trim().length !== 0) {
      const newTasks = tasks.map((i) => {
        if (i.id === idEdit) {
          return { ...i, content: form }
        } else return i
      })
      console.log(newTasks);
      setTasks(newTasks);
      setForm('');
      return
    }
    const newTask = {
      content: form,
      status: true,
      id: nanoid()
    };
    setTasks(prevTasks => ([...prevTasks, newTask]));
    setForm('');
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm(event.target.value)
  };

  return (
    <div className="container-todo">
      <header className="header-container-todo">
        ToDo List
      </header>
      <form className='form-add' onSubmit={submitHandler}>
        <input type='text' className='input-add' value={form} onChange={changeHandler} />
        <button className='btn-add'>Add</button>
      </form>
      {error && <div>{error}</div>}
      <div className='container-list-task'>
        {listTask}
      </div>
    </div>
  );
}

export default App;
