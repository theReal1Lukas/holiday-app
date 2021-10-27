import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const CountriesContext = createContext();

export const CountriesContextProvider = ({ children }) => {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios
          .get("https://restcountries.com/v3.1/all")
          .then((res) => res.data)
          .catch((err) => err);
        setData(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <CountriesContext.Provider value={data}>
      {children}
    </CountriesContext.Provider>
  );
};
