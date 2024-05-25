import {useState} from "preact/hooks";

export type Paths<T> = T extends Array<infer U>
  ? `${Paths<U>}`
  : T extends object
    ? {
      [K in keyof T & (string | number)]: K extends string
        ? `${K}` | `${K}.${Paths<T[K]>}`
        : never;
    }[keyof T & (string | number)]
    : never;

export function useForm<T extends Record<string, any>>(initialValue: T) {
  const [formState, setFormState] = useState(initialValue);

  const handleFormUpdate = (name: Paths<T>) => {
    return (event: Event) => {
      const {value, checked, type} = event.target as HTMLInputElement;
      const newValue = type === 'checkbox' ? checked : value;
      const properties = name.split(".");
      const state = updateObject(formState, properties, newValue);
      setFormState({...state});
    }
  }

  const updateObject = (obj: T, properties: string[], value: any): any => {
    // walk object path by individual properties
    const currentProperty = properties.shift();
    if (currentProperty) {
      const hasChildren = properties.length > 0;
      if (hasChildren) {
        // recursively update all children
        const childObj = obj[currentProperty];
        const child = updateObject(childObj, properties, value);
        return updateValue(obj, currentProperty, child)
      }
      return updateValue(obj, currentProperty, value);
    }
  }

  const updateValue = (o: object, key: string, value: any) => {
    return Object.assign(o, {...o, [key]: value});
  }

  return {handleFormUpdate, formState}
}