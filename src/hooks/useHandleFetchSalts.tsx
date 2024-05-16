import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";
import { SaltSuggestions } from "../lib/types";

export const useHandleFetchSalts = () => {
  const [input, setInput] = useState("");
  const [clearData, setClearData] = useState(false);

  // query
  const query = useQuery({
    queryKey: ["fetch-salts"],
    queryFn: async () => {
      const response = (
        await axios.get(
          `https://backend.cappsule.co.in/api/v1/new_search?q=${input}&pharmacyIds=1,2,3`
        )
      ).data as {
        data: {
          saltSuggestions: SaltSuggestions[];
        };
      };
      const saltsData = response.data.saltSuggestions;
      return saltsData;
    },

    enabled: false,
  });

  // handling clearing of data
  useEffect(() => {
    if (clearData || input.length === 0) {
      setInput("");
      query.refetch();
      clearData && setClearData(false);
    }
  }, [clearData, input]);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter" && input.length !== 0) {
      query.refetch();
    }
  };

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);

    // clean up
    return () => window.removeEventListener("keypress", handleKeyPress);
  });

  return {
    fetchSatlsQuery: query,
    saltsData: query.data,
    input,
    setInput,
    clearData,
    setClearData,
  };
};
