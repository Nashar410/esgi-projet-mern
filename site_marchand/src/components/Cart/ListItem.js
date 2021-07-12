import React, { useContext } from "react";
import { ListContext } from "../../contexts/ListContext";
import Button from "../lib/Button";
import { Link } from "react-router-dom";

export default function ListItem({ item, onEdit }) {
  const { deleteElement } = useContext(ListContext);

  return (
    <li>
      <Link to={`/items/${item.id}`}>{item.name}</Link> {item.unitPrice}{" "}
      {item.quantity}
      <Button title="Delete" onClick={() => deleteElement(item)} />
      <Button title="Edit" onClick={() => onEdit(item)} />
    </li>
  );
}
