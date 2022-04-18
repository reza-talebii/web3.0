const Input = ({ placeholder, name, type, handleChange }) => {
  const inputClass =
    "w-full border-2 border-white my-2 p-2 rounded-sm bg-transparent text-white border-none text-sm white-glassmorphism";

  return (
    <input
      className={inputClass}
      placeholder={placeholder}
      name={name}
      type={type}
      step="0.01"
      onChange={(e) => handleChange(e, name)}
    />
  );
};

export default Input;
