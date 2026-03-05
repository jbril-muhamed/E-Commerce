const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-3">HMS Store</h3>
          <p className="text-sm leading-relaxed">
            Your one-stop shop for premium electronics and gadgets.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/login" className="hover:text-white transition-colors">
                Login
              </a>
            </li>
            <li>
              <a
                href="/register"
                className="hover:text-white transition-colors"
              >
                Register
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <p className="text-sm">support@hmsstore.com</p>
        </div>
      </div>
      <div className="text-center text-xs py-4 border-t border-gray-800">
        © {new Date().getFullYear()} HMS Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
