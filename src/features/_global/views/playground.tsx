import BarcodeScannerComponent from "react-qr-barcode-scanner";

export const Playground = () => {
  return (
    <>
      <BarcodeScannerComponent
        width={500}
        height={500}
        torch
        onError={(err) => console.log({ err })}
        onUpdate={async (err, result) => {
          if (result) {
            alert(`${result.getText()}`);
            const byte = new Uint8Array(result.getRawBytes());
            const decode = new TextDecoder().decode(byte);
            console.log({
              err,
              result,
              res: result?.getText(),
              byte: result.getRawBytes(),
              decode,
            });
          }
        }}
      />
    </>
  );
};
