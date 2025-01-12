import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/authslice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import buttonLoader from "./../assets/button-loader.gif";

function Login() {
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    // e.preventDefault();
    // dispatch();
    // sample dummy data
    // login({
    //   username: "johndoe",
    //   password: "Password1234",
    // })
    console.log("login");

    try {
      console.log(data);
      const session = await dispatch(login(data)).unwrap();
      if (session) {
        console.log(session);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-[70vh] lg:min-h-[78vh] flex justify-center items-center">
      <div className="bg-white border-2 mt-10 rounded-lg flex flex-col w-full max-w-md min-h-[440px] shadow-2xl max-sm:w-[90%]">
        <form onSubmit={handleSubmit(handleLogin)} autoComplete="off">
          <div className="flex flex-col items-center mt-10 mx-auto my-6">
            <h2 className="font-poppins text-[35px] font-semibold text-purple-700 max-sm:text-3xl">
              Login
            </h2>
            <div className="w-[80px] border-2 border-purple-700 mt-2 max-sm:w-14"></div>
          </div>
          {error && (
            <p className="text-red-600 mt-8 text-center">{error.message}</p>
          )}
          <div className="flex flex-col items-center">
            <div className="relative flex items-center w-[80%] sm:w-[70%] border-2 border-gray-400 rounded-full my-2 px-2">
              <input
                placeholder="Username"
                {...register("username", {
                  required: "*required",
                })}
                className="w-full pl-2 py-2 text-base font-semibold outline-none bg-transparent"
              />
              {errors?.username && (
                <span className="text-red-500 absolute left-4 bottom-[32px] bg-white">
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className="relative flex items-center w-[80%] sm:w-[70%] border-2 border-gray-400 rounded-full my-2 px-2">
              <input
                type="password"
                placeholder="Password"
                autoComplete="new-password"
                {...register("password", { required: "*required" })}
                className="w-full p-2 text-base font-semibold outline-none bg-transparent"
              />
              {errors?.password && (
                <span className="text-red-500 absolute left-4 bottom-[32px] bg-white">
                  {errors.password.message}
                </span>
              )}
            </div>
          </div>
          <div className=" flex items-center gap-2 m-3 pl-16 max-sm:pl-12">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="w-4 h-4"
            />
            <p className="text-base">Remember Me</p>
          </div>
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="h-10 w-44 px-16 py-2 bg-purple-600 text-white font-semibold text-base rounded-full hover:bg-purple-700 max-sm:px-12 flex justify-center items-center"
            >
              {loading ? (
                <img src={buttonLoader} alt="Loading.." className="w-7 h-5" />
              ) : (
                "Login"
              )}
            </button>
          </div>
          <div className=" w-auto flex justify-evenly items-start my-9 ">
            <div>Don't have an Account ?</div>
            <div>
              <Link to="/signup" className="text-black hover:underline">
                Sign Up
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
