import { useContext } from "react";
import { CredentialContext } from "../../contexts/CredentialContext";
import CredentialsForm from "./CredentialsForm";
import { useHistory } from "react-router-dom";

export default function Credentials() {
  const { save, decodeCredentials } = useContext(CredentialContext);
  const history = useHistory();
  return (
    <>
      <CredentialsForm
        onSubmit={(values) => {
            save(values.clientId, values.clientSecret);
            history.push('/panier');
        }}
        defaultValues={decodeCredentials}
      />
    </>
  );
}
