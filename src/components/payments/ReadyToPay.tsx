import * as yup from "yup";
import { useFormik } from "formik";
import { RxCross2 } from "react-icons/rx";
import InLineInputError from "../InputError";
import { twMerge } from "tailwind-merge";

export const phoneNumberRegex = /^(?:\+254|0)[17]\d{8}$/;

export const phoneNumberValidationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("required")
    .matches(phoneNumberRegex, "invalid phone number"),
});

const ReadyToPay = ({ data }: any) => {
  const { handleHidePaymentArea, handleMpesaPayment } = data ?? {};

  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: { phoneNumber: "" },
    validationSchema: phoneNumberValidationSchema,
    onSubmit: (values) => {
      let phoneNumber = values.phoneNumber.replace(/^(0|\+254)/, "254");

      handleMpesaPayment(phoneNumber);
    },
  });

  return (
    <div className="readyToPay">
      <div className="readyToPay__header row">
        <h4>Enter the phone number </h4>
        <button type="button" onClick={handleHidePaymentArea}>
          <i>
            <RxCross2 size={20} />
          </i>
        </button>
      </div>
      <div className="inputContainer row">
        <span>
          A push message will the sent to the phone number to complete the
          transactions
        </span>
        <input
          type="text"
          name="phoneNumber"
          placeholder="e.g 074077467"
          value={values.phoneNumber}
          onChange={handleChange}
          className={twMerge(
            "text-white",
            errors.phoneNumber && touched.phoneNumber ? "border-red-500" : ""
          )}
        />
        <InLineInputError
          touched={touched.phoneNumber}
          errors={errors.phoneNumber}
        />
      </div>

      <div className="payment__buttons row">
        {/* <button>cancel</button> */}
        <button type="button" onClick={() => handleSubmit()}>
          pay
        </button>
      </div>
    </div>
  );
};

export default ReadyToPay;
