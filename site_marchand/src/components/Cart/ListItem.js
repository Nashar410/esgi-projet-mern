import React, {useContext} from "react";
import {ListContext} from "../../contexts/ListContext";
import Button from "../lib/Button";
import {Link} from "react-router-dom";

export default function ListItem({item, onEdit}) {
    const {deleteElement} = useContext(ListContext);

    return (
        <li className={'w3-margin w3-padding w3-row-padding'}>
            <Link className={'w3-quarter'} to={`/items/${item.id}`}>{item.name}</Link>
            <span className={'w3-quarter'}>
                <span className={'w3-left w3-margin-right'}>{item.unitPrice}</span>
                <span className={'w3-left w3-margin-right'}>{item.quantity}</span>
            </span>
            <Button className={'w3-quarter w3-button w3-orange'} title="Editer"
                    onClick={() => onEdit(item)}/>
            <Button className={'w3-quarter w3-button w3-red'} title="Supprimer"
                    onClick={() => deleteElement(item)}/>
        </li>
    );
}
