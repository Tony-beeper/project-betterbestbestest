import "./RoundedBoxContainer.css";
function RoundedBoxContainer(props) {
  return <div className="rounded-box-container">{props.children}</div>;
}
export default RoundedBoxContainer;
