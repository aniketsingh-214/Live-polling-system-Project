import { useState } from "react";
import io from "socket.io-client";
import "../src/App.css";
import Teacher from "./components/Teacher";
import Student from "./components/Student";

// Initialize Socket.IO with explicit options
const socket = io.connect("https://live-polling-app.onrender.com", {
  transports: ["websocket", "polling"], // Prefer WebSocket, fallback to polling
  withCredentials: true, // Allow credentials if needed
});

const App = () => {
  const [isTeacher, setIsTeacher] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null); 

  const handleRoleSelection = (role) => {
    setSelectedRole(role); 
  };

  const handleContinue = () => {
    if (selectedRole) {
      setIsTeacher(selectedRole === "teacher"); 
    }
    else {
      alert("Please select a role before continuing.");
    }
  };

  return (
    <div className="flex h-screen justify-center items-center bg-[#F2F2F2] text-[#373737]">
      {isTeacher === null ? (
        <div className="flex flex-col justify-center items-center w-full">
          <div className="mb-4 px-4 py-1 bg-[#4F0DCE] text-white rounded-full text-sm font-medium">
            ✦ Intervue Poll
          </div>
          <h1 className="text-4xl font-semibold mb-2">
            Welcome to the{" "}
            <span className="font-bold">Live Polling System</span>
          </h1>
          <p className="text-[#6E6E6E] text-center mb-8">
            Please select the role that best describes you to begin using the
            live polling system
          </p>

          <div className="flex justify-center gap-6 mb-10">
            <button
              onClick={() => handleRoleSelection("student")}
              className={`w-64 p-4 rounded-xl border-2 ${
                selectedRole === "student"
                  ? "border-[#4F0DCE]" 
                  : "border-[#D3D3D3] hover:border-[#4F0DCE]" 
              } transition text-left shadow-sm hover:shadow-md`}
            >
              <div className="font-bold text-lg mb-1">I’m a Student</div>
              <div className="text-sm text-[#6E6E6E]">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry
              </div>
            </button>

            <button
              onClick={() => handleRoleSelection("teacher")}
              className={`w-64 p-4 rounded-xl border-2 ${
                selectedRole === "teacher"
                  ? "border-[#4F0DCE]" 
                  : "border-[#D3D3D3] hover:border-[#4F0DCE]" 
              } transition text-left shadow-sm hover:shadow-md`}
            >
              <div className="font-bold text-lg mb-1">I’m a Teacher</div>
              <div className="text-sm text-[#6E6E6E]">
                Submit answers and view live poll results in real-time.
              </div>
            </button>
          </div>

          <button
            onClick={handleContinue}
            className="px-8 py-2 rounded-full bg-gradient-to-r from-[#7765DA] to-[#5767D0]
                   text-white font-semibold hover:opacity-90 transition"
          >
            Continue
          </button>
        </div>
      ) : isTeacher ? (
        <Teacher socket={socket} />
      ) : (
        <Student socket={socket} />
      )}
    </div>
  );
};


export default App;