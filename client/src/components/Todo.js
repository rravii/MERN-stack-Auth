import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';
import todoStyles from '../styles/ToDo.module.css';
import { addTask, deleteTodo, readTask } from '../helper/helper';

export default function Todo() {

    const addToList = () => {
        console.log(todoTask + date);
        
        let addPromise = addTask({todoTask, date});

        toast.promise(addPromise, {
            loading: "Adding...",
            success: <b>Successful Added...!</b>,
            error: <b>Could not add!</b>
        });

        addPromise.then(() => {
            fetchData()
            setTodoTask("");
            setDate("");

        });


    }

    const [todoTask, setTodoTask] = useState('');
    const [date, setDate] = useState('');

    const [todoList, setTodoList] = useState([]);

    useEffect(()=> {
        fetchData()

    }, []);

    const fetchData = () => {
        let readPromise = readTask();

        readPromise.then((response) => {
            // console.log(response.data.data);
            setTodoList(response.data.data);
        })
    }

    const deleteTask = (id) => {
        // axios.delete(`http://localhost:8080/api/delete/${id}`);
        deleteTodo({id});
        fetchData()
    }

  return (

    <div className="container mx-auto">

        <div class="relative rounded-full h-20 w-20 m-5 flex items-center justify-center text-white ml-auto hover:bg-blue-500 hover:text-white">
            <div class="absolute inset-0 rounded-full bg-indigo-500 opacity-75"></div>
            <div class="relative z-10"><Link to='/profile'>Profile</Link></div>
        </div>

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex flex-col justify-between items-center h-screen'>

        <div className={`${todoStyles.glass}`} style={{ width: "45%", paddingTop: '3em' }}>

          <div className='title flex flex-col items-center'>
            <h4 className='text-5xl font-bold'>ToDo</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Add the task that needs to be done.
            </span>
          </div>

          <hr className="border-2 border-gray-200 border-t w-3/4 ml-auto mr-auto mb-4"></hr>

          {/* <form className='py-1' onSubmit={formik.handleSubmit}> */}

            <div className="textbox flex flex-col items-center gap-6">

              <input value={todoTask} onChange={(event) => {setTodoTask(event.target.value)}} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Task' required/>
              <input value={date} onChange={(event) => {setDate(event.target.value)}} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Date and Time' required/>

              <button onClick={addToList} className={styles.btn} type='submit'>Add</button>

            </div>

          {/* </form> */}

        </div>

          <div className={todoStyles.glass}>

          <div className='title flex flex-col items-center'>
            <h1 className='text-2xl font-bold'>Task List</h1>
            <span className='py-4 w-2/3 text-center text-gray-500'>
              Task needed to be done:
            </span>
          </div>
            <div className='flex flex-col-reverse'>
          {todoList.map((val, key) => {
            return (
                <div key={key}  className='flex justify-between m-5'>
                    <h1 className={`${todoStyles.textbox}`}>{val.todoTopic}</h1> 
                    <h1 className={`${todoStyles.textbox}`}>{val.dateAndTime}</h1>
                    <button className={todoStyles.btn} onClick={() => deleteTask(val._id)}> Delete </button>
                </div>
                );
            })}
            </div>

          </div>
       

      </div>
    </div>

  )
}
