import styles from "./new.module.css"

export const NewItem = ({item}) => {
    return (
        <div className="container">
            <div className="row">
                <img className="col-12 col-md-4" src={item.url}></img>
                <div className="col-12 col-md-8">
                    <div> <span className={styles.title}>{item.title}</span></div>
                    <div className={styles.dayAuthorText}><span>{item.day}</span> | <span>{item.author}</span></div>
                    <div className={styles.content}>{item.content}</div>
                </div>
            </div>
        </div>
    )
}