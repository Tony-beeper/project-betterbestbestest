import React, { useState, useEffect } from "react";
import ReconnectingWebSocket from "reconnecting-websocket";
import { Connection } from "sharedb/lib/client";

const socket = new ReconnectingWebSocket("ws://localhost:8080");
// @ts-ignore
const connection = new Connection(socket);
var doc = connection.get("doc-collection", "doc-id");
function ShareDBTest() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    doc.subscribe((error) => {
      if (error) return console.error(error);

      // If doc.type is undefined, the document has not been created, so let's create it
      if (!doc.type) {
        doc.create({ counter: 0 }, (error) => {
          if (error) console.error(error);
        });
      }
    });

    doc.on("op", (op) => {
      console.log("count", doc.data.counter);
      setCount(doc.data.counter);
    });
  }, []);

  const increment = () => {
    doc.submitOp([{ p: ["counter"], na: 1 }]);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default ShareDBTest;
