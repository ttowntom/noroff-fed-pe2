import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { byPrefixAndName } from "@awesome.me/kit-8d12afa6e5/icons";

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
      className="dark:text-dark-text-primaryrounded-lg bg-light-bg-primary p-6 text-light-text-primary backdrop:bg-black/50 dark:bg-dark-bg-primary"
    >
      <div className="flex flex-col gap-6">
        <div>
          <button onClick={handleClose} className="absolute right-4 top-4">
            <FontAwesomeIcon
              icon={byPrefixAndName.fas[`circle-xmark`]}
              className="text-color-system-accent-pink hover:text-color-system-accent-pink-dark text-3xl"
            />
          </button>
        </div>
        {children}
      </div>
    </dialog>,
    document.getElementById("modal")
  );
}
