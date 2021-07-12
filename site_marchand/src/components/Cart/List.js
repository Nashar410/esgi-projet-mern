import React, { useContext, useState } from "react";
import { ListContext } from "../../contexts/ListContext";
import AddEditItem from "./AddEditItem";
import ListItem from "./ListItem";
import CreateTransactionButton from "../CreateTransactionButton";

export default function List() {
  const { list, totalPrice } = useContext(ListContext);

  const [selectedItem, setSelectedItem] = useState(false);

  const onEdit = (item) => {
    setSelectedItem(item);
  };

  return (
    <div>
      <AddEditItem selectedItem={selectedItem} />
      <ul>
        {list.map((item) => (
          <ListItem key={item.id} item={item} onEdit={onEdit} />
        ))}
      </ul>
      <p>Total price: {totalPrice}</p>
      <CreateTransactionButton />
    </div>
  );
}
