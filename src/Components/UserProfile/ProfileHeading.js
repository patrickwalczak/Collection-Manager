import "bootstrap/dist/css/bootstrap.min.css";

import { AiFillFileAdd } from "react-icons/ai";

import { Link } from "react-router-dom";

const ProfileHeading = ({
  theme,
  username,
  userId,
  displayOperationsButtons,
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

      {displayOperationsButtons && (
        <Link
          title="Create Collection"
          to={`/${userId}/newcollection`}
          className={`btn btn-${theme} px-1 py-0 pb-2 fs-2`}
        >
          <AiFillFileAdd />
        </Link>
      )}
    </div>
  );
};
export default ProfileHeading;
