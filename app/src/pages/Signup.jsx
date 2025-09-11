import { Link } from "react-router";
import "../../css/forms.css";
import { handleEvent, build_LoginPaylod } from "../../utils/forms";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import AppContext from "../AppContext";
import { UserLogin, UserSignup, CheckUsername } from "../../utils/utils";
import Alert from '@mui/material/Alert';

export default function Signup() {
  const { user, setUser } = useContext(AppContext);
  const { token, setToken } = useContext(AppContext);
  const { setProfile } = useContext(AppContext);
  const [userAlert, setUserAlert] = useState(false);
  const [passAlert, setPassAlert] = useState(false);
  const navigation = useNavigate();

  useEffect(() => {
    if (user) {
      navigation("/");
    }
  }, [user]);

  async function Register(formData) {
    const userName = formData.get("username");
    const pass1 = formData.get('pass1');
    const pass2 = formData.get('pass2');
    const firstName = formData.get('firstName');
    const lastName = formData.get('lastName');
    const email = formData.get('email');

    const passCheck = PasswordCompare(pass1, pass2);
    const userCheck = await CheckUsername(userName);

    if (!passCheck) {
      setPassAlert(true);
      //alert passwords don't match
    }

    if (!userCheck) {
      //alert username already exists
      setUserAlert(true)
    }

    if (passCheck && userCheck) {
      let tempToken = await UserSignup(userName, pass1, firstName, lastName, email);
      if (tempToken.token) {
        setToken(tempToken.token)
        setUser(userName)
        setProfile({
          first_name: firstName,
          last_name: lastName,
          email: email,
          preferences: {theme: "dark", layout: "default"},
          roles: []
        })
      }

    }
  }

  function resetAlert() {
    setUserAlert(false);
    setPassAlert(false);
  }

  function PasswordCompare(pass1, pass2) {
    if (pass1 != pass2) {
      return false
    }

    return true;
  }

  return (
    <div className="signup">
      {passAlert && (
        <Alert severity="error" onClose={() => resetAlert()}>
          Passwords do not match
        </Alert>
      )}
      {userAlert && (
        <Alert severity="error" onClose={() => resetAlert()}>
          Username is already in use
        </Alert>
      )}
      <form className="signup-form" action={Register}>
        <label>First Name: </label>
        <input name="firstName" type="text" /> <br />
        <label>Last Name: </label>
        <input name="lastName" type="text" /><br />
        <label>Email: </label>
        <input name="email" type="text" /><br />
        <label>Username: </label>
        <input name="username" type="text" /> <br />
        <label>Password: </label>
        <input name="pass1" type="password" /><br />
        <label>Re-enter Password: </label>
        <input name="pass2" type="password" /><br />
        <button type="submit">Register</button>
      </form>

    </div>
  )
}