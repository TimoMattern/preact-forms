import './app.css'
import {Checkbox, Input} from "./Input";
import {useForm} from "./useForm";
import {useRef} from "preact/hooks";

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
          <Input name="user.email" type="email" onInput={handleFormUpdate} value={user.email}
                 placeholder="Enter your e-mail address"/>
          <Input name="user.username" type="text" onInput={handleFormUpdate} value={user.username}
                 placeholder="Enter your username"/>
          <Input name="user.password" type="password" onInput={handleFormUpdate} value={user.password}
                 placeholder="Enter your password"/>
        </fieldset>
        <fieldset>
          <legend>Personal information</legend>
          <Input name="user.address.street" type="text" onInput={handleFormUpdate} value={user.address.street}
                 placeholder="Enter your street name"/>
          <Input name="user.address.zipCode" type="text" onInput={handleFormUpdate} value={user.address.zipCode}
                 placeholder="Enter your zip code"/>
        </fieldset>
        <fieldset>
          <legend>Legal</legend>
          <Checkbox name="legal.newsletter" onChange={handleFormUpdate} checked={legal.newsletter}
                    label="Sign me up for that fancy newsletter"/>
          <Checkbox name="legal.privacy" onChange={handleFormUpdate} checked={legal.privacy}
                    label="I have read the privacy policy"/>
        </fieldset>
        <button type="button" onClick={printFormState}>Submit</button>
      </form>
    </>
  )
}
