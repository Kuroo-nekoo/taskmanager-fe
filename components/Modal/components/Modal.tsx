import * as React from "react";
import ReactDOM from "react-dom";

const Modal = ({ children }: { children: React.ReactNode }) => {
  const [isBrowser, setIsBrowser] = React.useState(false);

  React.useEffect(() => {
    setIsBrowser(true);
  }, []);

  const element = (
    <div className="w-screen h-screen absolute top-0 bg-black bg-opacity-70 flex justify-center">
      <div className="w-full py-12 h-">
        <div>{children}</div>
      </div>
    </div>
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
