import React from "react";
import { useEffect, useState } from "react";
import { getQuestions } from "../../services/questions";
import { toast } from "react-toastify";

const Questionnaire = () => {
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

  const handleRadioClick = (event) => {
    setAnswer((prev) => ({ ...prev, [event.target.id]: event.target.value }));
  };

  const showScore = (displayScore) => {
    toast.success("Your Score is:" + displayScore, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      draggable: true,
      progress: undefined,
    });
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
      toast.error("Not Attended all Questions", {
        position: "top-right",
        autoClose: 500,
        hideProgressBar: false,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="container pt-4">
      <div className="row">
        <h4>Spiritual Wellness Questions</h4>
        {questions.map((question) => (
          <div>
            <div className="box-card">
              <div className={"question-bold"}>
                <span>{question.id + ")"} </span>
                <span>{question.question_text}</span>
              </div>
              <hr className="horizontal-line" />
                <div className="radiogroup">
                  {question.options.map((option) => (
                    <div className="wrapper">
                    <input class="state" type="radio" name={question.id+"-"+option} id={question.id} value={option} onChange={handleRadioClick}/>
                      <label className="label" for="question.id">
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
          Calculate the Score
        </button>
      </div>
    </div>
  );
};

export default Questionnaire;
