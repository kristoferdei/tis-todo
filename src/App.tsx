import React, {FormEvent, FunctionComponent, useState} from 'react'
import "./tailwind.output.css"

interface Todo {
    text: string;
}

const App:FunctionComponent = () => {
    const [value, setValue] = useState<string>('');
    const [todos, setTodos] = useState<Todo[]>([]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        addTodo(value);
        setValue('')
    };

    const addTodo = (text: string): void => {
        const newTodos: Todo[] = [...todos, { text }];
        setTodos(newTodos)
    };

    const deleteTodo = (index: number): void => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    return (
        <div className="bg-gray-200 p-5">
        <>
            <h1 className="text-3xl font-bold mb-5">Todo</h1>
            <form onSubmit={handleSubmit}>
                <input className="text-gray-700 text-sm font-bold mb-2 p-1"
                       placeholder="Add new todo"
                       type="text"
                       value={value}
                       onChange={e => setValue(e.target.value)}
                       required
                />
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-5 ml-5"
                        type="submit">
                        Add
                </button>
            </form>
            <section>
                {todos.map((todo: Todo, index: number) => (
                    <div key={index}>
                        <input type="checkbox"
                               className="mr-5"/>
                               {todo.text}
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded mt-5 ml-5"
                                onClick={() => deleteTodo(index)}>
                                Delete
                        </button>
                    </div>
                ))}
            </section>
        </>
        </div>
    );
};

export default App
