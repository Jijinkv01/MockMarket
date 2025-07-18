// TradingViewWidget.jsx
import React, { useEffect, useRef, memo } from 'react';

function TikerTap() {
  const container = useRef();

  useEffect(
    () => {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = `
        {
          "symbols": [
            {
              "proName": "BSE:RELIANCE",
              "title": ""
            },
            {
              "proName": "BSE:HDFCBANK",
              "title": ""
            },
            {
              "proName": "BSE:TCS",
              "title": ""
            },
            {
              "proName": "BSE:BHARTIARTL",
              "title": ""
            },
            {
              "proName": "BSE:ICICIBANK",
              "title": ""
            },
            {
              "proName": "BSE:SBIN",
              "title": ""
            },
            {
              "proName": "BSE:INFY",
              "title": ""
            },
            {
              "proName": "BSE:BAJFINANCE",
              "title": ""
            },
            {
              "proName": "BSE:HINDUNILVR",
              "title": ""
            },
            {
              "proName": "BSE:ITC",
              "title": ""
            },
            {
              "proName": "BSE:LT",
              "title": ""
            },
            {
              "proName": "BSE:HCLTECH",
              "title": ""
            },
            {
              "proName": "BSE:KOTAKBANK",
              "title": ""
            },
            {
              "proName": "BSE:SUNPHARMA",
              "title": ""
            },
            {
              "proName": "BSE:M_M",
              "title": ""
            },
            {
              "proName": "BSE:MARUTI",
              "title": ""
            },
            {
              "proName": "BSE:ULTRACEMCO",
              "title": ""
            },
            {
              "proName": "BSE:AXISBANK",
              "title": ""
            },
            {
              "proName": "BSE:NTPC",
              "title": ""
            },
            {
              "proName": "BSE:ADANIPORTS",
              "title": ""
            },
            {
              "proName": "BSE:TITAN",
              "title": ""
            }
          ],
          "colorTheme": "light",
          "locale": "en",
          "largeChartUrl": "",
          "isTransparent": true,
          "showSymbolLogo": true,
          "displayMode": "regular"
        }`;
      container.current.appendChild(script);
    },
    []
  );

  return (
    <div className="tradingview-widget-container" ref={container}>
      <div className="tradingview-widget-container__widget"></div>
      {/* <div className="tradingview-widget-copyright"><a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Track all markets on TradingView</span></a></div> */}
    </div>
  );
}

export default memo(TikerTap);











