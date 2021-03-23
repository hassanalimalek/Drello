import React from 'react'
import cx from 'classnames'
import styles from '../../assets/css/header.module.scss';
import {HiClipboardList} from 'react-icons/hi'


function index() {
    return (
        <div className={cx(styles.header)} >
            <span><HiClipboardList className={styles.appIcon}/></span>
            <h2 className={styles.appTitle}>Drello</h2>
        </div>
    )
}

export default index
