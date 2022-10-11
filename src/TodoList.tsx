import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
//rsc
type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList:(todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


const TodoList = (props: TodoListPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const getTasksListItem = (t: TaskType )=> {
        const removeTask = () => props.removeTask(t.id, props.todoListId)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>)=>props.changeTaskStatus(t.id, e.currentTarget.checked, props.todoListId)
        return (
            <li key={t.id} className={t.isDone ? "isDone" : "notIsDone"}>
                <input
                    onChange={changeTaskStatus}
                    type={"checkbox"}
                    checked={t.isDone}
                />
                <span>{t.title}</span>
                <button onClick={removeTask}>x</button>
            </li>
        )
    }
    const tasksList = props.tasks.length
        ? <ul>{props.tasks.map(getTasksListItem)}</ul>
        : <span>Your taskslist is empty :(</span>

    const addTask = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle !== ""){
            props.addTask(trimmedTitle, props.todoListId)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const handlerCreator = (filter: FilterValuesType) => () => props.changeTodoListFilter(filter, props.todoListId)
    const onEnterDownAddTask = (e: KeyboardEvent<HTMLInputElement>)=> e.key === "Enter" && addTask()
    const onChangeSetLocalTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const errorMessage = error ? <div style={{fontWeight: "bold", color: "hotpink"}}>Title is required!</div> : null
    return (
        <div>
            <h3>
                {props.title}
            <button onClick={removeTodoList}>X</button>
            </h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeSetLocalTitle}
                    onKeyDown={onEnterDownAddTask}
                    className={error ? "error" : ""}

                />
                <button onClick={addTask}>+</button>
                {errorMessage}
            </div>
                {tasksList}
            <div>
                <button
                    className={props.filter === "all" ? "active-btn btn": "btn"}
                    onClick={handlerCreator("all")}
                >All</button>
                <button
                    className={props.filter === "active" ? "active-btn btn": "btn"}
                    onClick={handlerCreator("active")}
                >Active</button>
                <button
                    className={props.filter === "completed" ? "active-btn": "btn"}
                    onClick={handlerCreator("completed")}
                >Completed</button>
            </div>
        </div>
    );
};

export default TodoList;