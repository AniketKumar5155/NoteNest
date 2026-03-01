import SignupForm from "../components/SignupForm";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <SignupForm />
        <div className="mt-6 text-center">
          <Link to="/" className="text-amber-600 hover:underline font-semibold text-sm">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
