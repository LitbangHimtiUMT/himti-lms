import { useRef } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export const Playground = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const applyStyle = (tag: keyof HTMLElementTagNameMap) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    const span = document.createElement(tag);
    span.appendChild(range.extractContents());
    range.insertNode(span);
  };

  const insertLink = () => {
    const url = prompt("Enter the link URL:");
    if (!url) return;
    document.execCommand(
      "insertHTML",
      false,
      `<a href='${url}' target='_blank'>${url}</a>`
    );
  };

  const insertImage = () => {
    const url = prompt("Enter the image URL:");
    if (!url) return;
    document.execCommand(
      "insertHTML",
      false,
      `<img src='${url}' alt='Image' class='max-w-full' />`
    );
  };

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
      <div className="border p-4 rounded-lg w-full max-w-2xl mx-auto">
        <div className="flex gap-2 mb-2 border-b pb-2">
          <button
            onClick={() => applyStyle("b")}
            className="px-3 py-1 border rounded"
          >
            B
          </button>
          <button
            onClick={() => applyStyle("i")}
            className="px-3 py-1 border rounded"
          >
            I
          </button>
          <button
            onClick={() => applyStyle("u")}
            className="px-3 py-1 border rounded"
          >
            U
          </button>
          <button
            onClick={() => applyStyle("ol")}
            className="px-3 py-1 border rounded"
          >
            OL
          </button>
          <button
            onClick={() => applyStyle("ul")}
            className="px-3 py-1 border rounded"
          >
            UL
          </button>
          <button onClick={insertLink} className="px-3 py-1 border rounded">
            🔗
          </button>
          <button onClick={insertImage} className="px-3 py-1 border rounded">
            🖼
          </button>
        </div>
        <div
          ref={editorRef}
          contentEditable
          className="min-h-[150px] border p-2 rounded outline-none"
          onInput={(e) => console.log({ e })}
          dangerouslySetInnerHTML={{ __html: "" }}
        />
      </div>
    </>
  );
};
