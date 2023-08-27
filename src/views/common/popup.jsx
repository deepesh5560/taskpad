import React from "react";

function Popup({ setPop, action, type }) {
  return (
    <>
      <div className="agree-popup">
        <div className="edit-pop">
          <div className="edit-out">
            <div className="app-container" id="taskList">
              <div className="pop-text">
                <h3>
                  {type === "logout"
                    ? "Do you really want to logout?"
                    : "Do you really want to delete this item ?"}
                </h3>
              </div>
              <div className="btn-out">
                <button className="btn-1" onClick={() => setPop(false)}>
                  Cancel
                </button>
                <button className="btn-2" onClick={async () => action()}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Popup;
