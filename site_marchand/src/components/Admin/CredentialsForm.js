import React, {useContext, useState} from "react";
import Button from "../lib/Button";
import {CredentialContext} from '../../contexts/CredentialContext.js';

const defaultV = {
    clientId: "",
    clientSecret: "",
};

export default function CredentialsForm({onSubmit, defaultValues}) {
    const { token } = useContext(CredentialContext);
    console.log(token);
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
                  // Vérifier si l'utilisateur existe
                  fetch("http://localhost:3000/api/auth/merchant/signin", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                          "x-access-token": "BASIC " + token
                      },
                      body: JSON.stringify({
                          clientId: values.clientId,
                          clientSecret: values.clientSecret
                      }),
                  })
                      .then((res) => res.json())
                      .then((data) => {
                          console.log(data)
                          _onSubmit();
                      });
              }}
        >
            <input
                placeholder={`Inscrire l'username du client ici...`}
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
