import React, {useContext} from "react";
import Button from "../lib/Button";
import {ListTransactionContext} from '../../contexts/ListTransactionContext.js';


export default function ItemTransaction({item}) {
    const {askRefund} = useContext(ListTransactionContext);
    return (
        <li className={'w3-margin w3-padding w3-row-padding'}>
            <span className={'w3-col s2 m2 l2'}>{item.id}</span>
            <span className={'w3-col s2 m2 l2'}>{(new Date(item.createdAt)).toDateString()}</span>
            <span className={'w3-col s2 m2 l2'}>{item.total}</span>
            <span className={'w3-col s2 m2 l2'}>{item.cart.map((it) => it.name + " ")}</span>
            <span className={'w3-col s2 m2 l2'}>{item.currency}</span>
            {item.type === 'REFUND'
            && <Button className={'w3-col s2 m2 l2 w3-button w3-red'} title="Remboursement"
                     onClick={(item) => askRefund(item)}/>}
        </li>
    );
}
