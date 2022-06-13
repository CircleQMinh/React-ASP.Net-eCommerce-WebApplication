import "./styles.css";

export const TitleNav = (props) => {
    const { title, icon, style, disableIcon } = props;
    return (
        <div className="titleContainer titleContainer--border" style={style ? style : {}}>
            {disableIcon ? (
                <h2>{title}</h2>
            ) : (
                <h2>
                    {icon ? icon : <i className="far fa-star animate__animated animate__heartBeat animate__infinite"></i>}
                    {title}
                    {icon ? icon : <i className="far fa-star animate__animated animate__heartBeat animate__infinite"></i>}
                </h2>
            )}
        </div>
    );
};
