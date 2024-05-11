import { GiPadlock } from "react-icons/gi";
import SingleItem from "./SingleItem";
import { useContext } from "react";

import { CartContext } from "@/context/CartContext";
import FailedPayments from "@/components/payments/FailedPayments";
import SuccesfulPayments from "@/components/payments/SuccesfulPayments";
import ReadyToPay from "@/components/payments/ReadyToPay";
import { useMpesaPayment } from "@/hooks/useMpesaPayments";
import ProcessingPayments from "@/components/payments/ProcessingPayments";

const Cart = () => {
  const [state]: any = useContext(CartContext);

  const {
    handleMpesaPayment,
    handleDispalyPaymentArea,
    handleHidePaymentArea,
    showPaymentArea,
    showPhoneNumber,
    isProcessingPayments,
    isPaymentFailed,
    paymentErrorMessages,
    isPaymentSucessful,
    serverErrorMessages,
  }: any = useMpesaPayment();

  return (
    <div className="min-h-[90vh]">
      <div className="mt-[70px] max-w-[900px] mx-auto px-3 lg:px-12 py-5 pb-20">
        <div className="flex justify-between items-center">
          <h4 className="text-[17px] lg:text-xl font-medium tracking-wide">
            Your Cart
          </h4>
          <div className="row items-center gap-2">
            <div>
              <p className="text-end w-full text-black/80 text-sm ">Subtotal</p>
              <h4 className="text-[16px] lg:text-[19px] font-medium">
                ksh {state?.subTotals}
              </h4>
            </div>
            <div>
              <button
                onClick={
                  state?.subTotals > 0 ? handleDispalyPaymentArea : () => {}
                }
                className="uppercase bg-red-600 flex flex-row items-center py-3 px-4 rounded-sm text-white gap-2 text-sm tracking-wide font-medium"
              >
                <span>
                  <GiPadlock size={20} />
                </span>
                <span>Checkout</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-6">
          {state.toolsInCart.length <= 0 ? (
            <span className="text-xl text-center">Your Cart is Empty</span>
          ) : (
            state.toolsInCart.map((tool: any) => {
              return <SingleItem key={tool.tool} tool={tool} />;
            })
          )}
        </div>
      </div>

      {/* ready to pay */}
      <>
        {showPaymentArea && (
          <div className="payments row">
            <div className="paymentContainer">
              {showPhoneNumber && (
                <ReadyToPay
                  data={{
                    handleHidePaymentArea,
                    handleDispalyPaymentArea,
                    handleMpesaPayment,
                  }}
                />
              )}

              {/* processing payments */}
              {isProcessingPayments && (
                <ProcessingPayments message="Processing your Payment" />
              )}

              {/* payment successful */}
              {isPaymentSucessful && (
                <SuccesfulPayments
                  props={{
                    message: "payment completed succesfully",
                    handleHidePaymentArea,
                  }}
                />
              )}

              {/* failed payments */}
              {isPaymentFailed && (
                <FailedPayments
                  props={{
                    handleHidePaymentArea,
                    paymentErrorMessages,
                    serverErrorMessages,
                  }}
                />
              )}
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Cart;
