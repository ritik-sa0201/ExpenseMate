const Footer = ({ year = new Date().getFullYear(), brand = "ExpenseMate" }) => {
  return (
    <footer className=" text-white py-6 mt-10">
      <div className="container mx-auto text-center flex flex-col items-center space-y-2">
        <p className="text-sm">
          &copy; {year} {brand}. All Rights Reserved.
        </p>
        <p className="text-xs">Built with ❤️ and React.</p>
      </div>
    </footer>
  );
};

export default Footer;
