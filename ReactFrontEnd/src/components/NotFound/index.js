import styles from "./notFound.module.css"

export const NotFound = ({title, height, widthImage = 140, styleTitle}) => {
    return (
        <div
            style={{
                padding: 32,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                height: height || "100%",
                width: "100%"
            }}
        >
            <img style={{ width: widthImage }} src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg//assets/a60759ad1dabe909c46a817ecbf71878.png"/>
            <span className={styleTitle ? styleTitle : styles.title}>{title}</span>
        </div>
    )
}