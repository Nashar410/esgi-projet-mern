import React, { useState } from "react";
import Button from "../lib/Button";

const defaultV = {
  name: "",
  quantity: 0,
  unitPrice: 0,
};

export default function Form({ onSubmit, item }) {
  const [values, setValues] = useState(item || defaultV);

  const _onSubmit = () => {
    onSubmit({ ...values });
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <form className={'w3-container w3-section'}
      onSubmit={(event) => {
        event.preventDefault();
        // Vanilla JS approch
        // const formData = new FormData(event.target);
        // const data = Array.from(formData.keys).reduce((acc, key) => {
        //   acc[key] = formData.get(key);
        //   return acc;
        // }, {});
        _onSubmit();
      }}
    >
      <input className={'w3-input w3-border'} value={values.name} onChange={handleChange} name="name" />
      <input className={'w3-input w3-border'}
        value={values.quantity}
        onChange={handleChange}
        type="number"
        name="quantity"
      />
      <input className={'w3-input w3-border'}
        value={values.unitPrice}
        onChange={handleChange}
        type="number"
        name="unitPrice"
      />
      <Button className={'w3-button w3-blue w3-section'} title="Submit Form" />
    </form>
  );
}
