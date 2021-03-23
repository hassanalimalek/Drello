import React from 'react'


import styles from '../../assets/css/subheader.module.scss';

function Index(props) {

  
    return (
        <div className={styles.subheader}>
            <div className={styles.subheader_wrapper}>
                <h3 className={styles.title}>Your Drello Board</h3>
                <button onClick={props.showSideBar} className={styles.menuBtn}> ---  Change Background</button>
            </div>
        </div>
    )
}

export default Index
