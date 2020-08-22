import React from "react";
import QrReader from "react-qr-reader";
import useMediaDetector from "../../../components/hook/useMediaDetector";
import { SimpleTextField } from "../../../components/TextFields";
import ScanButton from "../../../Paiement/Billing/ScanButton";

const QrScanner = ({ handleNewCode, performFullErrorAlert, checkQrCode }) => {
  const [value, setValue] = React.useState("");

  const isMobile = useMediaDetector();

  const check = async (data, next) => {
    await checkQrCode(data, (resultat) => {
      if (resultat) {
        const { error } = resultat;

        error && performFullErrorAlert(error, { title: "scanner" });
        !error && next(resultat);
      }
    });
  };

  const handleScan = (data) => {
    if (data) {
      check(data, (resultat) => handleNewCode && handleNewCode(resultat));
    }
  };

  const handleError = (err) => {
    console.error(err);
    performFullErrorAlert &&
      performFullErrorAlert("Une erreur s'est produite", {
        title: "Scanner",
      });
  };

  console.log({ isMobile });
  return (
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "80%", margin: "auto", marginBottom: "32px" }}
        facingMode={"user"}
        legacyMode={true}
      />

      <SimpleTextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Vous pouvez aussi saisir la valeur du code"
        helperText="Vous pouvez aussi saisir la valeur du code"
      />
      <ScanButton
        fullWidth={true}
        onClick={() => handleScan(value)}
        label="VALIDER"
      />
    </div>
  );
};

export default QrScanner;
