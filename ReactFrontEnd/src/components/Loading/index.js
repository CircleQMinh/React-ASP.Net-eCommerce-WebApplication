export const LoadingScreen = ({
  position = "relative",
  heightDiv = 250,
  height = 50,
  width = 50,
}) => {
  return (
    <div 
        style={{ 
            position: position, 
            height: heightDiv,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
        <div
            className="spinner-border text-primary"
            role="status"
            style={{ height: height, width: width }}
        >
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
  );
};
