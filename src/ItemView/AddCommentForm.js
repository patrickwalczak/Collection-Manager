import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import { AiOutlineSend } from "react-icons/ai";

import { Formik } from "formik";
import * as yup from "yup";

import { validationTemplates } from "../helpers/yupHelper";

const AddCommentForm = ({
  setFormData,
  requestStatus,
  commentInputRef,
  theme,
}) => {
  const { validateMultilineTextField } = validationTemplates;

  const schema = yup.object().shape({
    comment: validateMultilineTextField,
  });

  const isDisabled = requestStatus === "loading" ? true : false;

  return (
    <Formik
      validationSchema={schema}
      onSubmit={setFormData}
      initialValues={{ comment: "" }}
    >
      {({ handleSubmit, handleChange, touched, errors, values }) => (
        <Form
          noValidate
          onSubmit={handleSubmit}
          className="col-12 d-flex mb-2 px-0 mx-0"
        >
          <Form.Group className="col-11" controlId="comment">
            <Form.Control
              disabled={isDisabled}
              isInvalid={errors.comment && touched.comment}
              isValid={!errors.comment && values.comment}
              name="comment"
              onChange={handleChange}
              as="textarea"
              style={{ height: "40px" }}
              placeholder="Write a comment..."
              className="themeClass"
              autoFocus
              ref={commentInputRef}
            />
          </Form.Group>

          <button
            title="Send"
            disabled={isDisabled}
            className={`px-0 py-0 col-1 fs-4 btn btn-inherit text-${
              theme === "dark" ? "light" : "dark"
            }`}
            type="submit"
          >
            {!isDisabled && <AiOutlineSend />}
            {isDisabled && (
              <Spinner
                animation="border"
                varint={theme === "dark" ? "light" : "dark"}
              />
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default AddCommentForm;
