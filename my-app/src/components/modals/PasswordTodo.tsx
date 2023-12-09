import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { passwordClose } from "../../state/modal";
import { toast } from "react-toastify";

const PasswordTodo = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { password } = e.target.elements;
    await toast.promise(
      fetch("http://localhost:5000/todo/changePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          password: password.value,
          id: user.todo._id,
        }),
      }).then(async (response) => {
        if (!response.ok) {
          return Promise.reject("Something went wrong");
        }
        dispatch(passwordClose());
      }),
      {
        pending: "Changing password...",
        success: "Password changed",
        error: "Something went wrong",
      },
      {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }
    );
  };
  const handleClose = () => {
    dispatch(passwordClose());
  };
  return (
    <section
      className="fixed h-screen w-screen overflow-hidden flex justify-center items-center z-50 bg-black/50"
      onClick={handleClose}
    >
      <div
        className="relative w-full md:w-2/5 xl:w-1/3 bg-white rounded-xl flex-col flex justify-center items-center p-3"
        onClick={(e: any) => e.stopPropagation()}
      >
        <h2 className="text-center text-3xl mb-3">Change password</h2>
        <form
          className="grid grid-cols-3 gap-4 w-full justify-center"
          onSubmit={handleSubmit}
        >
          <label htmlFor="password" className="p-2">
            New password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="border-2 border-green-700 rounded-md text-center col-span-2"
          />
          <button className="bg-green-700 text-white rounded-md col-span-3 p-3 hover:bg-green-600 duration-300">
            Submit
          </button>
        </form>
        <GrClose
          size={20}
          className="absolute right-3 top-3 cursor-pointer"
          onClick={handleClose}
        />
      </div>
    </section>
  );
};

export default PasswordTodo;
