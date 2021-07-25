import React, {useContext} from "react";
import ItemTransaction from './ItemTransaction.js';
import {ListTransactionContext} from '../../contexts/ListTransactionContext.js';

export default function ListTransaction() {
    const {transactionList} = useContext(ListTransactionContext);

    return (
        <div>
            <ul className={'w3-ul w3-card-4 w3-pale-green'}>
                {transactionList.map((item) => (
                    <ItemTransaction key={item.id} item={item}/>
                ))}
            </ul>
        </div>
    );
}
