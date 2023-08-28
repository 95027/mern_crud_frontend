import spinner from "./Spin-1s-200px.svg";

const Loading = () => {
  return (
    <div className="spinner">
      <img src={spinner} alt="Loading" />
    </div>
  )
}

export default Loading