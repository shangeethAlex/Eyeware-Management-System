import React from "react";

function Footer() {
  return (
    <div >
      <footer className="py-4 bg-light mt-auto">
        <div className="container-fluid px-4">
          <div className="d-flex align-items-center justify-content-between small">
            <div className="text-muted">Copyright &copy; Lanka Optical Website 2023</div>
            <div>
              <a>Privacy Policy</a>
              &middot;
              <a>Terms &amp; Conditions</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;