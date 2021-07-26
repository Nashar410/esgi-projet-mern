import React from "react";
import "./Modal.css";

export default function Modal({title, children, open, onClose}) {

    return (
        open && (
            <>
                <div className="overlay" onClick={onClose}/>
                <div className="modal w3-section">
                    <div className="modal-title">
                        <button onClick={onClose} className="close-modal">
                            X
                        </button>
                        <h2 className={'w3-margin'}>{title}</h2>

                    </div>
                    <div className="modal-content w3-section">{children}</div>
                </div>
            </>
        )
    );
}
