import { createContext, useMemo, useState } from "react";

export const CredentialContext = createContext();

export default function CredentialProvider({ children }) {
  const [credential, setCredential] = useState(
    JSON.parse(localStorage.getItem("credential") || "null")
  );

  const save = (clientId, clientSecret) => {
    localStorage.setItem(
      "credential",
      JSON.stringify({
        clientId,
        clientSecret,
      })
    );
    setCredential({
      clientId,
      clientSecret,
    });
  };

  // base64(username:password)
  const token = useMemo(
    () =>
      credential && btoa(`${credential.clientId}:${credential.clientSecret}`),
    [credential]
  );

  return (
    <CredentialContext.Provider
      value={{ decodedCredential: credential, token, save }}
    >
      {children}
    </CredentialContext.Provider>
  );
}
