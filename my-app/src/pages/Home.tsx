import { useEffect, useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { loadingClose } from "../state/modal";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [register, setRegister] = useState(false);
  const dispatch = useDispatch();
  dispatch(loadingClose());
  const loading = useSelector((state: any) => state.modal.loading.isLoading);
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.token) {
      navigate("/todo");
    }
  }, [navigate, user.token]);

  return (
    <section className=" bg-blue-950 w-screen h-screen flex justify-center items-center">
      <div className="w-full md:w-3/5 xl:w-2/5 h-3/5  bg-white rounded-xl shadow-2xl shadow-black flex flex-col items-center justify-center">
        {loading ? (
          <Loading />
        ) : register ? (
          <Register setLogin={(value: boolean) => setRegister(value)} />
        ) : (
          <Login setRegister={(value: boolean) => setRegister(value)} />
        )}
      </div>
    </section>
  );
};

export default Home;
