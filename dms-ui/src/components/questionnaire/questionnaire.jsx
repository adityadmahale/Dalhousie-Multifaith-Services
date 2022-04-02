import React, { useEffect, useState } from "react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getQuestions } from "../../services/questions";
import Modal from "../common/modal";

const Questionnaire = () => {
  const options = ["Very seldom", "Sometimes", "Almost always"];
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswer] = useState({});
  const [score, setScore] = useState(-1);

  useEffect(() => {
    const getData = async () => {
      const allQuestions = getQuestions();
      setQuestions(allQuestions);
    };
    getData();
  }, []);

  const handleRadioClick = (event, id) => {
    setAnswer({ ...answers, [id]: event.target.value });
  };

  const calculateScore = () => {
    if (Object.keys(questions).length !== Object.keys(answers).length)
      return -1;
    let displayScore = 0;
    setScore(0);

    for (let key in answers) {
      if (answers[key] === "Very seldom") {
        setScore((prev) => prev + 0);
        displayScore += 0;
      } else if (answers[key] === "Sometimes") {
        setScore((prev) => prev + 1);
        displayScore += 1;
      } else {
        setScore((prev) => prev + 2);
        displayScore += 2;
      }
    }
    setScore(displayScore);
  };

  return (
    <div className="container pt-4">
      <Modal id="exampleModal4">{resultDisplay(score)}</Modal>
      <div className="row">
        <h4 className="link">Spiritual Wellness Score</h4>
        {questions.map((question) => (
          <div key={question.id}>
            <div className="box-card">
              <div className="question-bold">
                <span>{question.question_text}</span>
              </div>
              <div className="radiogroup">
                {options.map((option) => (
                  <div className="wrapper" key={question.id + "-" + option}>
                    <input
                      className="state"
                      type="radio"
                      name={question.id}
                      id={question.id + option}
                      value={option}
                      onChange={(e) => handleRadioClick(e, question.id)}
                    />
                    <label className="label" htmlFor={question.id + option}>
                      <div className="indicator"></div>
                      <span className="text">{option}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="row common-margin-top">
        <button
          type="button"
          className="btn btn-primary btn-text-bold"
          onClick={calculateScore}
          data-bs-toggle="modal"
          data-bs-target="#exampleModal4"
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

const resultDisplay = (score) => {
  if (score === -1) {
    return (
      <div className="text-center card-confirmation">
        <i className="ri-mental-health-fill" style={{ color: "#4d97d4" }}></i>
        <p className="card-text">Please answer all questions</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <CircularProgressbarWithChildren value={(score / 18) * 100}>
        <i className="ri-mental-health-fill" style={{ color: "#4d97d4" }}></i>
        <div style={{ fontSize: 12, marginTop: -5, width: "60%" }}>
          <p className="card-text">{getResult(score)}</p>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

const getResult = (score) => {
  if (score > 12) {
    return "Excellent strength in this dimension";
  } else if (score >= 7 && score <= 12) {
    return "There is room for improvement. Look again at the items in which you scored 1 or 0. What changes can you make to improve your score?";
  } else {
    return "This dimension needs a lot of work. Look again at this dimension and challenge yourself to begin makingsmall steps toward growth here. Remember: The goal is balanced wellness.";
  }
};

export default Questionnaire;
