import React from 'react'
import { useState } from 'react'
import uuid from 'react-uuid'
import cx from 'classnames';
import {BiPencil} from 'react-icons/bi';
import styles from '../../assets/css/taskList.module.scss'
import {useEffect} from 'react'
import {Droppable,Draggable} from 'react-beautiful-dnd'

import Notifications, {notify} from 'react-notify-toast';

function Index(props) {
    
    let [inputCardState,setInputCardState] = useState(false);
    let [editCardState,setEditCardState] = useState(false);
  
    let [taskValue,setTaskValue] = useState("");
    let [editTaskId,setEditTaskId] = useState("");
    let [editTaskValue,setEditTaskValue] = useState("");

    useEffect(() =>{
        if(editTaskId){
            setEditTaskValue(props.dataState.tasks[editTaskId].content);
        }
    },[editTaskId])
   

    // Cards Hide and Show.
    let showAddCard = ()=>{
        setInputCardState(true);
        hideEditCard();
    }
    let hideAddCard = ()=>{
        setInputCardState(false);
    }
    let showEditCard = ()=>{
        hideAddCard();
        setEditCardState(true);
    }
    let hideEditCard = ()=>{
        setEditCardState(false);
    }
    
    
    // Adding Task to the main board.js state.
    let addTask = ()=>{
        let key = uuid();
        if(taskValue.length){
            props.addTask(key,taskValue,'todo')
            hideAddCard();
            hideEditCard();
            setTaskValue("");
        }
        else{
            let myColor = { background: '#D41A1A', text: "#FFFFFF" };
            notify.show("Task cannot be empty", "custom", 3000, myColor);
        }
      
    }

    // Executed upon edit btn click.
    let editTask= (e)=>{
        setEditTaskId(e.target.id);
        showEditCard();
    }
  
    // Submitting user task changes.
    let submitChanges = (e)=>{
        props.updateTask(editTaskId,editTaskValue,"todo");
        hideEditCard();
    }

    // Create Tasks JSX
    let renderTasks = ()=>{
        
        return (props.dataState.columns['todo'].taskIds).map((taskId,index)=>{
            
            return (
                <Draggable key={taskId}  draggableId = {taskId} index ={index} >
                 {(provided)=>(
                      <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className={styles.taskWrapper}
                      >     
                            <p style ={{whiteSpace: "pre-line"}}  className={styles.task} index={index} >
                                {props.dataState.tasks[taskId].content}
                            </p>
                            <BiPencil id={taskId} onClick={editTask} className={styles.taskEditBtn}/>
                       </div>
                )}
                  </Draggable>
                
             )
        })
    }
 
    
   
    return (
        <div className={styles.taskList}>
            <h3 className={styles.taskType}>To Do</h3>
            <Notifications />
            <Droppable droppableId="todo">
                {(provided)=>(
                    <div className={styles.droppableSection}  
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                          {renderTasks()}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            
            {/* Input Card */}
            <div className={inputCardState ? styles.inputCardShow : styles.inputCardHide}>
                <textarea placeholder="Enter a title for this card..." className={styles.cardTextArea} value={taskValue} onChange={(e)=>{setTaskValue("");setTaskValue(e.target.value)}} type="text"></textarea><br/>
                <span><button className={styles.addCardBtn} onClick={addTask}>Add Card</button> <button className={styles.hideAddCardBtn} onClick={hideAddCard}>X</button></span>
            </div>
            {/* Edit Card */}
            <div className={editCardState ? styles.inputCardShow : styles.inputCardHide}>
                <textarea className={styles.cardTextArea} value={editTaskValue} type="text" onChange={(e)=>{setEditTaskValue(e.target.value)}}/>
                <span><button className={styles.saveCardBtn} onClick={submitChanges}>Save</button></span>
            </div>
            {/* Add Card Button */}
            <button className={cx(inputCardState ? styles.inputCardHide : styles.inputCardShow,styles.addNewCardBtn)} onClick={showAddCard} > + Add a New Card</button>
        </div>
    )
}

export default Index