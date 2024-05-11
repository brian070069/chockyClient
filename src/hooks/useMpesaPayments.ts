import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACTION, CartContext } from "../context/CartContext";

const sendStkPushUrl = "http://127.0.0.1:8000/payments/send/";
const checkTransactionStatusUrl =
  "http://127.0.0.1:8000/payments/check-online/";

export const useMpesaPayment = () => {
  const { mpesaPostRequest } = useMpesaPostService();
  const [, dispatch]: any = useContext(CartContext);

  const [showPaymentArea, setShowPaymentArea] = useState(false);
  const [showPhoneNumber, setShowPhoneNumberBar] = useState(true);
  const navigate = useNavigate();

  //payments
  const [isProcessingPayments, setIsProcessingPayment] = useState(false);
  const [isPaymentSucessful, setIsPaymentSuccesful] = useState(false);
  const [isPaymentFailed, setIsPaymentFailed] = useState(false);
  const [paymentErrorMessages, setPaymentErrorMessages] = useState("");

  // server errors
  const [isServerErrors, setServerErrors] = useState(false);
  const [serverErrorMessages, setServerErrorMessages] = useState("");

  //handleDispayMpesaArea
  const handleDispalyPaymentArea = () => {
    setShowPaymentArea(true);
    setShowPhoneNumberBar(true);
  };

  const handleHidePaymentArea = () => {
    setIsProcessingPayment(false);
    setIsPaymentSuccesful(false);
    setIsPaymentFailed(false);
    setShowPaymentArea(false);
    setShowPhoneNumberBar(false);
    setServerErrors(false);
  };

  // handle payment
  const handleMpesaPayment = async (phone_number: any) => {
    console.log("started");
    try {
      //transaction has started
      setShowPhoneNumberBar(false);
      setIsProcessingPayment(true);
      // send stk push message
      const stkPushData = await mpesaPostRequest(
        sendStkPushUrl,
        phone_number,
        "phone_number"
      );
      const transaction_id = stkPushData?.transaction_id;
      //delay transaction status
      await new Promise((resolve: any) =>
        setTimeout(() => {
          resolve();
        }, 20000)
      );
      // check  transaction status
      if (!transaction_id) {
        setIsProcessingPayment(false);
        setIsPaymentFailed(true);
        setPaymentErrorMessages("an error occured please try again");
        return;
      }

      //transaction id true
      const transactionStatusData = await mpesaPostRequest(
        checkTransactionStatusUrl,
        transaction_id,
        "transaction_id"
      );
      setIsProcessingPayment(false);

      //sucessfull transaction
      if (transactionStatusData.status === true) {
        setIsPaymentSuccesful(true);
        localStorage.setItem("orderedId", transactionStatusData.order_id);
        dispatch({ type: ACTION.RESTORE });
      } else {
        // transaction not sucessful

        setPaymentErrorMessages(transactionStatusData.message);
        setIsPaymentSuccesful(false);
        setIsPaymentFailed(true);
      }
    } catch (err: any) {
      setServerErrors(true);
      setIsProcessingPayment(false);

      setIsPaymentFailed(true);
      if (!err.response) {
        setServerErrorMessages("failed to contact the server please try again");
      } else if (err.response.status === 400) {
        setServerErrorMessages("request failed please try again");
        dispatch({ type: ACTION.RESTORE });
      } else if (err.response.status === 401) {
        localStorage.clear();
        navigate("/login", { replace: true });
      } else if (err.response.status === 503) {
        console.log(err);
        return;
      } else {
        setServerErrorMessages("an error occured please try again");
      }
    }
  };

  return {
    handleMpesaPayment,
    handleDispalyPaymentArea,
    handleHidePaymentArea,
    showPaymentArea,
    showPhoneNumber,
    isProcessingPayments,
    isPaymentFailed,
    paymentErrorMessages,
    isPaymentSucessful,
    isServerErrors,
    serverErrorMessages,
  };
};

const useMpesaPostService = () => {
  const navigate = useNavigate();

  const mpesaPostRequest = async (
    url: any,
    bodyData: any,
    bodyParamName: any
  ) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const requestData = {
        [bodyParamName]: bodyData,
      };

      const response = await axios.post(url, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (err) {
      // err
    }
  };

  return { mpesaPostRequest };
};
