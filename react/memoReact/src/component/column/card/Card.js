import React from 'react';
const Card = (props) => {
  return (
    <article id={props.card.id} className={`mt-4 text-center bg-secondary text-white`}>
      <h3>{props.card.question}</h3>
      <h4>{props.card.answer}</h4>
    </article>
  );
}

export default Card;