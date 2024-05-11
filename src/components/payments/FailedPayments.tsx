const FailedPayments = ({ props }: any) => {
  const { handleHidePaymentArea, paymentErrorMessages, serverErrorMessages } =
    props;

  return (
    <div className="readyToPay">
      <div className="failedPayments">
        <h4 className="font-semibold tracking-wide text-white/70">
          {paymentErrorMessages
            ? paymentErrorMessages
            : serverErrorMessages
            ? serverErrorMessages
            : ""}
        </h4>
        <button
          type="button"
          onClick={() => {
            handleHidePaymentArea();
          }}
        >
          try again
        </button>
      </div>
    </div>
  );
};

export default FailedPayments;
