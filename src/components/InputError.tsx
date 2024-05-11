import { BsShieldExclamation } from "react-icons/bs";

interface InLineInputErrorProps {
  touched: boolean | undefined;
  errors: string | undefined;
}

const InLineInputError = ({ touched, errors }: InLineInputErrorProps) => {
  return (
    <div className=" input__error">
      <section className="">
        {touched && errors ? (
          <section className="row">
            <i>
              <BsShieldExclamation />
            </i>
            <p className="errorMessage">{errors}</p>
          </section>
        ) : (
          ""
        )}
      </section>
    </div>
  );
};

export default InLineInputError;
