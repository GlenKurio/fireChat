import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
// use this cookie to set, delete , get cookie.
const cookies = new Cookies();

function Auth({ setIsAuth }) {
  async function signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log(result);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="mt-[30vh] flex flex-col gap-[2rem]">
      <p className="text-center font-bold text-2xl">
        Sign in with Google to continue
      </p>
      <button
        onClick={signInWithGoogle}
        className="bg-gray-50 text-gray-950 font-bold uppercase py-4 px-8 rounded-md shadow-gray-700 shadow-md hover:shadow-lg hover:shadow-gray-700 duration-[0.3s]"
      >
        Sign in with google
      </button>
    </div>
  );
}

export default Auth;
