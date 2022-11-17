import React from "react";

function Footer() {
  return (
    <footer>
      <a href="https://noroff-api-docs.netlify.app/" className="footer__link">
        Docs
      </a>
      <a
        href="https://nf-api.onrender.com/docs/static/index.html"
        className="footer__link"
      >
        API endpoints
      </a>
      <a href="https://www.noroff.no/" className="footer__link">
        Noroff
      </a>
    </footer>
  );
}

export default Footer;
