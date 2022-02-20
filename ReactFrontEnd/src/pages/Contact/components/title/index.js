import styles from "./title.module.css";

export const Title = ({title}) => {
    return (
        <div className={styles.titleWrapper}>
            <div className={styles.line}></div>
            <div className={styles.title}>{title}</div>
            <div className={styles.line}></div>
        </div>
    )
}