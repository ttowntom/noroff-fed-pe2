import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, onClose }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    modal.showModal();

    return () => {
      modal.close();
    };
  }, []);

  const handleClose = () => {
    dialog.current.close();
    if (onClose) {
      onClose();
    }
  };

  return createPortal(
    <dialog
      ref={dialog}
      onClose={handleClose}
      className="min-w-[80%] max-w-[90%] rounded-lg bg-light-bg-primary p-6 text-light-text-primary backdrop:bg-black/50 dark:bg-dark-bg-primary dark:text-dark-text-primary md:min-w-[45ch]"
    >
      <div className="flex flex-col">
        <div></div>
        {children}
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
