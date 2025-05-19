import { useState } from "react";

export default function Login() {
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: ''
  });

  function handleValueChange(identifier, event) {
    setEnteredValues((prevState) => {
      return {
        ...prevState,
        [identifier]: event.target.value
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Handle login logic here
    console.log("Logging in with", enteredValues);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <div className="control no-margin">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" onChange={(event) => handleValueChange('email', event)} value={enteredValues.email} />
        </div>

        <div className="control no-margin">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" onChange={(event) => handleValueChange('password', event)} value={enteredValues.password}/>
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
