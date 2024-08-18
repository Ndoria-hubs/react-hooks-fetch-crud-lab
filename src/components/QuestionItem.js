import React from "react";

function QuestionItem({ question, handleDel , handleUpdate}) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleAnswerChange = (event) => {
    const newIndex = parseInt(event.target.value);
    handleUpdate(id, newIndex)
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerChange}>{options}</select>
      </label>
      <button onClick={() => handleDel(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
