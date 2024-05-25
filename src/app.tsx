import './app.css'
import {Checkbox, Input} from "./Input";
import {useForm} from "./useForm";

class User {
  public username: string;
  public email: string;
  public password: string;
  public address: Address;

  constructor(data: any) {
    this.username = data.username;
    this.email = data.email;
    this.password = data.password;
    this.address = data.address ?? new Address({});

  }
}

class Address {
  public street: string;
  public zipCode: string;

  constructor(data: any) {
    this.street = data.street;
    this.zipCode = data.zipCode;
  }
}

const initialFormState = {
  user: new User({}),
  legal: {
    newsletter: false,
    privacy: false
  }
}

export function App() {
  const {
    handleFormUpdate,
    formState: {user, legal}
  } = useForm(initialFormState);

  const printFormState = () => console.log({user, legal})

  return (
    <>
      <h1>My awesome form</h1>
      <form>
        <fieldset>
          <legend>Account information</legend>
          <Input type="email" onInput={handleFormUpdate("user.email")} value={user.email}
                 placeholder="Enter your e-mail address"/>
          <Input type="text" onInput={handleFormUpdate("user.username")} value={user.username}
                 placeholder="Enter your username"/>
          <Input type="password" onInput={handleFormUpdate("user.password")} value={user.password}
                 placeholder="Enter your password"/>
        </fieldset>
        <fieldset>
          <legend>Personal information</legend>
          <Input type="text" onInput={handleFormUpdate("user.address.street")} value={user.address.street}
                 placeholder="Enter your street name"/>
          <Input type="text" onInput={handleFormUpdate("user.address.zipCode")} value={user.address.zipCode}
                 placeholder="Enter your zip code"/>
        </fieldset>
        <fieldset>
          <legend>Legal</legend>
          <Checkbox onChange={handleFormUpdate("legal.newsletter")} checked={legal.newsletter}
                    label="Sign me up for that fancy newsletter"/>
          <Checkbox onChange={handleFormUpdate("legal.privacy")} checked={legal.privacy}
                    label="I have read the privacy policy"/>
        </fieldset>
        <button type="button" onClick={printFormState}>Submit</button>
      </form>
    </>
  )
}
