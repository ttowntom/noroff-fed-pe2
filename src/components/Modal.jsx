import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/**
 * Modal dialog component with backdrop and portal rendering
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to display in modal
 * @param {Function} [props.onClose] - Optional callback when modal closes
 * @returns {ReactPortal} Portal containing modal dialog
 *
 * @example
 * function App() {
 *   const [isOpen, setIsOpen] = useState(false);
 *
 *   return (
 *     <>
 *       <button onClick={() => setIsOpen(true)}>Open Modal</button>
 *       {isOpen && (
 *         <Modal onClose={() => setIsOpen(false)}>
 *           <h2>Modal Content</h2>
 *           <p>This is a modal dialog</p>
 *         </Modal>
 *       )}
 *     </>
 *   );
 * }
 */
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
