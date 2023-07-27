import React, {
  useState,
  useEffect,
  useReducer,
  useContext,
  useRef
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";
import Input from "../UI/Input/Input";

// reducer function
function emailReducer(state, action) {
  if (action.type === "EMAIL_INPUT") {
    return { newState: action.payload, isValid: action.payload.includes("@") };
  }
  if (action.type === "INPUT_BLUR") {
    return { newState: state.newState, isValid: state.newState.includes("@") };
  }
  return { newState: "", isValid: false };
}

// reducer function
function passwordReducer(state, action) {
  if (action.type === "PASSWORD_INPUT") {
    return {
      newState: action.payload,
      isValid: action.payload.trim().length > 6
    };
  }
  if (action.type === "INPUT_BLUR") {
    return {
      newState: state.newState,
      isValid: state.newState.trim().length > 6
    };
  }
  return { newState: "", isValid: false };
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // useReducer() hook args - reducer, initial state, init function
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    newState: "",
    isValid: null
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    newState: "",
    isValid: null
  });

  const ctx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  // examples of ALIAS ASSIGNMENT via object destructuring
  // (a good way of avoiding unnecessary useEffect() executions by PULLING OUT these dependencies from the useEffect hook)
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  // useEffect() hook
  useEffect(() => {
    // using setTimeout() to implement DEBOUNCING on user input for every .5 second
    const identifier = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    // making sure to "cleanup" our old setTimeout() timer BEFORE the next render
    return () => {
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "EMAIL_INPUT", payload: event.target.value });

    // setFormIsValid(event.target.value.includes("@") && passwordState.isValid);
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "PASSWORD_INPUT", payload: event.target.value });

    // setFormIsValid(emailState.isValid && event.target.value.trim().length > 6);
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      ctx.onLogin(emailState.newState, passwordState.newState);
    } else if (!emailIsValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.newState}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.newState}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
