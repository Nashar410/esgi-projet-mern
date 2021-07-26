import {
    createContext,
    useEffect,
    useState,
} from "react";

export const ListTransactionContext = createContext();

export default function ListTransactionProvider({ children }) {
    const [transactionList, setTransactionList] = useState([]);
    const {clientId, clientSecret} = {...JSON.parse(localStorage.getItem('credential'))};
    const auth = "Basic " + btoa(`${clientId}:${clientSecret}`);

    useEffect(() => {
        getTransactions();
    }, []);


    const getTransactions = async () => {
        const response = await fetch(
            'http://localhost:3000/api/transactions',
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": auth
                }
            }
        );
        const jsonData = await response.json();
        setTransactionList(jsonData);
    };



    const askRefund = async (item) => {
        alert("unimplemented yet !")
        await fetch('http://localhost:3000/api/transactions/refund/'+item.id,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": auth
                }
            }
        )
    }

    return (
        <ListTransactionContext.Provider
            value={{
                transactionList,
                askRefund,
            }}
        >
            {children}
        </ListTransactionContext.Provider>
    );
}
