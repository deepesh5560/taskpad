import React, { useState } from "react";
import logoutimg from "../../assets/img/logout.png";
import Popup from "../common/popup";
import logo from "../../assets/img/logo.png";

const Navbar = () => {
  const [pop, setPop] = useState(false);

  const Logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <>
      {pop && <Popup setPop={setPop} action={Logout} type={"logout"} />}

      <div className="navbar">
        <div className="nav-main">
          <div>
            <img src={logo} alt="" width={152} className="logo-pic" />
          </div>
          <div className="logout-div" onClick={() => setPop(true)}>
            <divn className="log-txt">Logout</divn>
            <div>
              <img src={logoutimg} width={18} alt="logout" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
