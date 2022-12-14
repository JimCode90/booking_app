import { createContext, useReducer } from 'react'

const reducer = (state, action) => {
    switch (action.type){
        case 'LOGIN':
            return {...state, user: action.payload };
        case 'LOGOUT':
            return {...state, user: null};
        default:
            return state;
    }
}

//Initial state
const initialState = {
    user: null
}

//Creamos el contexto
const Context = createContext({})

//conext provider
const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = {state, dispatch}
    return <Context.Provider value={value}>
        { children }
    </Context.Provider>
}

export {Context, Provider};