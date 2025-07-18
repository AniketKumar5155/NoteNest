const InputField = ({ type = "text", name, value, onChange, placeholder, className = "" }) => {
    
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 w-full ${className}`}
    />
  );
};

export default InputField;
