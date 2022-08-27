export interface ITask {
    content: string,
    status: boolean,
    id: string

};

export interface IdeleteTask {
    deleteTask(id: string): void
};

export interface IeditTask {
    editTask(id: string, content: string): void
};

export interface IdoneTask {
    doneTask(id: string): void
};