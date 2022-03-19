import React from "react";
import { useEffect, useState } from "react";
import { getQuestions } from "../../services/questions";
import { toast } from "react-toastify";

const Questionnaire = () => {
  const options = ["Very seldom", "Sometimes", "Almost always"];
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswer] = useState({});
  const [score, setScore] = useState(0);

  toast.configure();

  useEffect(() => {
    const getData = async () => {
      const questions = await getQuestions();
      setQuestions(questions);
    };
    getData();
  }, []);

  const handleRadioClick = (event, id) => {
    setAnswer({ ...answers, [id]: event.target.value });
  };

  const showScore = (displayScore) => {
    toast.success("Your Score is:" + displayScore);
  };

  const calculateScore = (event) => {
    let displayScore = 0;
    setScore(0);

    if (Object.keys(questions).length === Object.keys(answers).length) {
      for (let key in answers) {
        if (answers[key] === "Very seldom") {
          setScore((prev) => prev + 0);
          displayScore += 0;
        } else if (answers[key] === "Sometimes (occasionally)") {
          setScore((prev) => prev + 1);
          displayScore += 1;
        } else {
          setScore((prev) => prev + 2);
          displayScore += 2;
        }
      }
      showScore(displayScore);
    } else {
      toast.info("Please answer all questions");
    }
  };

  return (
    <div className="container pt-4">
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
        >
          Calculate
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
