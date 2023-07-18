import CloseSession from "./CloseSession";

const Navbar = () => {
  /* const promiseUSDTOVEF = getPriceUSD();
  const promiseUSDTOCOP = getPriceCOP(); */

  return (
    <div className="w-full flex justify-between items-center">
      {/* <Suspense fallback={<h2 className="text-white">loading...</h2>}>
        <CurrencyItems
          promiseCOP={promiseUSDTOCOP}
          promiseVEF={promiseUSDTOVEF}
        />
      </Suspense> */}

      <CloseSession />
    </div>
  );
};

export default Navbar;
