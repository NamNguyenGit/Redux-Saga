import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadUsersStart } from "../redux/actions";

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadUsersStart())
  },[])

  return (
    <>
      <div>
        <h1>Home</h1>
      </div>
    </>
  );
};

export default Home;
