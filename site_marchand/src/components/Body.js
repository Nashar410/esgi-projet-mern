import React, { useEffect, useState } from "react";
import List from "./Cart/List";
import Button from "./lib/Button";
import Modal from "./lib/Modal";
import ListProvider from "../contexts/ListContext";

const elem = [];
const item = { deleteable: false };

function Body() {
  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState(false);

  return (
    <div>
      <Button title="Body button" />
      <Button onClick={() => setVisible(!visible)} title="Display More" />
      {visible && (
        <div>
          {elem.length > 0 && (
            <ul>
              <li>
                {item.deleteable && <button>delete</button>}
                Test
              </li>
            </ul>
          )}
          {elem.length === 0 && "Pas d'éléments"}
          Visible content
        </div>
      )}
      {!visible && <div>Hidden content</div>}
      <Button onClick={() => setModal(!modal)} title="Open modal" />
      <Modal title="Ma modal" open={modal} onClose={() => setModal(false)}>
        <p>Ma description</p>
        <a>Google</a>
        <Button title="test" />
      </Modal>
      <List />
    </div>
  );
}

export default Body;
