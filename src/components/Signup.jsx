import { useActionState } from "react";
import { isEmail, hasMinLength, isEqualsToOtherValue, isNotEmpty } from "../util/validation";

export default function Signup() {
    function signupAction(prevFormState, formData) {
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');
        const firstName = formData.get('first-name');
        const lastName = formData.get('last-name');
        const role = formData.get('role');
        const acquisition = formData.getAll('acquisition');
        const terms = formData.get('terms');

        let errors = [];
        // Validate the form data
        if(!isEmail(email)) {
            errors.push('Email is not valid');
        }

        if(!isNotEmpty(password)) {
            errors.push('Password is required');
        }
        if(!hasMinLength(password, 8)) {
            errors.push('Password must be at least 8 characters long');
        }
        if(!isEqualsToOtherValue(password, confirmPassword)) {
            errors.push('Passwords do not match');
        }
        if(!isNotEmpty(firstName)) {
            errors.push('First name is required');
        }
        if(!isNotEmpty(lastName)) {
            errors.push('Last name is required');
        }
        if(!isNotEmpty(role)) {
            errors.push('Role is required');
        }
        if(acquisition.length === 0) {
            errors.push('Acquisition is required');
        }
        if(!terms) {
            errors.push('You must agree to the terms and conditions');
        }

        if(errors.length > 0) {
          return { errors, enteredValues: { email, password, confirmPassword, firstName, lastName, role, acquisition, terms } };
        }

        return { errors: null, enteredValues: null };
    }

    const [formState, formAction] = useActionState(signupAction, { errors: null, enteredValues: null });

  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" defaultValue={formState.enteredValues?.email} />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" defaultValue={formState.enteredValues?.password} />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.enteredValues?.confirmPassword}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" defaultValue={formState.enteredValues?.firstName} />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" defaultValue={formState.enteredValues?.lastName} />
        </div>
      </div>

      <div className="control">
        <label htmlFor="role">What best describes your role?</label>
        <select id="role" name="role" defaultValue={formState.enteredValues?.role}>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.enteredValues?.acquisition?.includes('google')}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.enteredValues?.acquisition?.includes('friend')}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" defaultChecked={formState.enteredValues?.acquisition?.includes('other')} />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" defaultChecked={formState.enteredValues?.terms} />I
          agree to the terms and conditions
        </label>
      </div>

      {formState.errors && <ul className="error">
        {formState.errors.map((error, index) => (
          <li key={error}>{error}</li>
        ))}
      </ul>}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button type="submit" className="button">
          Sign up
        </button>
      </p>
    </form>
  );
}
