import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

const Header = ({ siteTitle, extra }) => (
  <header className="flex flex-wrap px-4 md:px-8 h-auto md:h-12 justify-between items-center border-b-1 bg-purple-600">
    <Link
      to="/"
      className="text-2xl font-bold m-0 mr-5 text-white mb-2 md:mb-0 w-full md:w-auto text-center md:text-left"
    >
      {siteTitle}
    </Link>
    {extra}
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
