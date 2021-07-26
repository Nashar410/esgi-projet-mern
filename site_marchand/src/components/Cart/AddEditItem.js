import React, { useContext, useState, useEffect } from "react";
import { ListContext } from "../../contexts/ListContext";
import Button from "../lib/Button";
import Modal from "../lib/Modal";
import Form from "./Form";

export default function AddEditItem({ selectedItem = false }) {
  const { editElement, addElement } = useContext(ListContext);

  const [modal, setModal] = useState(selectedItem);

  useEffect(() => setModal(selectedItem), [selectedItem]);

  const handleSubmit = (values) => {
    if (modal === true) addElement(values);
    else editElement(values);
    setModal(false);
  };

  return (
    <>
      <Button className={'w3-button w3-blue'} title="Ajouter" onClick={() => setModal(true)} />
      <Modal
        title="Ajouter un produit"
        open={Boolean(modal)}
        onClose={() => setModal(false)}
      >
        <Form onSubmit={handleSubmit} item={modal !== true && modal} />
      </Modal>
    </>
  );
}
