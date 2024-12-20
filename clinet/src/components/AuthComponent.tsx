'use client';
import { useState } from "react";

const AuthComponent = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="tabs">
          <a
            className={`tab tab-bordered ${isLogin ? "tab-active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </a>
          <a
            className={`tab tab-bordered ${!isLogin ? "tab-active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </a>
        </div>

        {/* Login Form */}
        {isLogin ? (
          <div className="mt-8">
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                />
              </div>
              <button className="btn btn-primary w-full mt-4">Login</button>
            </div>
          </div>
        ) : (
          // Sign-up Form
          <div className="mt-8">
            <div className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="input input-bordered w-full"
                />
              </div>
              <button className="btn btn-primary w-full mt-4">Sign Up</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthComponent;
