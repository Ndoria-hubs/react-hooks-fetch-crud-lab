import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = () => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error fetching questions:', error));
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleDel = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        console.log('Question deleted successfully');
        // Refetch questions after deletion
        fetchQuestions();
      })
      .catch((error) => console.error('Error deleting question:', error));
  }

  const handleUpdate = (id, newCorrectIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ correctIndex: newCorrectIndex })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to update question');
        }
        return res.json();
      })
      .then(() => {
        // Update local state with the new correctIndex value
        setQuestions(prevQuestions =>
          prevQuestions.map(question =>
            question.id === id ? { ...question, correctIndex: newCorrectIndex } : question
          )
        );
      })
      .catch((error) => console.error('Error updating question:', error));
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map(question => (
          <QuestionItem
            key={question.id}
            question={question}
            handleDel={handleDel}
            handleUpdate={handleUpdate}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
