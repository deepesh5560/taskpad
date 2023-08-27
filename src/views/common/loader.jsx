import React from "react";
import "./loader.css";
function Loader() {
  return (
    <>
      <div className="loader">
        <div class="container">
          <div class="loadingspinner">
            <div id="square1"></div>
            <div id="square2"></div>
            <div id="square3"></div>
            <div id="square4"></div>
            <div id="square5"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Loader;
