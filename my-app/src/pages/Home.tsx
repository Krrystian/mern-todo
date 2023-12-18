import { useEffect, useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import Loading from "../components/Loading";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [register, setRegister] = useState(false);
  const loading = useSelector((state: any) => state.modal.loading.isLoading);
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user.token) {
      navigate("/todo");
    }
  }, [navigate, user.token]);

  return (
    <section className=" bg-[#212922] w-screen h-screen flex flex-col justify-center items-center relative">
      <h1 className="absolute text-6xl font-extrabold text-white top-14 tracking-wider">
        TODO
      </h1>
      <div className="w-full md:w-3/5 xl:w-2/5 h-3/5  bg-white rounded-xl shadow-2xl shadow-black flex flex-col items-center justify-center">
        {loading ? (
          <Loading />
        ) : register ? (
          <Register setLogin={(value: boolean) => setRegister(value)} />
        ) : (
          <Login setRegister={(value: boolean) => setRegister(value)} />
        )}
      </div>
      <div className="absolute top-0 left-0 text-[#AEF6C7] lg:text-base text-sm">
        <h1 className="font-bold">Demo accounts:</h1>
        <p>Login: visit@visit.com Password: visit</p>
        <p>Login: visit2@visit.com Password: visit2</p>
        <h1 className="font-bold">ENABLE 3rd PARTY COOKIES</h1>
      </div>
    </section>
  );
};

export default Home;
