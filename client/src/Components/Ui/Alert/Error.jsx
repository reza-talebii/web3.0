import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactDOM from "react-dom";

import { TransactionsContext } from "../../../context/TransactionsContext";

const Error = () => {
  const { error } = useContext(TransactionsContext);
  const [closeModal, setCloseModal] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const { description, title } = error;

  //SHOW ERROR WHEN HAPPENED CHANGE ERROR STATE
  useEffect(() => {
    if (error) setCloseModal(false);
  }, [error]);

  const topPositionAlert = closeModal ? "hidden" : "block";

  return ReactDOM.createPortal(
    <div
      className={`bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed w-full top-0 ${topPositionAlert}`}
      role="alert"
    >
      <strong className="font-bold">Something bad happened! : </strong>
      <span className="block sm:inline">
        {title}
        {"  "}
        <span
          className="text-blue-800 cursor-pointer"
          onClick={() => setShowMore(!showMore)}
        >
          See More ...
        </span>
        <br />
        {showMore && String(description)}
      </span>

      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg
          onClick={() => setCloseModal(!closeModal)}
          className="fill-current h-6 w-6 text-red-500"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
        </svg>
      </span>
    </div>,
    document.getElementById("alert")
  );
};

export default Error;
