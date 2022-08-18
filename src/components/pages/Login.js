import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  let navigate = useNavigate(); //useNavigate is react router hook
  function handleClick() {
    navigate('/signup');
  }

  return (
    <div className='login-content d-flex flex-column p-3'>
      <div>
        <img src='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/52f5cae7-5e1f-4276-88dd-9b2f7cf6100c/dfbdeij-b044cb27-3b7a-4462-82e5-1fa2919a24e3.png/v1/fill/w_1280,h_686,strp/scrumnyum_by_anthonylo87_dfbdeij-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9Njg2IiwicGF0aCI6IlwvZlwvNTJmNWNhZTctNWUxZi00Mjc2LTg4ZGQtOWIyZjdjZjYxMDBjXC9kZmJkZWlqLWIwNDRjYjI3LTNiN2EtNDQ2Mi04MmU1LTFmYTI5MTlhMjRlMy5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.Ivjdnc5npjXYLIZw7RSZSFLT0Uekq37X4YgnOFDfwg0'></img>
      </div>
      <div className='p-3'>
        <header>Login Page</header>
        <form
          className='loginForm'
          id='loginForm'
          method='POST'
          action='/login'
        >
          <input
            type='text'
            id='username'
            name='username'
            placeholder='Enter Username'
          />
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Enter Password'
          />
          <button type='submit'>Login</button>
          {/* //Login button makes fetch request onClick, if truthy links to /settings */}
        </form>
        {/* button for signing in with thirdparty */}
        <div className='oauthbtn'>
          <a className="btn" href="/oauth">SIGN IN WITH GITHUB</a>
          <p className="sign-in-text">in order to get started</p>
        </div>
        <Link to='/signup'>
          <button type='button'>Sign up</button>
        </Link>
      </div>

      {/* <Link to='/scrum'>Scrum</Link>
      <Link to='/settings'>Settings</Link> */}
    </div>
  );
}

export default Login;
