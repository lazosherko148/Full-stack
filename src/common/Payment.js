import React, { useState } from "react";
import GooglePayButton from "@google-pay/button-react";

 
export default function Payment() {
  const paymentRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
        {
          type: "CARD",
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["MASTERCARD", "VISA"]
          },
          tokenizationSpecification: {
            type: "PAYMENT_GATEWAY",
            parameters: {
              gateway: "example"
            }
          }
        }
      ],
      merchantInfo: {
        merchantId: "Demo",
        merchantName: "Demo Merchant"
      },
      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPriceLabel: "Total",
        totalPrice: "100.00",
        currencyCode: "USD",
        countryCode: "US"
      }
    };
   
    
    const [buttonType, setButtonType] = useState("buy");
    const [buttonWidth, setButtonWidth] = useState(240);
    const [buttonHeight, setButtonHeight] = useState(40);
   
    const isTop = window === window.top;
   
    return (
      <div>
        <form className="top-bottom">
          <label className="control">
            <span>Button type</span>
            <select
              value={buttonType}
              onChange={event => setButtonType(event.target.value)}
            >
              <option value="buy">buy</option>
            </select>
          </label>
          <label className="control">
            <span>
              Button width <span className="value">({buttonWidth}px)</span>
            </span>
            <input
              type="range"
              min="160"
              max="800"
              value={buttonWidth}
              onChange={event => setButtonWidth(Number(event.target.value))}
            />
          </label>
          <label className="control">
            <span>
              Button height <span className="value">({buttonHeight}px)</span>
            </span>
            <input
              type="range"
              min="40"
              max="100"
              value={buttonHeight}
              onChange={event => setButtonHeight(Number(event.target.value))}
            />
          </label>
        </form>
   
        <div className="demo">
          <GooglePayButton
            environment="TEST"
            buttonType={buttonType}
            paymentRequest={paymentRequest}
            onLoadPaymentData={paymentRequest => {
              console.log("load payment data", paymentRequest);
            }}
            style={{ width: buttonWidth, height: buttonHeight }}
          />
        </div>
   
        <div className="note" style={{ display: isTop ? "none" : "" }}>
          
          <p>
            <a href="/" target="_blank">
              Open in new window
            </a>
            .
          </p>
        </div>
      </div>
    );
  }