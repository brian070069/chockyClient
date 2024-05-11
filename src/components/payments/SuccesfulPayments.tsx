import { useCallback, useEffect, useState } from "react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

const SuccesfulPayments = ({ props }: any) => {
  const [pieces, setPieces] = useState(500);
  const { width, height } = useWindowSize();
  const { handleHidePaymentArea, message } = props;

  const stopConfetti = useCallback(() => {
    setTimeout(() => {
      setPieces(0);
    }, 5000);
  }, [pieces]);

  useEffect(() => {
    stopConfetti();
  }, [pieces]);

  return (
    <div className="readyToPay">
      <div className="succesfulPayments">
        <h4>{message}</h4>
        <button
          type="button"
          onClick={() => {
            handleHidePaymentArea();
          }}
        >
          finish
        </button>
        <Confetti
          gravity={0.1}
          width={width}
          height={height}
          numberOfPieces={pieces}
        />
      </div>
    </div>
  );
};

export default SuccesfulPayments;
