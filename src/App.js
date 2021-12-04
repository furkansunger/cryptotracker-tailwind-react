import React, { useEffect, useState } from "react";

const App = () => {
  const [coins, setCoins] = useState([]);
  
  const fetchCoins = async () => {
    try {
      const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false");
      const data = await res.json();
      setCoins(data);
    } catch (error) {
      console.log("error");
    }
  }

  useEffect(() => {
    fetchCoins();
  }, [])

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl text-center text-blue-600 my-8">Crypto Tracker App</h1>

      <table className="min-w-full border-collapse block md:table">
        <thead className="block md:table-header-group">
          <tr className="border border-grey-500 md:border-none block md:table-row absolute -top-full md:top-auto -left-full md:left-auto  md:relative ">
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              #
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Name
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Symbol
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Price
            </th>
            <th className="bg-gray-600 p-2 text-white font-bold md:border md:border-grey-500 text-left block md:table-cell">
              Challenge
            </th>
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {
            coins && coins.map((item, index) => (
              <tr key={index} className="bg-gray-300 border border-grey-500 md:border-none block md:table-row">
                <td className="p-3 md:border md:border-grey-500 text-left">
                  {index + 1}
                </td>
                <td className="p-3 md:border md:border-grey-500 text-left flex items-center">
                  <img src={item.image} className="w-5 h-5 mr-2" alt="" />
                  <span>{item.name}</span>
                </td>
                <td className="p-3 md:border md:border-grey-500 text-left">
                  {item.symbol.toUpperCase()}
                </td>
                <td className="p-3 md:border md:border-grey-500 text-left">
                  ${item.current_price}
                </td>
                <td className="p-3 md:border md:border-grey-500 text-left">
                  {item.market_cap_change_percentage_24h}%
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default App;
