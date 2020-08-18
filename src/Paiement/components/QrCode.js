import React from "react";
import QRCode from "qrcode.react";

const PaymentQrCode = ({ code }) => {
  return (
    <QRCode
      value={code}
      level="L"
      size={180}
      imageSettings={{ excavate: true }}
    />
  );
};

export default PaymentQrCode;
