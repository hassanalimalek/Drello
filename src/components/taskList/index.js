import React from 'react'
import { useState,useRef } from 'react'
import uuid from 'react-uuid'
import cx from 'classnames';
import {BiPencil} from 'react-icons/bi';
import styles from '../../assets/css/taskList.module.scss'
// React DND
import {Droppable,Draggable} from 'react-beautiful-dnd'
// React Notify
import Notifications, {notify} from 'react-notify-toast';

function Index(props) {

    const myRef = useRef(null)
    const executeScroll = () => myRef.current.scrollIntoView({ behavior: 'smooth' })
    // Task Cards States
    let [inputCardState,setInputCardState] = useState(false);
    let [editCardState,setEditCardState] = useState(false);
    let [addCardBtnState,setAddCardBtnState] = useState(true);
    // Task Values States
    let [taskValue,setTaskValue] = useState("");
    let [editTaskId,setEditTaskId] = useState({id:''});
    let [editTaskValue,setEditTaskValue] = useState("");
    let [editTaskCardValue,setEditTaskCardValue] = useState("");



    // Cards Hide and Show.
    let showAddCard = ()=>{
        hideAddCardBtn();
        setEditCardState(false);
        setInputCardState(true);
    }
    let hideAddCard = ()=>{
        showAddCardBtn();
        setInputCardState(false);
    }
    let showEditCard = ()=>{
        hideAddCardBtn();
        setEditCardState(true);
    }
    let hideEditCard = ()=>{
        setEditCardState(false);
        showAddCardBtn();
    }
    let showAddCardBtn = ()=>{
        setAddCardBtnState(true);
    }
    let hideAddCardBtn = ()=>{
        setAddCardBtnState(false);
    }
    
    
    // Adding Task to the main board.js State.
    let addTask = ()=>{
        if(taskValue.length){
            let key = uuid();
            props.addTask(key,taskValue,props.type)
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
    let editTask= (taskId)=>{
        executeScroll();
        hideAddCard();
        editTaskId.id = taskId;
        editTaskCardValue = props.dataState.tasks[taskId].content;
        setEditTaskCardValue(editTaskCardValue)
        setEditTaskId({...editTaskId});
        setEditTaskValue(props.dataState.tasks[taskId].content);
        showEditCard();
    }
  
    // Submitting user task changes.
    let submitChanges = (e)=>{
        props.updateTask(editTaskId.id,editTaskValue,props.type);
        hideEditCard();
        setAddCardBtnState(true);
    }


    // Create Tasks JSX
    let renderTasks = ()=>{
        return (props.dataState.columns[props.type].taskIds).map((taskId,index)=>{
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
                            <button id={taskId} onClick={(e)=>{editTask(taskId)}} className={cx(styles.taskEditBtn)} disabled = {editCardState ? true: false}>
                                  <BiPencil />
                            </button>
                     </div>
                )}
                </Draggable>
             )
        })
    }
 
    
    return (
        <div className={styles.taskList}>
            <h3 className={styles.taskType}>{props.type.charAt(0).toUpperCase() + props.type.slice(1) }</h3>
            <Notifications />
            <Droppable droppableId={props.type}>
                {(provided)=>(
                    <div className={cx(styles.droppableSection,editCardState ? styles.opacitylow : styles.opacityfull)}  
                        ref={provided.innerRef}
                        {...provided.droppableProps}>
                          {renderTasks()}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            
            {/* Input Card */}
            <div className={inputCardState ? styles.inputCardShow : styles.inputCardHide}>
                <textarea ref={input => input && input.focus()}  placeholder="Enter a title for this card..." className={styles.cardTextArea} value={taskValue} onChange={(e)=>{setTaskValue("");setTaskValue(e.target.value)}} type="text"></textarea><br/>
                <span ><button className={styles.addCardBtn} onClick={addTask}>Add Card</button> <button className={styles.hideCardBtn} onClick={hideAddCard}>X</button></span>
            </div>
            {/* Edit Card */}
            <div className={cx(editCardState ? styles.inputCardShow : styles.inputCardHide,styles.editCardContainer)}>
                 <p style ={{whiteSpace: "pre-line"}}  className={styles.taskEdit}>
                               {editTaskCardValue}
                 </p>
                <textarea  ref={input => input && input.focus()}  className={styles.cardTextArea} value={editTaskValue} type="text" onChange={(e)=>{setEditTaskValue(e.target.value);}}/>
                <span><button className={styles.saveCardBtn} onClick={submitChanges}>Save</button><button onClick={hideEditCard} className={styles.hideCardBtn}> X</button></span>
            </div>
            {/* Add Card Button */}
            <button  className={cx(addCardBtnState? styles.inputCardShow : styles.inputCardHide,styles.addNewCardBtn)} onClick={showAddCard} > + Add a New Card</button>
            <div ref={myRef}></div> 
        </div>
    )
}

export default Index
