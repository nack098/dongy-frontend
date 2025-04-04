"use client";

import { useRef, useState } from "react";

export default function PaymentMethod() {
  const [isOpen, changeOpen] = useState(false);
  const mobileRef = useRef<HTMLInputElement>(null);
  const promptRef = useRef<HTMLInputElement>(null);
  const kplus = useRef<HTMLInputElement>(null);
  const scb = useRef<HTMLInputElement>(null);
  return (
    <div className="bg-white px-7 py-5 rounded-xl shadow-md text-gray-600 text-sm font-medium h-32">
      <input
        type="checkbox"
        onChange={(e) => {
          if (promptRef.current?.checked != undefined)
            promptRef.current.checked = false;
          changeOpen(e.currentTarget.checked);
        }}
        ref={mobileRef}
      />
      <span className="ml-2 text-sm font-normal">Mobile Banking</span>
      {isOpen ? (
        <div>
          <input
            type="checkbox"
            name="kplus"
            className="ml-12"
            ref={kplus}
            onChange={() =>
              scb.current?.checked != null
                ? (scb.current.checked = false)
                : null
            }
          />
          <span className="ml-2 text-sm font-normal">K Plus</span>
          <input
            type="checkbox"
            name="scb"
            className="ml-12"
            ref={scb}
            onChange={() =>
              kplus.current?.checked != null
                ? (kplus.current.checked = false)
                : null
            }
          />
          <span className="ml-2 text-sm font-normal">SCB Easy</span>
        </div>
      ) : (
        <br />
      )}
      <input
        type="checkbox"
        onChange={() => {
          if (mobileRef.current?.checked != undefined)
            mobileRef.current.checked = false;
          changeOpen(false);
        }}
        name="promptpay"
        ref={promptRef}
      />
      <span className="ml-2 font-normal">Promptpay</span>


      
    </div>
  );
}
