import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const initialState = {
  email: "",
  password: ""
};

export default function SessionForm(props) {
  const { submit, register } = props;

  const [user, setUser] = useState(initialState);
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    await submit(user).then(resp => {
      history.push("/");
    });
  };
  return (
    <form className="mb-8" onSubmit={handleSubmit}>
      <div className="mb-5">
        <label className="font-semibold text-black-500 text-sm">
          <span className="block mb-1">Email address</span>
          <input
            type="text"
            className="bg-gray-100 block border border-gray-400 px-2 py-2 rounded-sm w-full"
            value={user.email}
            onChange={e => setUser({ ...user, email: e.target.value })}
          />
        </label>
      </div>
      <div className="mb-5">
        <label className="font-semibold text-black-500 text-sm">
          <span className="block mb-1">Password</span>
          <input
            type="password"
            className="bg-gray-100 block border border-gray-400 px-2 py-2 rounded-sm w-full"
            value={user.password}
            onChange={e => setUser({ ...user, password: e.target.value })}
          />
        </label>
      </div>
      <div>
        <input
          className="bg-primary-500 block font-semibold py-2 rounded-sm text-white w-full text-center cursor-pointer"
          type="submit"
          value={register ? "Register" : "Log in"}
        />
      </div>
    </form>
  );
}
