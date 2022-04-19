const inputClass =
  "w-full border-2 border-white my-2 p-2 rounded-sm bg-transparent text-white border-none text-sm white-glassmorphism";

const Input = (props) => {
  const { placeholder, name, type, handleChange, register, validate, error } =
    props;

  console.log(error.addressTo);

  return (
    <>
      <input
        className={inputClass}
        placeholder={placeholder}
        name={name}
        type={type}
        step="0.01"
        onChange={(e) => handleChange(e, name)}
        {...register(name, validate)}
      />

      {error.addressTo && (
        <span className="text-red-600">{error.addressTo.message}</span>
      )}
    </>
  );
};

export default Input;
