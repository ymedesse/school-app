import React from "react";
import QrReader from "react-qr-reader";

const QrScanner = ({ handleNewCode }) => {
  //   const [state, setState] = React.useState({
  //     value: undefined,
  //   });

  const handleScan = (data) => {
    if (data) {
      handleNewCode && handleNewCode(data);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <p>{this.state.result}</p>
    </div>
  );
};

export default QrScanner;
