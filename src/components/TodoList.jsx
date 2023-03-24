import React, { useEffect, useState } from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// Get List from Local Storage
const getListLS = () => {
    let data = JSON.parse(localStorage.getItem('items'));

    if (data) {
        return data;
    }
}

const TodoList = () => {

    const [inputData, setInputData] = useState('');
    const [myList, setMyList] = useState(getListLS);
    const [myId, setMyId] = useState();
    const [toggleSubmit, setToggleSubmit] = useState(true);


    // Store List to Local Storage
    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(myList))
    }, [myList])


    const addItem = () => {
        if (inputData !== '') {
            setMyList([...myList, inputData]);
            setInputData('');
        }
    }
    const deleteItem = (id) => {
        const tempList = [...myList];
        tempList.splice(id, 1);
        setMyList(tempList);
    }

    const submitEditedItem = () => {
        const tempList = [...myList];
        tempList.splice(myId, 1, inputData);
        setMyList(tempList);
        setInputData('');
        setToggleSubmit(true);
    }

    const editItem = (id) => {
        setInputData(myList[id]);
        setMyId(id);
        setToggleSubmit(false);
    }


    return (
        <>
            <div className='main_container'>
                <div className='todo_container'>
                    <div className="input_row">
                        <input
                            className='input_field'
                            value={inputData}
                            type="text"
                            placeholder='Enter Your Task'
                            onChange={(e) => setInputData(e.target.value)}
                            onKeyDown={(e) => {
                                if (toggleSubmit) {
                                    if (e.keyCode === 13) {
                                        addItem()
                                    }
                                }
                                else if (toggleSubmit === false) {
                                    if (e.keyCode === 13) {
                                        submitEditedItem()
                                    }
                                }

                            }}
                        />

                        {
                            toggleSubmit ? (
                                <IconButton color="primary" onClick={() => addItem()}>
                                    <AddCircleIcon />
                                </IconButton>) : (<IconButton color="primary" onClick={() => submitEditedItem()}>
                                    <EditIcon />
                                </IconButton>)
                        }
                    </div>
                    <div className="todo_list_container">
                        <h1>TODO List</h1>
                        <div className="todo_list_content">
                            {
                                myList.map((element, id) => {
                                    return (
                                        <div className="todo_row" key={id}>
                                            <p>{element}</p>
                                            <div className="todo_icons">
                                                <IconButton color="primary" onClick={() => editItem(id)}>
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="primary" onClick={() => deleteItem(id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TodoList;