import "bootstrap/dist/css/bootstrap.min.css";

import { AiFillFileAdd } from "react-icons/ai";
import { AiOutlineDownload } from "react-icons/ai";

import { Link } from "react-router-dom";

import { CSVLink } from "react-csv";

const ProfileHeading = ({
  theme,
  username,
  userId,
  displayOperationsButtons,
  collections,
}) => {
  return (
    <div className="border-bottom d-flex justify-content-between mb-4">
      <h2
        className={`fw-normal fs-1 ${
          theme === "dark" ? "text-white" : "text-dark"
        }`}
      >
        {username}
      </h2>
      <div>
        {displayOperationsButtons && (
          <Link
            title="Create Collection"
            to={`/${userId}/newcollection`}
            className={`btn btn-${theme} px-1 py-0 pb-2 fs-2`}
          >
            <AiFillFileAdd />
          </Link>
        )}
        {!!collections.length && (
          <CSVLink
            title="Download Collections"
            className={`btn mx-2 px-1 py-0 pb-2 fs-2 ${
              theme === "dark" ? "text-white btn-dark" : "btn-light text-dark"
            }`}
            data={collections}
          >
            <AiOutlineDownload />
          </CSVLink>
        )}
      </div>
    </div>
  );
};
export default ProfileHeading;
