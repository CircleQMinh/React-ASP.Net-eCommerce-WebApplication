function Arrow(props) {
  const { className, style, onClick } = props;
  return (
    <div onClick={onClick} className={className} style={{...style}}>
  
    </div>
  );
}

export default Arrow;
