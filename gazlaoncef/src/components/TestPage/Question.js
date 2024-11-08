import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'assets/css/Question.css';
import { Button } from 'reactstrap';

function Question({ question, onChoiceSelect, selectedChoice, showCorrectAnswers }) {
  const [choices, setChoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Harflerin listesi
  const choiceLetters = ['A', 'B', 'C', 'D'];

  useEffect(() => {
    const fetchChoices = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/choices/?question=${question.question_id}`);
        setChoices(response.data);
      } catch (err) {
        setError('Şıklar alınırken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchChoices();
  }, [question.question_id]);

  if (loading) return <div>Şıklar yükleniyor...</div>;
  if (error) return <div>{error}</div>;

  const filteredChoices = choices.filter(choice => choice.question === question.question_id);

  // Doğru cevabın indexini bulma
  const correctChoiceIndex = filteredChoices.findIndex(choice => choice.is_correct === true);

  return (
    <div className="question-card">
      {question.question_image && (
        <img
          src={question.question_image}
          alt="Soru Resmi"
          style={{ width: '250px', height: '250px', marginBottom: '15px' }}
        />
      )}
  
      <h4 dangerouslySetInnerHTML={{ __html: question.question_text }}></h4>
  
      {filteredChoices.length > 0 ? (
        <div className="choice-container">
        {filteredChoices.map((choice, choiceIndex) => (
          <div key={choice.choice_id} className="choice-item">
            <Button
              color="secondary"
              outline
              onClick={() =>
                selectedChoice === choice.choice_id
                  ? onChoiceSelect(question.question_id, null) // Aynı şıka tıklandıysa seçimi kaldır
                  : onChoiceSelect(question.question_id, choice.choice_id) // Yeni bir şık seçildi
              }
              active={selectedChoice === choice.choice_id}
              disabled={showCorrectAnswers}
              style={{
                color:
                  showCorrectAnswers && choiceIndex === correctChoiceIndex
                    ? 'white'
                    : showCorrectAnswers && selectedChoice === choice.choice_id && selectedChoice !== question.correct_choice
                    ? 'white'
                    : selectedChoice === choice.choice_id
                    ? 'white'
                    : 'black',
                backgroundColor:
                  showCorrectAnswers
                    ? choiceIndex === correctChoiceIndex
                      ? 'green'
                      : selectedChoice === choice.choice_id && selectedChoice !== question.correct_choice
                      ? 'red'
                      : 'white'
                    : selectedChoice === choice.choice_id
                    ? 'black'
                    : 'white',
                borderRadius: '25px',
                marginRight: '10px',
              }}
            >
              {choiceLetters[choiceIndex]}
            </Button>
      
            <span
              className="choice-text"
              dangerouslySetInnerHTML={{ __html: choice.choice_text }}
            ></span>
      
            {choice.choice_image && (
              <img
                src={choice.choice_image}
                alt="Şık Resmi"
                style={{ width: '175px', height: '175px', marginLeft: '10px' }}
              />
            )}
          </div>
        ))}
      </div>
      
      ) : (
        <p>Bu soruya ait şık bulunmamaktadır.</p>
      )}
    </div>
  );
  
}

export default Question;
