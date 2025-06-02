import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ProgressBar } from "react-bootstrap";

const PollingResult = ({ socket }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const handleNewQuestion = (question) => {
    setCurrentQuestion(question);
  };

  useEffect(() => {
    socket.on("new-question", handleNewQuestion);

    return () => {
      socket.off("new-question", handleNewQuestion);
    };
  }, [socket]);

  return (
    <div>
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
      <div className="border border-[#6E6E6E] bg-[#F2F2F2] mb-12 rounded-lg shadow-md">
        <div className="gap-y-4 gap-x-4 border-t border-[#6E6E6E] w-full px-4 py-2">
          {currentQuestion &&
            Object.entries(currentQuestion.optionsFrequency).map(
              ([option], index) => (
                <div className="m-4 flex items-center" key={option}>
                  <span className="w-8 h-8 bg-[#4F0DCE] text-white rounded-full flex items-center justify-center mr-3">
                    {index + 1}
                  </span>
                  <div className="w-full">
                    <ProgressBar
                      now={Number(currentQuestion.results[option]) || 0}
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
                            Number(currentQuestion.results[option]) || 0
                          }%`,
                          backgroundColor: `rgba(87, 103, 208, ${
                            (Number(currentQuestion.results[option]) || 0) / 100
                          })`,
                        }}
                      >
                        <span className="text-lg text-black font-semibold">
                          {option}
                        </span>
                      </div>
                      {/* Percentage text positioned absolutely at the right end */}
                      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-lg text-black font-semibold">
                        {Number(currentQuestion.results[option]) || 0}%
                      </span>
                    </ProgressBar>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

PollingResult.propTypes = {
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func.isRequired,
    off: PropTypes.func.isRequired,
  }).isRequired,
};

export default PollingResult;
