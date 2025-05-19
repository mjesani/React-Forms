import { useRef } from "react";

export default function LoginRef() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();


  function handleSubmit(event) {
    event.preventDefault();
    // Handle login logic here
    const enteredValues = {
      email: emailInputRef.current.value,
      password: passwordInputRef.current.value
    };
    console.log("Logging in with", enteredValues);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" ref={emailInputRef} />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" ref={passwordInputRef}/>
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button"
          //type="button" // can be used tp prevent server form submission. Another way is to use onSubmit on form tag with event.preventDefault()
        >Login</button>
      </p>
    </form>
  );
}
