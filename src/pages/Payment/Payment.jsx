import { NavLink } from "react-router-dom";

function Payment() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      {/* Heading */}
      <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-10 text-center">
        CHOOSE YOUR BILL TYPE
      </h2>

      {/* Options Container */}
      <div className="flex justify-center items-center gap-4 md:gap-6 w-full max-w-5xl">
        {/* Option 1 */}
        <NavLink
          to="/payment/personal"
          className="w-[45%] md:w-1/3 p-3 md:p-5 rounded-2xl border-2 border-white text-white text-center transition-transform duration-300 hover:scale-110 hover:bg-gray-800 hover:border-red-400 hover:text-slate-300"
        >
          <img
            src="/personal.png"
            alt="Option 1"
            className="w-full h-28 md:h-48 object-cover rounded-lg"
          />
          <h2 className="mt-3 text-xs md:text-lg font-semibold">
            Personal Expense
          </h2>
        </NavLink>

        {/* Option 2 */}
        <NavLink
          to="/payment/split"
          className="w-[45%] md:w-1/3 p-3 md:p-5 rounded-2xl border-2 border-white text-white text-center transition-transform duration-300 hover:scale-110 hover:bg-gray-800 hover:border-red-400 hover:text-slate-300"
        >
          <img
            src="/group2.png"
            alt="Option 2"
            className="w-full h-28 md:h-48 object-cover rounded-lg"
          />
          <h2 className="mt-3 text-xs md:text-lg font-medium">Split-Bill</h2>
        </NavLink>
      </div>
    </div>
  );
}

export default Payment;
