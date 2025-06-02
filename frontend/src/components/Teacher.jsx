import { useState } from "react";
import PropTypes from "prop-types";
import PollingResult from "./PollingResult";
import { Button } from "react-bootstrap";

const Teacher = ({ socket }) => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);
  const [questionPublished, setQuestionPublished] = useState(false);
  const [timer, setTimer] = useState(60);

  const askQuestion = () => {
    const questionData = {
      question,
      options: options.filter((option) => option.trim() !== ""),
      timer,
    };

    if (socket && question && questionData.options.length) {
      socket.emit("teacher-ask-question", questionData);
      setQuestionPublished(true);
    }
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const updateOption = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const askAnotherQuestion = () => {
    setQuestionPublished(false);
    setQuestion("");
    setOptions([""]);
    setTimer(60);
  };

  return (
    <div className="w-[60%] h-[80vh] text-white">
      {questionPublished ? (
        <>
          <PollingResult socket={socket} />
          <div className="flex justify-end mt-4">
            <Button
              className="bg-[#8043f1] rounded-3xl h-10 w-1/4 font-semibold hover:bg-[#7765DA]" 
              variant=""
              onClick={askAnotherQuestion}
            >
              + Ask a new Question
            </Button>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-left">
            <div className="mb-3 px-4 py-1 bg-[#4F0DCE] text-white rounded-full text-sm font-medium">
              ✦ Intervue Poll
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2 text-black">
            Let’s Get Started
          </h1>
          <p className="text-gray-800 mb-6">
            You’ll have the ability to create and manage polls, ask questions,
            and monitor your students responses in real-time.
          </p>
          <div className="flex justify-between items-center">
            <label className="text-black font-bold text-lg">
              Enter Your Question
            </label>
            <div className="flex items-center gap-x-2">
              <select
                value={timer}
                onChange={(e) => setTimer(e.target.value)}
                className="h-8 p-1 border border-gray-300 rounded-sm bg-gray-100 text-black text-sm font-semibold"
              >
                <option value="30" className="font-semibold">
                  30 seconds
                </option>
                <option value="60" className="font-semibold">
                  60 seconds
                </option>
              </select>
            </div>
          </div>
          <div className="relative">
            <textarea
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter question..."
              className="w-full h-30 border border-gray-300 rounded-sm p-4 bg-gray-100 text-black resize-none"
            />
            <span className="absolute bottom-2 right-2 text-gray-500 text-sm">
              {question.length}/100
            </span>
          </div>
          <div>
            <div className="flex justify-between items-center">
              <label className="text-black font-bold uppercase text-sm mt-1 mb-2">
                Edit Options
              </label>
              <label className="text-black font-bold uppercase text-sm mt-1 mb-2">
                Is it correct?
              </label>
            </div>
            <div className="flex flex-col gap-y-3">
              {options.map((option, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-x-3 w-[70%]">
                    <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center">
                      {index + 1}
                    </span>
                    <input
                      type="text"
                      value={option.value}
                      onChange={(e) =>
                        updateOption(index, e.target.value, option.correct)
                      }
                      placeholder={`Enter Option number ${index + 1}`}
                      className="w-full h-11 p-3 border border-gray-300 rounded-sm bg-gray-100 text-black"
                    />
                  </div>
                  <div className="flex items-center gap-x-1">
                    <label className="flex items-center gap-x-1">
                      <input
                        type="radio"
                        name={`correct-${index}`}
                        checked={option.correct === true}
                        onChange={() => updateOption(index, option.value, true)}
                        className="h-4 w-4"
                      />
                      <span className="text-black text-sm">Yes</span>
                    </label>
                    <label className="flex items-center gap-x-1 ml-2">
                      <input
                        type="radio"
                        name={`correct-${index}`}
                        checked={option.correct === false}
                        onChange={() =>
                          updateOption(index, option.value, false)
                        }
                        className="h-4 w-4"
                      />
                      <span className="text-black text-sm">No</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex justify-between mt-4">
            <button
              onClick={addOption}
              className="px-4 py-2 border border-purple-700 text-purple-700 rounded-md hover:bg-purple-100 flex items-center gap-x-2"
            >
              <span>+</span> Add More Option
            </button>
          </div>

          {/* Separator and Right-Aligned Button */}
          <hr className="my-1 border-gray-700" />
          <div className="flex justify-end">
            <Button
              className="bg-[#4F0DCE] rounded-3xl h-10 w-1/5 font-semibold text-white"
              variant="primary"
              onClick={askQuestion}
            >
              Ask Question
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

Teacher.propTypes = {
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
  }).isRequired,
};

export default Teacher;
