import React from 'react'
import styles from '@styles/common/loader.module.css'

export default function Loader () {
    return (
        <svg strokeWidth='5' className={styles.ring} viewBox='25 25 50 50'>
            <circle cx='50' cy='50' r='20'></circle>
        </svg>
    )
}
