import React, {FunctionComponent, useState, FormEvent, ChangeEvent} from 'react';
import {combineReducers, createStore, Store} from 'redux';
import {Provider, useDispatch, useSelector} from 'react-redux';
import "./tailwind.output.css"
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type  Todo = {
  index: number;
  text: string;
};

type TodoState = {
  todos: Todo[];
};

function addTodo(todoText: string) {
    return {
        type: 'AddTodo',
        payload: todoText
    } as const;
}

function deleteTodo(index: number) {
    return {
        type: 'DeleteTodo',
        payload: index
    } as const;
}

type Actions = ReturnType<typeof addTodo> | ReturnType<typeof deleteTodo>;

function todoReducer(state: Todo[] = [], action: Actions) {
    switch (action.type) {
        case 'AddTodo':
            return state.concat({ index: state.length + 1, text: action.payload });
            case 'DeleteTodo':
                return state.filter(todo => todo.index !== action.payload);
    }
    return state;
}

const rootReducer = combineReducers<TodoState>({
    todos: todoReducer
});

function configureStore(): Store<TodoState> {
    return createStore(rootReducer, undefined);
}

const store = configureStore();

const Redux:FunctionComponent = () => (
    <Provider store={store}>
        <ToDo />
    </Provider>
);

const ToDo:FunctionComponent = () => {
    const [newTodo, setNewTodo] = useState("");
    const updateNewTodo = () => (e: ChangeEvent<HTMLInputElement>) =>
        setNewTodo(e.currentTarget.value);

    const todos: Todo[] = useSelector((state: TodoState) => state.todos);
    const dispatch = useDispatch();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addTodo(newTodo));
        setNewTodo("");
    };

    const dispatchNewTodo = (index: number) => () => {
        dispatch(deleteTodo(index));
    };

    const [visible, setVisible] = useState(false);

    return (
        <div className="h-screen bg-gradient-to-r from-pink-200 to-purple-400 p-20 flex content-start flex-wrap place-content-center">
        <div className="h-full w-1/3 p-4 bg-white rounded-lg">
            <div className="overflow-y-auto h-full transform">
                <table className="table-fixed w-full">
                    <thead>
                    {todos.map(todos => (
                        <tr key={todos.index}>
                            <th className="w-1/4 px-4 py-2">
                                <input type="checkbox" className="mt-2 py-1 px-4"/>
                            </th>
                            <th className="font-sans w-1/2 px-4 py-2 text-gray-600 text-black break-words">
                                {todos.text}
                            </th>
                            <th className="w-1/4 px-4 py-2">
                                <button className="bg-red-500 hover:bg-red-700 text-white rounded-full h-6 w-6 flex items-center justify-center"
                                        onClick={dispatchNewTodo(todos.index)}>
                                    <FontAwesomeIcon icon={faTimes}/>
                                </button>
                            </th>
                        </tr>
                    ))}
                    </thead>
                </table>
            </div>
            <div className="flex justify-center absolute inset-x-0 bottom-0">
            <button onClick={() => setVisible(!visible)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white text-3xl
                               rounded-full h-16 w-16 mb-12">
                <FontAwesomeIcon icon={faPlus}/>
            </button>
            </div>
            {visible && <form id="form" onSubmit={handleSubmit}>
                <div className="flex justify-center">
                    <div className="absolute bottom-0 flex justify-center mb-16">
                        <input
                            className="font-sans text-gray-700 text-base font-bold mb-2 p-1
                                        flex justify-center text-center border-solid border-2
                                        border-black border-opacity-25 rounded-lg bg-gray-100 tracking-wider hover:bg-white mb-16"
                            placeholder="Add new todo"
                            value={newTodo}
                            onChange={updateNewTodo()}
                            required
                        />
                    </div>
                </div>
            </form>
            }

        </div>
    </div>
    );
};

export default Redux
