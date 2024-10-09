package com.koicenter.koicenterbackend.service;

import com.koicenter.koicenterbackend.configuration.CustomEnviroment;
import com.koicenter.koicenterbackend.model.momo.*;
import com.koicenter.koicenterbackend.util.Encoder;
import com.koicenter.koicenterbackend.util.LogUtils;
import com.mservice.shared.exception.MoMoException;
import org.springframework.stereotype.Service;

@Service
public class CreateOrderMoMo extends AbstractProcess<PaymentRequest, PaymentResponse>{
    public CreateOrderMoMo(CustomEnviroment environment) {
        super(environment);
    }

    public static PaymentResponse process(CustomEnviroment env, String orderId, String requestId, String amount,

                                          String orderInfo, String returnURL, String notifyURL, String extraData,
                                          RequestType requestType, Boolean autoCapture) throws Exception {
        try {
            CreateOrderMoMo m2Processor = new CreateOrderMoMo(env);

            PaymentRequest request = m2Processor.createPaymentCreationRequest(orderId, requestId, amount, orderInfo,
                    returnURL, notifyURL, extraData, requestType, autoCapture);
            PaymentResponse captureMoMoResponse = m2Processor.execute(request);

            return captureMoMoResponse;
        } catch (Exception exception) {
            LogUtils.error("[CreateOrderMoMoProcess] "+ exception);
        }
        return null;
    }


    @Override
    public PaymentResponse execute(PaymentRequest request) throws MoMoException {
        try {
            String payload = getGson().toJson(request, PaymentRequest.class);
            HttpResponse response = execute.sendToMoMo(environment.getMomoEndpoint().getCreateUrl(), payload);

            if (response.getStatus() != 200) {
                throw new MoMoException("[PaymentResponse] [" + request.getOrderId() + "] -> Error API");
            }


            PaymentResponse captureMoMoResponse = getGson().fromJson(response.getData(), PaymentResponse.class);


            LogUtils.info("[PaymentMoMoResponse] Request ID: " + captureMoMoResponse.getRequestId());
            LogUtils.info("[PaymentMoMoResponse] Amount: " + captureMoMoResponse.getAmount());
            LogUtils.info("[PaymentMoMoResponse] Pay URL: " + captureMoMoResponse.getPayUrl());
            LogUtils.info("[PaymentMoMoResponse] Short Link: " + captureMoMoResponse.getShortLink());
            LogUtils.info("[PaymentMoMoResponse] Deeplink: " + captureMoMoResponse.getDeeplink());
            LogUtils.info("[PaymentMoMoResponse] QR Code URL: " + captureMoMoResponse.getQrCodeUrl());

            return captureMoMoResponse;

        } catch (Exception exception) {
            LogUtils.error("[PaymentMoMoResponse] " + exception);
            throw new IllegalArgumentException("Invalid params capture MoMo Request");
        }
    }



    public PaymentRequest createPaymentCreationRequest(String orderId, String requestId, String amount, String orderInfo,
                                                       String returnUrl, String notifyUrl, String extraData, RequestType requestType,
                                                       Boolean autoCapture) {

        try {
            String requestRawData = new StringBuilder()
                    .append(Parameter.ACCESS_KEY).append("=").append(partnerInfo.getAccessKey()).append("&")
                    .append(Parameter.AMOUNT).append("=").append(amount).append("&")
                    .append(Parameter.EXTRA_DATA).append("=").append(extraData).append("&")
                    .append(Parameter.IPN_URL).append("=").append(notifyUrl).append("&")
                    .append(Parameter.ORDER_ID).append("=").append(orderId).append("&")
                    .append(Parameter.ORDER_INFO).append("=").append(orderInfo).append("&")
                    .append(Parameter.PARTNER_CODE).append("=").append(partnerInfo.getPartnerCode()).append("&")
                    .append(Parameter.REDIRECT_URL).append("=").append(returnUrl).append("&")
                    .append(Parameter.REQUEST_ID).append("=").append(requestId).append("&")
                    .append(Parameter.REQUEST_TYPE).append("=").append(requestType.getRequestType())
                    .toString();

            String signRequest = Encoder.signHmacSHA256(requestRawData, partnerInfo.getSecretKey());
            LogUtils.debug("[PaymentRequest] rawData: " + requestRawData + ", [Signature] -> " + signRequest);

            return new PaymentRequest(partnerInfo.getPartnerCode(), orderId, requestId, Language.EN, orderInfo,
                    Long.valueOf(amount), "test MoMo", null, requestType,
                    returnUrl, notifyUrl, "test store ID", extraData, null, autoCapture, null, signRequest);
        } catch (Exception e) {
            LogUtils.error("[PaymentRequest] "+ e);
        }

        return null;
    }
}
