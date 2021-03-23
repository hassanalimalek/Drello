import React from 'react'

import TodoList from '../todoList';
import DoingList from '../doingList';
import DoneList from '../doneList';

import styles from '../../assets/css/board.module.scss'
import initialData from '../intial-data';

import { DragDropContext } from 'react-beautiful-dnd';

import { useState,useEffect } from 'react'

function Index() {

    let [dataState,setDataState] = useState(initialData);

    useEffect(() =>{
        let tasks = localStorage.getItem('tasks');
        if(tasks){
            setDataState(JSON.parse(tasks));
        }
    },[])

    useEffect(() =>{
        localStorage.setItem('tasks',JSON.stringify(dataState))
    },[dataState])
    
    
    // Adding New Task
    let addTask = (key,task,listType)=>{
        dataState.tasks[key] = {id:key,content:task}
        dataState.tasks[listType] =dataState.columns[listType].taskIds.push(key);
        setDataState({...dataState})
    }
    // Updating Task
    let updateTask = (taskId,newTaskVal,listType)=>{
        dataState.tasks[taskId] = {id:taskId,content:newTaskVal};
        setDataState({...dataState})
    }

    // Drag End Reordering
    let onDragEnd =(result)=>{
       
        const {destination,source,draggableId} = result;
        
        // If Dropped outside of a droppable
        if( !destination){
            const start = dataState.columns[source.droppableId];
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index,1);
      
            const newColumn = {
            ...start,
            taskIds:newTaskIds
            }
            
            const newState = {
            ...dataState,
            columns:{
                ...dataState.columns,
                [newColumn.id]:newColumn,
            },
            }
            setDataState(newState);
            return;
          }
        
        //  Dropped on same place --> No Change
        if(destination.droppableId===source.droppableId && 
        destination.index === source.index){
            return;
        } 
        const start = dataState.columns[source.droppableId];
        const finish = dataState.columns[destination.droppableId]

        // Same List Drop
        if(start === finish){
         const newTaskIds = Array.from(start.taskIds);
         newTaskIds.splice(source.index,1);
         newTaskIds.splice(destination.index,0,draggableId);
        
        const newColumn = {
          ...start,
          taskIds:newTaskIds
        }
        
        const newState = {
          ...dataState,
          columns:{
            ...dataState.columns,
            [newColumn.id]:newColumn,
          },
        }
        setDataState(newState);
        return;
       }
        // Dropping to another list
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index,1);
        const newStart = {
            ...start,
            taskIds:startTaskIds
        }
        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index,0,draggableId);
        const newFinish = {
            ...finish,
            taskIds:finishTaskIds
        }
        const newState = {
            ...dataState,
            columns:{
                ...dataState.columns,
                [newStart.id]:newStart,
                [newFinish.id]:newFinish
        }
        }
        setDataState(newState);
    }


    return (
        <div className={styles.board}>
            <DragDropContext onDragEnd ={onDragEnd} >
                <div className={styles.board_wrapper}>
                        <TodoList  dataState = {dataState} addTask={addTask} updateTask={updateTask}/>
                        <DoingList  dataState = {dataState} addTask={addTask} updateTask={updateTask}/>
                        <DoneList  dataState = {dataState} addTask={addTask} updateTask={updateTask}/>
                </div>
            </DragDropContext>
         

        </div>
    )
}

export default Index
