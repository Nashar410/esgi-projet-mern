import {
    createContext,
    useEffect,
    useState,
} from "react";

export const ListTransactionContext = createContext();

export default function ListTransactionProvider({ children }) {
    const [transactionList, setTransactionList] = useState([]);

    useEffect(() => {
        getTransactions();
    }, []);

    const {clientToken} = {...JSON.parse(localStorage.getItem('credential'))};
    console.log("test", 'adzadaadada');

    const getTransactions = async () => {
        const response = await fetch(
            'http://localhost:3000/api/transactions',
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": clientToken
                }
            }
        );
        const jsonData = await response.json();
        console.log(jsonData)
        setTransactionList(jsonData);
    };



    const askRefund = async (item) => {
        alert("unimplemented yet !")
        await fetch('http://localhost:3000/api/transactions/refund/'+item.id,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": clientToken
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
