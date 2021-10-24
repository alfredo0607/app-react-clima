import React from "react";

export default function Error({mensaje}) {
  return (
    <p className="red darken-4 error">{mensaje}</p>
  );
}
