import React from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const PopUpModel = ({ isOpen, closeModal, title, text }) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
        className="fixed z-10 inset-0 overflow-y-auto"
        overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
      >
        <div className="relative bg-white rounded-lg w-96 mx-auto p-6">
          <button
            className="absolute top-2 right-2 text-gray-700 hover:text-gray-800"
            onClick={closeModal}
          >
            <FontAwesomeIcon
              icon={faTimes}
              rotate={180}
              className="text-xl mx-2"
            />
          </button>
          <h1 className="text-xl font-bold mb-4">{title}</h1>
          <p className="text-gray-600">{text}</p>
          <button
            className="mt-6 bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default PopUpModel;
