import { Bars } from "react-loader-spinner";

const ProcessingPayments = ({ message }: any) => {
  return (
    <div className="readyToPay">
      <div className="processingPayments">
        <h2 className="text-white/80">Don`t refresh page</h2>
        <h4>{message}</h4>
        <div className="flex justify-center mt-4">
          <Bars
            height="34"
            width="34"
            color="#7150e6"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ProcessingPayments;
