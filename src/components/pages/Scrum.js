import React, { useState } from 'react';
import Board from '../Board.jsx';
import Card from '../Card.jsx';
import { useLocation, Link } from 'react-router-dom';



function Scrum(props) {
  //TO DO
  // Do we need to refer to backend when clicking settings?
  // How to logout?
  // Associating user's stickes w/ their acct and populating them on ws entry ///

  // dummy card variable
  const dummyCard = [{
    'task-title': 'Discuss Github Pronunciation',
    'task-desc': 'Is it github, or jithub?',
    snack: 'Trail-Mix'
  },
  {
    'task-title': 'Discuss Github Pronunciation',
    'task-desc': 'Is it github, or jithub?',
    snack: 'Trail-Mix'
  },
];

  // set state for cards
  const [cards, setCards] = useState([...dummyCard]);

  // STRETCH FEATURE:
  // below const allows us to grab state passed from
  // WSSelector to populate our title
  // const location = useLocation();

  // Grabs data from each form field when submitting
  const taskSubmit = (event) => {
    event.preventDefault();
    const taskData = new FormData(event.target);
    const taskObj = Object.fromEntries(taskData.entries());
    event.target.reset();
    console.log(taskObj);
    // send get request to DB with task info in body
    // fetch('URL', {
    // method: 'POST',
    // body: JSON.stringify(taskObj)
    // })
    // populate the card 
    setCards([...cards, taskObj])
  }

  return (
    <div className='scrum-container'>
      <header className="scrum-header">
        <h1>My Workspace</h1>
        {/* <h1>{location + ' Workspace'}</h1> */}
        <nav className='scrum-nav'>
          <Link to='/settings'>
            <button className="scrum-buttons" type='button'>Settings</button>
          </Link>
          <button className='scrum-buttons'>Logout</button>
        </nav>
      </header>
      {/* Form element for post it creation */}
      <main className='scrum-main'>
        <form className='stickie-form' id='task_form' onSubmit={taskSubmit}>
          {/* Title, description, snack */}
          {/* <label htmlFor='task-title'>Title:</label> */}
          <input required type='text' name='task-title' id='task-title' placeholder='Title' ></input>
          {/* <label htmlFor='task-desc'>Description:</label> */}
          <textarea
            placeholder='Description'
            className='stickie-description'
            form='task_form'
            id='task-desc'
            name='task-desc'
            rows='10'
            cols='30'
          ></textarea>
          {/* <label htmlFor='snack'>Snack:</label> */}
          <input required type='text' name='snack' className='snack-text' id='snack' placeholder='Snack' ></input>
          <input type='submit' value='Submit' className='scrum-description-button'></input>
        </form>
        {/* 4 columns for our post its (w/ drag and drop ability) */}
        <div className='board-area'>
          <Board id='board-1' className='board' title='To Start'>
            {/* <Card id='card-1' className='card' draggable='true' >
            </Card> */}
            {cards.map((card, index) => {
              return (
                <Card id={'card-' + index} className='card' draggable='true'>
                  <p>{card['task-title']}</p>
                  <p>Description: {card['task-desc']}</p>
                  <p>Snack: {card.snack}</p>
                </Card>
              )
            })}
          </ Board>
          <Board id='board-2' className='board' title='In Progress' >
          </ Board>
          <Board id='board-3' className='board' title='Blocked' >
          </ Board>
          <Board id='board-4' className='board' title='In Review' >
          </ Board>
          <Board id='board-5' className='board' title='Complete' >
          </ Board>
        </div>
      </main>
    </div>
  );
}

export default Scrum;
