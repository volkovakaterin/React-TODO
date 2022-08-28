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

  const deleteTask: IdeleteTask = { //функция удаляет задачу из списка
    deleteTask: function (id: string): void {
      setTasks(prevTasks => ([...prevTasks.filter(i => i.id !== id)]));
    }};

  const editTask: IeditTask = {  //функция помещает контент задачи в форму для редактирования
    editTask: function (id: string, content: string): void {
      setForm(content);
      setIdEdit(id);
    }};

  const doneTask: IdoneTask = {  //фугкция изменяет статус задачи на выполнена
    doneTask: function (id: string): void {
      const newTasks = tasks.map((i) => {
        if (i.id === id) {
          return { ...i, status: false }
        } else return i
      })
      setTasks(newTasks);
    }};

  const listTask = tasks.map(i => ( //передаём каждую задачу для отрисовки в компонент Task
    <Task key = {i.id} task={i} deleteTask={deleteTask} editTask={editTask} doneTask={doneTask} />
  ));

  const submitHandler = (e: React.FormEvent) => { //добавляем задачу из формы в список
    e.preventDefault();
    setError('');
    if (form.trim().length === 0) { //если поле формы пустое, то показываем сообщение об этом
      setError('Форма пуста, введите текст');
      return
    }
    if (idEdit.trim().length !== 0) { //если в поле формы добавлена задача для редактирования
      const newTasks = tasks.map((i) => {
        if (i.id === idEdit) {
          return { ...i, content: form }
        } else return i
      })
      setTasks(newTasks);
      setForm('');
      return
    }
    const newTask = { //если добавляем новую задачу
      content: form,
      status: true,
      id: nanoid()
    };
    setTasks(prevTasks => ([...prevTasks, newTask]));
    setForm('');
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => { //изменяем содержимое формы при каждом нажатии по клавиатуре
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
      {error && <div className='box-error'>{error}</div>}
      <div className='container-list-task'>
        {listTask}
      </div>
    </div>
  );
}

export default App;
