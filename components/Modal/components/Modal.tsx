import * as React from "react";
import ReactDOM from "react-dom";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const [isShowModal, setIsShowModal] = React.useState(true);
  const [isBrowser, setIsBrowser] = React.useState(false);

  React.useEffect(() => {
    setIsBrowser(true);
    const detectOutsideClick = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsShowModal(false);
      }
    };
    document.addEventListener("click", detectOutsideClick);

    return () => {
      document.removeEventListener("click", detectOutsideClick);
    };
  }, [setIsShowModal]);

  const element = (
    <>
      {isShowModal && (
        <div className="w-full h-full absolute top-0 bg-black bg-opacity-70 flex justify-center">
          <div className="w-full py-12" ref={wrapperRef}>
            {children}
          </div>
        </div>
      )}
    </>
  );

  if (isBrowser) {
    return ReactDOM.createPortal(
      element,
      document.getElementById("modal-root")!
    );
  } else {
    return null;
  }
};

export default Modal;
