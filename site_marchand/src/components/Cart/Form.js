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
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // Vanilla JS approch
        const formData = new FormData(event.target);
        const data = Array.from(formData.keys).reduce((acc, key) => {
          acc[key] = formData.get(key);
          return acc;
        }, {});
        console.log("submit Vanilla", data);
        _onSubmit();
      }}
    >
      <input value={values.name} onChange={handleChange} name="name" />
      <input
        value={values.quantity}
        onChange={handleChange}
        type="number"
        name="quantity"
      />
      <input
        value={values.unitPrice}
        onChange={handleChange}
        type="number"
        name="unitPrice"
      />
      <a onClick={(e) => _onSubmit()}>Submit</a>
      <Button title="Submit Form" />
    </form>
  );
}
