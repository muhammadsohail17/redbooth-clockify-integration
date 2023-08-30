import React from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const PopUpModel = ({ isOpen, closeModal, title, text }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
      className="fixed inset-0 flex justify-center items-center"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
    >
      <div className="bg-white rounded-lg p-6 flex flex-col max-w-md w-full">
        <div className="flex justify-end p-4">
          <button
            className="text-gray-700 hover:text-gray-800"
            onClick={closeModal}
          >
            <FontAwesomeIcon icon={faTimes} className="text-xl mx-2" />
          </button>
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold mb-4">{title}</h1>
          <p className="text-gray-600">{text}</p>
        </div>
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 rounded-full mt-4"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

export default PopUpModel;
