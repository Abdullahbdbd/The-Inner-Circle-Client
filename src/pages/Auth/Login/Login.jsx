import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const { signInUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location =useLocation();
  const navigate = useNavigate();


  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((res) => {
        console.log(res.user);
        navigate(location?.state || '/')
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="w-[60%] mx-auto">
        <h3 className="text-2xl font-bold">Welcome back</h3>
      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          {/* email field  */}
          <label className="label">Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}

          {/* password field  */}
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          />
          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-red-500">Password must be 6 character</p>
          )}

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p>New to The Inner Circle <Link 
        className="text-blue-500 underline" 
        to={'/register'}
        state={location.state}
        >Register</Link></p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
