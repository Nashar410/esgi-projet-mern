import {useContext} from "react";
import {ListContext} from "../contexts/ListContext";
import Button from "./lib/Button";
import {CredentialContext} from "../contexts/CredentialContext";
import {useHistory} from 'react-router-dom';

export default function CreateTransactionButton() {
    const {list, totalPrice} = useContext(ListContext);
    const history = useHistory();


    const createTransaction = () => {

        const {clientId, clientSecret} = {...JSON.parse(localStorage.getItem('credential'))};
        console.log(clientId);
        let auth = "";

        if(!clientId || !clientSecret) {
            alert("Entrez vos credentials");
            history.push('/');
            return;
        } else {
            auth = "Basic " + btoa(`${clientId}:${clientSecret}`);
        }

        const data = {
            userId: clientId,
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
            total: totalPrice,
            currency: "EUR",
            shippingAddress: {
                address: "1 rue Bouvier",
                zipCode: "75011",
                city: "Paris",
                country: "France",
            }
        };



        fetch("http://api:3000/api/transactions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": auth
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                // Redirection vers l'url de payment
                if(data.urlPayment){
                    window.location = data.urlPayment;
                }
            });
    };

    return (
        <div className={'w3-row-padding w3-center'}>
            <Button className={'w3-button w3-green'} title="Créer une transaction"
                    onClick={() => createTransaction()}/>
        </div>
    );
}
