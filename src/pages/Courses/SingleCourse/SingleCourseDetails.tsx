import FailedPayments from "@/components/payments/FailedPayments";
import ProcessingPayments from "@/components/payments/ProcessingPayments";
import ReadyToPay from "@/components/payments/ReadyToPay";
import SuccesfulPayments from "@/components/payments/SuccesfulPayments";
import { useMpesaPayment } from "@/hooks/useMpesaPayments";

const SingleCourseDetails = ({ course, courseDate }: any) => {
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
    <div className="flex flex-col lg:flex-row bg-[#00244C0D] h-full ">
      <div className="flex-1 lg:max-h-[90vh] ">
        <img
          src={course?.courses?.picture}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-[#00244c]  px-6 py-4 flex-1">
        <h4 className="text-2xl font-semibold tracking-wide">
          {course?.courses?.title}
        </h4>
        <p className="text-[#00244c]/70 border-b border-gray-500/50 py-4 font-medium">
          {course?.courses?.more_info}
        </p>
        <div className="text-[#00244c]">
          <div className="grid grid-cols-2 gap-5  items-center border-b border-gray-500/50 py-3">
            <h4 className="text-[#00244c]  font-semibold text-lg">
              Qualifications
            </h4>
            <h5 className="text-[#00244c] text-[16px] tracking-wide flex-1">
              {course?.courses?.qualification}
            </h5>
          </div>
          <div className="grid grid-cols-2 gap-5   items-center border-b border-gray-500/50 py-3">
            <h4 className="text-[#00244c]   flex-nowrap  font-semibold text-lg">
              Study method
            </h4>
            <h5 className="text-[#00244c]  flex-1 text-[16px] tracking-wide">
              {course?.courses?.study_method}
            </h5>
          </div>
          <div className="grid grid-cols-2 gap-5  items-center border-b border-gray-500/50 py-3">
            <h4 className="text-[#00244c]  font-semibold text-lg">Duration</h4>
            <h5 className="text-[#00244c] text-[16px] flex-1 tracking-wide">
              {course?.courses?.duration}
            </h5>
          </div>

          <div className="grid grid-cols-2 gap-5  items-center border-b border-gray-500/50 py-3">
            <h4 className="text-[#00244c]  font-semibold text-lg">Date</h4>
            <h5 className="text-[#00244c] text-[16px] tracking-wide">
              {courseDate}hrs
            </h5>
          </div>
        </div>
        <div>
          <div className="mt-2">
            <h4 className="text-[#00244c] text-md font-medium">Price</h4>
            <h3 className="text-xl font-semibold italic tracking-wide">
              <span>Ksh</span>
              <span className="ml-1">342.00</span>
            </h3>
          </div>
          <button
            onClick={handleDispalyPaymentArea}
            className="bg-[#ffa100] w-full py-3 text-lg font-medium tracking-wide rounded-sm mt-2"
          >
            Book Course
          </button>
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

export default SingleCourseDetails;
