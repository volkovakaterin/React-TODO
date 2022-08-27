import { IdeleteTask } from "../models";

export const deleteTask: IdeleteTask = {
    deleteTask: function (id: string): void {
        console.log(id);
        // const newArray = tasks.filter(i => (i.id !== id));
        // console.log(newArray);

    }
}
    // sayWords: function(words: string): void{
    //     console.log(`${name} говорит "${words}"`);
    // }