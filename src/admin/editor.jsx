import React, { useEffect, useRef, memo, useState } from "react";

const uuid4 = () =>
  "00000000-0000-4000-8000-000000000000".replace(/0/g, () =>
    // uncecure but portalbe: (0 | (Math.random() * 16)).toString(16)
    (0 | crypto.getRandomValues(new Uint8Array(1))[0] % 16).toString(16)
  );

// let id = uuid4();

const SignalwerkEditor = memo(({ value, onChange }) => {
  const iframeRef = useRef();
  const lastValue = useRef(value);
  const [id, setId] = useState(uuid4());

  useEffect(() => {
    // on value change send the message to the editor
    if (value !== lastValue.current) {
      const text = value || "";
      lastValue.current = text;
      const iframeWindow = iframeRef.current.contentWindow;
      iframeWindow.postMessage(
        {
          type: "SET_TEXT_AND_SELECTION",
          id,
          payload: {
            text,
          },
        },
        "*"
      );
    }
  }, [value]);

  useEffect(
    () => {
      const handleMessage = (e) => {
        if (
          e.data &&
          e.data.type === "SET_TEXT_AND_SELECTION" &&
          e.data.id === id
        ) {
          onChange(e.data.payload.text);
        }
        // once the Editor is ready we send the initial state
        else if (e.data && e.data.type === "READY" && e.data.id === id) {
          const text = value || "";
          // Send initial value to the iframe
          const iframeWindow = iframeRef.current.contentWindow;
          iframeWindow.postMessage(
            {
              type: "INIT",
              id,
              payload: {
                text,
                selectionStart: text.length,
                selectionEnd: text.length,
                selectionDirection: "none",
              },
            },
            "*"
          );
        }
      };

      window.addEventListener("message", handleMessage);

      return () => {
        window.removeEventListener("message", handleMessage);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <iframe
      ref={iframeRef}
      style={{ border: 0 }}
      width="100%"
      height="100%"
      src={`http://localhost:3000?id=${id}`}
      // src={`https://editor.signalwerk.ch/?id=${id}`}
    />
  );
});

export default SignalwerkEditor;
