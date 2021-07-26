import React, {useContext, useState} from "react";
import {ListContext} from "../../contexts/ListContext";
import AddEditItem from "./AddEditItem";
import ListItem from "./ListItem";
import CreateTransactionButton from "../CreateTransactionButton";

export default function List() {
    const {list, totalPrice} = useContext(ListContext);

    const [selectedItem, setSelectedItem] = useState(false);

    const onEdit = (item) => {
        setSelectedItem(item);
    };

    const isLogged = () => !!localStorage.getItem("credential");


    return (
        <div>
            <AddEditItem selectedItem={selectedItem}/>
            <ul className={'w3-ul w3-card-4 w3-pale-green'}>
                {list.map((item) => (
                    <ListItem key={item.id} item={item} onEdit={onEdit}/>
                ))}
            </ul>
            <p className={'w3-panel w3-card-4 w3-pale-yellow'}>Prix total: {totalPrice}</p>
            {!!isLogged() && <CreateTransactionButton/>}
        </div>
    );
}
