# Implementing Context API in REACT APP 

It is a normal todo list  implemented using context api.

Context API is mainly used in small scale application to maintain global state rather than redux.

So, In this app context api is implemented in Redux way. So, It splits up the code and make it look better, allows developer to understand easily.

## Create Context

``` render-babel
import { createContext } from "react";

export const TodoContext = createContext();

```

this above code creates you a context.

## Add UseReducer
``` render-babel
import React, { useReducer } from "react";
import { initalState } from "../store/todo";
import { todoReducer } from "../Reducer/todo";
import { TodoContext } from './todoContext'

const Todo = props => {
  const [state, dispatch] = useReducer(todoReducer, initalState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default Todo;

```

pass a reducer and inital state to useReducer and pass the value to context provider so that you can use state and method where every you wrapped the context


## Create Store
``` render-babel
export const initalState = {
    todos: ['setup webpack', 'create a base ', 'implementing design']
};
```

## Implement Reducer

``` render-babel
export const todoReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TODO': 
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        case 'DELETE_TODO': 
            return {
                ...state,
                todos: state.todos.filter((todo, index) => index !== action.payload)
            }
        default: 
            return state
    }
} 

```

So you can create reducer by above.

## Wrapping parent component with context provider

``` render-babel
<TodoContextProvider>
    <App />
</TodoContextProvider>
```

you must wrap the needed parent component with the specific context provider.


## using context and dispatch

``` render-babel
import React, { useState, useContext } from 'react';
import { TodoContext } from './context/todoContext';

const { state, dispatch } = useContext(TodoContext);

const onClickHandler = () => {
    dispatch({type: 'ADD_TODO', payload: todo})
    setTodo('');
  }
```

you can import the created context and distruct both the value(state and dispatch) from it.



## Welcome

Thank you for checking out!. Suggestion and request are always welcome. 