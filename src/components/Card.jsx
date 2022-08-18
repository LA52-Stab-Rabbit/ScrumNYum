import React from 'react';
import './card.scss'

function Card(props) {
  // console.log(props.cards)
  const dragStart = event => {
    const target = event.target;
    console.log('drag start!');
    event.dataTransfer.setData('card_id', target.id);
  }

  const dragOver = event => {
    event.stopPropagation();
  }
  
  return (
    <div className='stickie' id={props.id} onDragStart={dragStart} onDragOver={dragOver} draggable='true'>
      {props.children}
    </div>
  )
}

export default Card;