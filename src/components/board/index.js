import React,{useState,useEffect} from 'react'

import TaskList from '../taskList';
import styles from '../../assets/css/board.module.scss'
import initialData from '../intial-data';
// React DnD
import { DragDropContext } from 'react-beautiful-dnd';
// Email Service
import overDueMail from '../../services/emailService'



function Index() {

    let [dataState,setDataState] = useState(initialData);
    let [initialDataState,setInitialDataState] = useState();

     // Task OverDue Check and Sending Email
     let taskCheck = (taskId,taskListType)=>{
        if(taskListType !== 'done'){
            let currDate = (new Date()).getTime();;
            let addDateStamp = (new Date(dataState.tasks[taskId].date)).getTime();
            if(addDateStamp<currDate){
                let taskContent = dataState.tasks[taskId].content;
                let taskDate = dataState.tasks[taskId].date;
                overDueMail(taskContent,taskDate,taskListType);
            }
        }
    }
     // InitialDateState State for OverDue Tasks Check (To be done Once upon App re-run)
    useEffect(() =>{    
        dataState.columns['todo'].taskIds.map((taskId)=>{
            taskCheck(taskId,'todo')
            return null;
        })
        dataState.columns['doing'].taskIds.map((taskId)=>{
            taskCheck(taskId,'doing')
            return null;
        })
    },[initialDataState]) // eslint-disable-line

    // Getting Inital Data from local Storage
    useEffect(() =>{
        let tasks = localStorage.getItem('tasks');
        if(tasks){
            setDataState(JSON.parse(tasks));
            setInitialDataState(JSON.parse(tasks))
        }
    },[])

    // Storing Updated Data State in localStorage
    useEffect(() =>{
        localStorage.setItem('tasks',JSON.stringify(dataState))
    },[dataState])
    
    
    // Adding New Task
    let addTask = (key,task,listType,dateAdded)=>{
        dataState.tasks[key] = {id:key,content:task,date:dateAdded}
        dataState.tasks[listType] =dataState.columns[listType].taskIds.push(key);
        setDataState({...dataState})
    }
    // Updating Task
    let updateTask = (taskId,newTaskVal,newDateAdded) => {
        dataState.tasks[taskId] = {id:taskId,content:newTaskVal,date:newDateAdded};
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
                        <TaskList type="todo"  dataState = {dataState} addTask={addTask} updateTask={updateTask}/>
                        <TaskList  type="doing"  dataState = {dataState} addTask={addTask} updateTask={updateTask}/>
                        <TaskList  type="done"  dataState = {dataState} addTask={addTask} updateTask={updateTask}/>
                </div>
            </DragDropContext>
        </div>
    )
}

export default Index
