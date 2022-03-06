export const LoadingScreen = ({
  position = "relative",
  heightDiv = 250,
  widthDiv = "100%",
  height = 50,
  width = 50,
}) => {
  return (
    <div 
        style={{ 
            position: position, 
            height: heightDiv,
            width: widthDiv,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 100
        }}>
        <div
            className="spinner-border text-primary"
            role="status"
            style={{ height: height, width: width }}
        >
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  );
};
