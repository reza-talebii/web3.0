import React, { useContext } from "react";
import { TransactionsContext } from "../../context/TransactionsContext";

//HELPER
const inputClass =
  "w-full border-2 border-white my-2 p-2 rounded-sm bg-transparent text-white border-none text-sm white-glassmorphism";

const errorMassage = {
  addressTo: "address not valid",
  amount: "amount must be a number",
};

//INPUT VALIDATION
const validate = {
  addressTo: {
    required: true,
    pattern: /^0x[a-fA-F0-9]{40}$/,
  },
  amount: {
    required: true,
    pattern: /^\d+\.\d{0,2}$/,
  },
  keyword: {
    required: true,
  },
  message: {
    required: true,
  },
};

const Input = (props) => {
  const { name, register, error, ...inputProps } = props;
  const { handleChange } = useContext(TransactionsContext);

  return (
    <>
      <input
        className={inputClass}
        {...inputProps}
        name={name}
        step="0.01"
        onInput={(e) => handleChange(e, name)}
        {...register(name, validate[name])}
      />

      {/* ERROR HANDLING */}
      {error[name] && (
        <span className="text-red-600">
          {error[name]?.type === "required"
            ? `This field  is require`
            : errorMassage[name]}
        </span>
      )}
    </>
  );
};

export default Input;
