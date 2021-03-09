import React from "react";


function Login() {
  return tokenCheck === false ? (
    <div className='App'>
      <h1>Welcome to the Meet App</h1>
      <h2>Please Read the Following</h2>
      <h4> Log in to see upcomimg web dev events!</h4>
      <div className='button_cont' align='center'>
        <div class='google-btn'>
          <div class='google-icon-wrapper'>
            <img
              class='google-icon'
              src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
              alt='Google sign-in'
            />
          </div>
          <a
            href="https://82y29j2ihl.execute-api.ca-central-1.amazonaws.com/dev/api/get-auth-url"
            rel='nofollow noopener'
            class='btn-text'
          >
            <b>Sign in with Google</b>
          </a>
        </div>
      </div>
      <a href="https://glenzy.github.io/meet/privacy.html" rel='nofollow noopener'>
        Privacy Policy
      </a>
    </div>
  );
}
export default Login;