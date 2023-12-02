import { useState, useRef } from "react";
import Auth from "./Components/Auth";
import Cookies from "universal-cookie";
import Chat from "./Components/Chat";
const cookies = new Cookies();
import { signOut } from "firebase/auth";
import { auth } from "./config/firebase";

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);

  // Using ref to change state of room on button click , not ONHCNAGE in input
  const roomInputRef = useRef(null);

  async function signUserOut() {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  }

  if (!isAuth) {
    return (
      <div className="flex items-center  bg-gray-950 text-gray-50 min-h-screen flex-col py-10">
        <h1 className="text-6xl font-bold ">
          <span className="text-amber-500">Fire</span>ChatApp
        </h1>
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }

  return (
    <div>
      {room ? (
        <Chat room={room} />
      ) : (
        <div className="bg-gray-950 min-h-screen flex flex-col items-center justify-center gap-12">
          <div className="flex flex-col gap-4 text-center">
            <label htmlFor="" className="text-gray-50 font-bold text-2xl">
              Enter Room Name
            </label>
            <input
              className="rounded-lg p-2"
              type="text"
              ref={roomInputRef}
              placeholder="Enter Room Name"
            />
          </div>
          <button
            className="bg-gray-50 text-gray-950 font-bold uppercase py-4 px-8 rounded-md shadow-gray-700 shadow-md hover:shadow-lg hover:shadow-gray-700 duration-[0.3s]"
            onClick={() => setRoom(roomInputRef.current.value)}
          >
            Enter Chat
          </button>
        </div>
      )}
      <div>
        <button onClick={signUserOut}>Sign Out</button>
      </div>
    </div>
  );
}

export default App;
