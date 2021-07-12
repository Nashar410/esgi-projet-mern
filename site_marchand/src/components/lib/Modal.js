import React, { useEffect } from "react";
import "./Modal.css";

export default function Modal({ title, children, open, onClose }) {
  useEffect(() => {
    console.log("open updated", open);

    return () => {
      console.log("willUpdate", open);
    };
  }, [open]);

  useEffect(() => {
    console.log("title updated", title);

    return () => {
      console.log("willUpdate", title);
    };
  }, [title]);

  useEffect(() => {
    console.log("did mount");

    return () => {
      console.log("willUnmount");
    };
  }, []);

  return (
    open && (
      <>
        <div className="overlay" onClick={onClose} />
        <div className="modal">
          <div className="modal-title">
            <h2>{title}</h2>
            <button onClick={onClose} className="close-modal">
              CLOSE
            </button>
          </div>
          <div className="modal-content">{children}</div>
        </div>
      </>
    )
  );
}
