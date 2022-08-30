import React, {createContext, useState} from "react";

export const NameContext = createContext({
    username:'',
    changeUserName: () => {},
})
//
const Store = ({children}) => {
    const [username,setUsername] = useState('');
    const changeUserName = () => {
        setUsername('서용');
    }
    return(
        <NameContext.Provider value={{
            username,
            changeUserName
        }}>
            {children}
        </NameContext.Provider>
    )
}
export default Store;