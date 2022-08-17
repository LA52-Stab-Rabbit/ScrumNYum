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

  // Save workspace
  const saveWorkspace = (event) => {
    event.preventDefault(); 
    const workspaceObj = {}
    // Grab DOM from Board Area
    // const workspace = document.getElementsByClassName('board-area');
    const board = document.getElementsByClassName('board');
    // const stickieTitle = document.getElementsByClassName('stickie');

    // console.log('board: ', board);
    // console.log('board header', board[0].children[0].textContent) //grabs header of column
    // console.log('board-sticky-title', board[0].children[1].children[0].textContent) 
    // console.log('board-sticky-description', board[0].children[1].children[1].textContent) 
    // console.log('board-sticky-snack', board[0].children[1].children[2].textContent) 

    for (let i = 0; i < board.length; i++){
      let tempColumn = board[i].children[0].textContent;
      workspaceObj[tempColumn] = {}; 
      for (let j = 1; j < board[i].children.length; j++){
        let tempSticky = 'sticky' + j;
        workspaceObj[tempColumn][tempSticky] = {};
          workspaceObj[tempColumn][tempSticky].title = board[i].children[j].children[0].textContent;
          workspaceObj[tempColumn][tempSticky].description = board[i].children[j].children[1].textContent;
          workspaceObj[tempColumn][tempSticky].snack = board[i].children[j].children[2].textContent;
      }
    }

    console.log(workspaceObj);

    // console.log('board-sticky', board[0].children) //grabs first sticky
    // console.log('card: ', stickie);
    // console.log('sticky[0]', stickie[0].childNodes[0].innerText);
    // console.log('card_properties: ', card_properties);
    // console.log('workspace: ', workspace)
    // console.log('workspace.childNodes: ', workspace.childNodes);
    // Parse into a JSON object
    // Make a put request to front-end with JSON object
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
                <Card id={'card-' + index} className='stickie' draggable='true'>
                  <p className='stickie-title'>{card['task-title']}</p>
                  <p className='stickie-description'>Description: {card['task-desc']}</p>
                  <p className='stickie-snack'>Snack: {card.snack}</p>
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
          <div className = 'add-section'>
            + Add Section
          </div>
        </div>
        <button className='save-button' onClick={saveWorkspace}>Save</button>
      </main>
    </div>
  );
}

export default Scrum;
