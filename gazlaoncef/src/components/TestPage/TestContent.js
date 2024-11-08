import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from 'components/Navbars/IndexNavbar';
import Footer from 'components/Footers/Footer';
import axios from 'axios';
import Question from './Question';
import { Button, Table } from 'reactstrap';
import ScrollToTop from "react-scroll-to-top";
import MobileMenu from 'components/MainPage/MobileMenu';
import 'assets/css/TestContent.css';

function TestContent() {
  const { testId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedChoices, setSelectedChoices] = useState({});
  const [choices, setChoices] = useState({});
  const [score, setScore] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [emptyAnswers, setEmptyAnswers] = useState(0);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [questionResults, setQuestionResults] = useState({});
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchQuestionsAndChoices = async () => {
      try {
        const questionsResponse = await axios.get(`http://127.0.0.1:8000/questions/?test=${testId}`);
        setQuestions(questionsResponse.data);

        const choicesResponse = await axios.get(`http://127.0.0.1:8000/choices/?test=${testId}`);
        const choicesData = choicesResponse.data.reduce((acc, choice) => {
          const questionId = choice.question;
          if (!acc[questionId]) acc[questionId] = [];
          acc[questionId].push(choice);
          return acc;
        }, {});
        setChoices(choicesData);
      } catch (err) {
        console.log(err.response ? err.response.data : err.message);
        setError('Sorular alınırken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestionsAndChoices();
  }, [testId]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  const handleChoiceSelect = (questionId, choiceId) => {
    setSelectedChoices(prevState => ({
      ...prevState,
      [questionId]: choiceId
    }));
  };

  const handleFinishTest = () => {
    let correctAnswersCount = 0;
    let wrongAnswersCount = 0;
    let emptyAnswersCount = 0;
    const newQuestionResults = {};

    const updatedQuestions = questions.map(question => {
      const selectedChoiceId = selectedChoices[question.question_id];
      const selectedChoice = choices[question.question_id]?.find(choice => choice.choice_id === selectedChoiceId);
      const correctChoice = choices[question.question_id]?.find(choice => choice.is_correct);

      if (selectedChoice) {
        if (selectedChoice.is_correct) {
          correctAnswersCount += 2;
          newQuestionResults[question.question_id] = 'correct';
        } else {
          wrongAnswersCount++;
          newQuestionResults[question.question_id] = 'wrong';
        }
      } else {
        emptyAnswersCount++;
        newQuestionResults[question.question_id] = 'empty';
      }

      return { ...question, correct_choice: correctChoice.choice_text };
    });

    setQuestions(updatedQuestions);
    setScore(correctAnswersCount);
    setCorrectAnswers(correctAnswersCount / 2);
    setWrongAnswers(wrongAnswersCount);
    setEmptyAnswers(emptyAnswersCount);
    setQuestionResults(newQuestionResults);
    setShowCorrectAnswers(true);
    setStatus(correctAnswersCount >= 70 ? "Geçti" : "Kaldı");
  };

  return (
    <div>
      <Navbar />
      <MobileMenu />
      <div className="section">
        <div className="container">
          <div className="row">
            <div className="col-md-8 ml-auto mr-auto">
              <div className="brand text-center">
                <h1>Sorular</h1>
                <hr />
              </div>
            </div>
          </div>
          <div className="row">
            {questions.length > 0 ? (
              questions.map((question, index) => (
                <div className="col-md-12 mb-4" key={question.question_id}>
                  <h4>Soru: {index + 1}</h4>
                  <Question
                    question={question}
                    choices={choices[question.question_id]}
                    onChoiceSelect={handleChoiceSelect}
                    selectedChoice={selectedChoices[question.question_id]}
                    showCorrectAnswers={showCorrectAnswers}
                    correctChoice={question.correct_choice}
                  />
                  {showCorrectAnswers && (
                    <div>
                      {questionResults[question.question_id] === 'correct' && (
                        <p style={{ color: 'green' }}>Doğru</p>
                      )}
                      {questionResults[question.question_id] === 'wrong' && (
                        <div>
                          <p style={{ color: 'red' }}>Yanlış</p>
                        </div>
                      )}
                      {questionResults[question.question_id] === 'empty' && (
                        <p style={{ color: 'gray' }}>Boş</p>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-md-12 text-center">
                <p>Hiç soru bulunamadı.</p>
              </div>
            )}
          </div>

          <Button color="secondary" onClick={handleFinishTest}>
            Sınavı Bitir
          </Button>

          {score !== null && (
            <div className="mt-4">
              <h5 style={{ fontWeight: 'bold', textAlign: 'center' }}>Sonuçlar</h5>
              <div
                className="table-responsive"
              >
                <Table className="table-bordered">
                  <tbody style={{ fontWeight: 'bold' }}>
                    <tr className="table-light">
                      <td>Doğru</td>
                      <td>{correctAnswers}</td>
                    </tr>
                    <tr className="table-secondary">
                      <td>Yanlış</td>
                      <td>{wrongAnswers}</td>
                    </tr>
                    <tr className="table-light">
                      <td>Boş</td>
                      <td>{emptyAnswers}</td>
                    </tr>
                    <tr className="table-secondary">
                      <td>Alınan Puan</td>
                      <td>{score}</td>
                    </tr>
                    <tr className="table-light">
                      <td>Durum</td>
                      <td>{status}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

            </div>
          )}
        </div>
      </div>
      <ScrollToTop smooth />
      <Footer />
    </div>
  );
}

export default TestContent;
