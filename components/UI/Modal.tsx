import React from "react";

interface IModal {
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
}

interface IBackdrop {
  onClose: () => void;
}

interface IModalOverlay {
  children: React.ReactNode;
}

const Backdrop = ({ onClose }: IBackdrop) => {
  return (
    <div
      onClick={onClose}
      className=" fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-20"
    ></div>
  );
};

const ModalOverlay = ({ children }: IModalOverlay) => {
  return (
    <div className="fixed top-[20vh] left-[5%] w-[90%] lg:w-[40rem] lg:left-[calc(50%_-_20rem)] bg-white p-[1rem] overflow-hidden rounded-md drop-shadow-md z-30 transition-all">
      <div>{children}</div>
    </div>
  );
};

function Modal({ children, onClose, title }: IModal): JSX.Element {
  return (
    <div id="overlay">
      <Backdrop onClose={onClose} />
      <ModalOverlay>
        <div className="absolute top-0 inset-x-0 bg-orange-500 p-3">
          <p className="text-white text-center text-xl">{title}</p>
        </div>
        <div className="mt-12">{children}</div>
      </ModalOverlay>
    </div>
  );
}

Modal.defaultProps = {
  title: "Modal",
};

export default Modal;
