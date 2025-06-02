import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";
import { ProgressBar, Button } from "react-bootstrap";

const Student = ({ socket }) => {
  const [name, setName] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [connectedStudents, setConnectedStudents] = useState(null);
  const [votingValidation, setVotingValidation] = useState(false);

  useEffect(() => {
    const name = sessionStorage.getItem("studentName");

    if (name) {
      setName(name);
      setShowQuestion(true);
      socket.emit("student-set-name", { name });
    }

    const handleNewQuestion = (question) => {
      setCurrentQuestion(question);
      setShowQuestion(true);
      setSelectedOption("");

      setTimeout(() => {
        setShowQuestion(false);
      }, question.timer * 1000);
    };

    const handleStudentVoteValidation = (connectedStudents) => {
      setConnectedStudents(connectedStudents);
    };

    socket.on("new-question", handleNewQuestion);
    socket.on("student-vote-validation", handleStudentVoteValidation);

    return () => {
      socket.off("new-question", handleNewQuestion);
      socket.off("student-vote-validation", handleStudentVoteValidation);
    };
  }, [socket]);

  const handleSubmit = () => {
    sessionStorage.setItem("studentName", name);
    socket.emit("student-set-name", { name });
    setShowQuestion(true);
  };

  const handlePoling = () => {
    socket.emit("handle-polling", {
      option: selectedOption,
    });
  };

  useEffect(() => {
    const found = connectedStudents
      ? connectedStudents?.find((data) => data.socketId === socket.id)
      : undefined;
    if (found) {
      setVotingValidation(found.voted);
    }
  }, [connectedStudents, socket.id]);

  return (
    <div className="flex justify-center w-full h-[100] p-40">
      {showQuestion && name ? (
        <div className="w-full bg-[#F2F2F2]">
          {currentQuestion ? (
            currentQuestion.answered == false || votingValidation == false ? (
              <div className="gap-y-4 gap-x-4 ml-0 md:ml-4 p-12">
                <h2 className="text-xl font-bold ">
                  Question: {currentQuestion.question}
                </h2>
                {currentQuestion.options.map((option, index) => (
                  <div
                    key={index}
                    className={`flex hover:bg-gray-300 hover:text-black ${
                      selectedOption === option
                        ? "border-2 border-purple-500"
                        : "border border-[#7765DA]"
                    } justify-between my-4 h-6 p-4 cursor-pointer items-center rounded-md`}
                    onClick={() => setSelectedOption(option)}
                  >
                    {option}
                  </div>
                ))}
                <Button
                  className="h-10 bg-purple-600 w-1/5 rounded-lg font-semibold"
                  variant="primary"
                  onClick={handlePoling}
                  disabled={!selectedOption}
                >
                  Submit
                </Button>
              </div>
            ) : (
              <div className="">
                {currentQuestion && (
                  <div className="flex justify-left mb-3">
                    <div className="px-2 text-black rounded-full text-xl font-bold">
                      Question
                    </div>
                  </div>
                )}
                {currentQuestion && (
                  <h2 className="p-2 text-2xl font-bold text-white bg-gray-600 border rounded-lg">
                    {currentQuestion.question}
                  </h2>
                )}
                <div className="mb-12 border border-[#6E6E6E] bg-[#F2F2F2] rounded-lg shadow-md">
                  <ul className="gap-y-4 gap-x-4 border-t border-[#6E6E6E] w-full px-4 py-2">
                    {currentQuestion &&
                      Object.entries(currentQuestion.optionsFrequency).map(
                        ([option], index) => (
                          <div className="m-4 flex items-center" key={option}>
                            <span className="w-8 h-8 bg-[#4F0DCE] text-white rounded-full flex items-center justify-center mr-3">
                              {index + 1}
                            </span>
                            <div className="w-full">
                              <ProgressBar
                                now={
                                  Number(currentQuestion.results[option]) || 0
                                }
                                animated={true}
                                style={{
                                  backgroundColor: "#E0E0E0",
                                  height: "40px",
                                }}
                                className="rounded w-full relative"
                              >
                                <div
                                  className="h-full rounded flex items-center px-3"
                                  style={{
                                    width: `${
                                      Number(currentQuestion.results[option]) ||
                                      0
                                    }%`,
                                    backgroundColor: `rgba(87, 103, 208, ${
                                      (Number(
                                        currentQuestion.results[option]
                                      ) || 0) / 100
                                    })`,
                                  }}
                                >
                                  <span className="text-lg text-black font-semibold">
                                    {option}
                                  </span>
                                </div>
                                {/* Percentage text positioned absolutely at the right end */}
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-black font-semibold">
                                  {Number(currentQuestion.results[option]) || 0}
                                  %
                                </span>
                              </ProgressBar>
                            </div>
                          </div>
                        )
                      )}
                  </ul>
                </div>
              </div>
            )
          ) : (
            <div>
              <div className="flex justify-center">
                <div className="mb-3 px-4 py-1 bg-[#4F0DCE] text-white rounded-full text-sm font-medium">
                  ✦ Intervue Poll
                </div>
              </div>
              <h1 className="text-center text-3xl font-bold text-purple-800">
                Welcome, {name}
              </h1>
              <div className="flex justify-center items-center my-4">
                <div className="h-16 w-16 border-[6px]  border-purple-800 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h1 className="item-center justify-center flex font-bold text-2xl m-8">
                Wait for the teacher to ask questions..
              </h1>
            </div>
          )}
        </div>
      ) : (
        <div className="flex w-full justify-center flex-col items-center gap-y-6">
          <div className="mb-3 px-4 py-1 bg-[#4F0DCE] text-white rounded-full text-sm font-medium">
            ✦ Intervue Poll
          </div>

          <h2 className="text-3xl font-bold text-[#373737] mb-2">
            Let’s <span className="font-extrabold">Get Started</span>
          </h2>

          <p className="text-[#6E6E6E] text-center mb-6 max-w-md">
            If you’re a student, you’ll be able to{" "}
            <span className="font-semibold">submit your answers</span>,
            participate in live polls, and see how your responses compare with
            your classmates.
          </p>

          <div className="flex flex-col w-full max-w-md gap-y-4">
            <label className="text-[#373737] font-medium text-left">
              Enter your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="w-full h-12 p-3 rounded-md bg-[#F2F2F2] border border-[#E0E0E0] text-[#373737] outline-none focus:ring-2 focus:ring-[#7765DA]"
            />
            <Button
              className="h-12 w-full rounded-full bg-gradient-to-r from-[#7765DA] to-[#5767D0] text-white font-semibold hover:opacity-90 transition"
              variant="info"
              size="lg"
              onClick={handleSubmit}
            >
              Continue
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

Student.propTypes = {
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func.isRequired,
    off: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Student;
