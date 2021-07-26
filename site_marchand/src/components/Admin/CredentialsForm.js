import React, {useContext, useState} from "react";
import Button from "../lib/Button";
import {CredentialContext} from '../../contexts/CredentialContext.js';

const defaultV = {
    clientId: "",
    clientSecret: "",
};

export default function CredentialsForm({onSubmit, defaultValues}) {

    const [values, setValues] = useState(defaultValues || defaultV);

    const _onSubmit = () => {
        onSubmit({...values});
    };

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <form className={'w3-form w3-content'} style={{width: 40 + '%'}}
              onSubmit={(event) => {
                  event.preventDefault();
                  const formData = new FormData(event.target);
                  const data = Array.from(formData.keys).reduce((acc, key) => {
                      acc[key] = formData.get(key);
                      return acc;
                  }, {});
                  console.log("submit Vanilla", data);
                  _onSubmit();
              }}
        >
            <input
                placeholder={`Inscrire l'ID du client ici...`}
                className={'w3-input w3-border'}
                value={values.clientId}
                onChange={handleChange}
                type="text"
                name="clientId"/>
            <input
                placeholder={`Inscrire le client secret ici...`}
                className={'w3-input w3-border'}
                value={values.clientSecret}
                onChange={handleChange}
                type="password"
                name="clientSecret"
            />
            <Button className={'w3-button w3-green w3-section'} title="Se connecter"/>
        </form>
    );
}
