const Button = ({ label=`Click me`, className, type = "button", onClick=()=>{}, ...props }) => {
  return (
    <button type={type} className={`py-1 px-2 rounded-md bg-blue-600 text-blue-500 ${className}`} onClick={onClick} {...props}>
      {label}
    </button>
  );
};

export default Button;
