import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './login.scss';

function Login() {
  let navigate = useNavigate(); //useNavigate is react router hook
  function handleClick() {
    navigate('/signup');
  }

  return (
    <div className="login-container">
    <div className='login-content'>
      <div>
        {/* <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/52f5cae7-5e1f-4276-88dd-9b2f7cf6100c/dfbdeij-b044cb27-3b7a-4462-82e5-1fa2919a24e3.png/v1/fill/w_1280,h_686,strp/scrumnyum_by_anthonylo87_dfbdeij-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9Njg2IiwicGF0aCI6IlwvZlwvNTJmNWNhZTctNWUxZi00Mjc2LTg4ZGQtOWIyZjdjZjYxMDBjXC9kZmJkZWlqLWIwNDRjYjI3LTNiN2EtNDQ2Mi04MmU1LTFmYTI5MTlhMjRlMy5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.Ivjdnc5npjXYLIZw7RSZSFLT0Uekq37X4YgnOFDfwg0'></img> */}
      </div>
      <div className='p-3'>
        <header>Login</header>
        <form
          className='loginForm'
          id='loginForm'
          method='POST'
          action='/login'
        >
          <input
            className='username'
            type='text'
            id='username'
            name='username'
            placeholder='Enter Username'
          />
          <input
            className='password'
            type='password'
            id='password'
            name='password'
            placeholder='Enter Password'
          />
          <button className='login_button'type='submit'>LOGIN</button>
          {/* //Login button makes fetch request onClick, if truthy links to /settings */}
        </form>
        {/* button for signing in with thirdparty */}
        <div className='oauthbtn'>
          <a className="btn" href="/oauth">SIGN IN WITH GITHUB</a>
          <img src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' alt='gitHub logo'/>
        </div>
        <Link to='/signup'>
          <button type='button'>SIGN UP</button>
        </Link>
      </div>

      {/* <Link to='/scrum'>Scrum</Link>
      <Link to='/settings'>Settings</Link> */}
    </div>
    </div>
  );
}

export default Login;
