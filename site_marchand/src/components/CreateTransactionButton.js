import {useContext} from "react";
import {ListContext} from "../contexts/ListContext";
import Button from "./lib/Button";
import {CredentialContext} from "../contexts/CredentialContext";

export default function CreateTransactionButton() {
    const {list, totalPrice} = useContext(ListContext);
    const {token} = useContext(CredentialContext);

    const createTransaction = (modality, currency) => {
        const data = {
            consumer: {
                lastname: "Foo",
                firstname: "Bart",
            },
            billingAddress: {
                address: "1 rue Bouvier",
                zipCode: "75011",
                city: "Paris",
                country: "France",
            },
            cart: list,
            totalPrice,
            currency: currency || "EUR",
            shippingAddress: {
                address: "1 rue Bouvier",
                zipCode: "75011",
                city: "Paris",
                country: "France",
            },
            modality: modality || "achat"
        };

        fetch("http://localhost:3000/api/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Basic " + token,
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };

    let modalityChoice = "achat";

    const _handleChange = function (event) {
        modalityChoice = event.target.value;
    };
    return (
        <div className={'w3-row-padding w3-center'}>
            {/*<select className={'w3-select w3-margin'}*/}
            {/*        onChange={(event) => _handleChange(event)}*/}
            {/*>*/}
            {/*    <option value="achat">Achat</option>*/}
            {/*    <option value="remboursement">Remboursement</option>*/}
            {/*</select>*/}
            <Button className={'w3-button w3-green'} title="Créer une transaction"
                    onClick={() => createTransaction(modalityChoice)}/>
        </div>
    );
}
