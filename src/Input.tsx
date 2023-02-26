import {useState} from "preact/hooks";

interface BaseProps {
  name: string;
}

interface InputProps extends BaseProps {
  type: string;
  value: string;
  onInput: (e: Event) => void;
  placeholder: string;
}

interface CheckboxProps extends BaseProps {
  checked: boolean;
  onChange: (e: Event) => void;
  label: any;
}


export function Input({value, onInput, ...props}: InputProps) {
  const [currentValue, setCurrentValue] = useState(value);
  const handleInput = (event: Event) => {
    const {value} = event.target as HTMLInputElement;
    setCurrentValue(value);
    onInput && onInput(event);
  }

  return <input onInput={handleInput} value={currentValue} {...props} />
}

export function Checkbox({checked, onChange, label, ...props}: CheckboxProps) {
  const [currentChecked, setCurrentChecked] = useState(checked);
  const handleChange = (event: Event) => {
    const {checked} = event.target as HTMLInputElement;
    setCurrentChecked(checked);
    onChange && onChange(event);
  }

  return (
    <label>
      <input type="checkbox" onChange={handleChange} checked={currentChecked} {...props} />
      {label}
    </label>
  )
}