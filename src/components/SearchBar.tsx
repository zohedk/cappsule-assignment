import { UseQueryResult } from "@tanstack/react-query";
import { SetStateAction } from "react";
import { RiSearchLine } from "react-icons/ri";
import { IoIosArrowRoundBack } from "react-icons/io";
import { SaltSuggestions } from "../lib/types";
interface Prop {
  input: string;
  setInput: React.Dispatch<SetStateAction<string>>;
  fetchSatlsQuery: UseQueryResult<SaltSuggestions[], Error>;
  setClearData: React.Dispatch<SetStateAction<boolean>>;
}
export const SearchBar: React.FC<Prop> = ({
  input,
  setInput,
  fetchSatlsQuery,
  setClearData,
}) => {
  return (
    <div className="w-[100vw] h-[150px] flex  items-center justify-center sticky top-0 bg-white z-[10]">
      <div className="w-[1200px]  flex items-center justify-between h-[65px]  shadow-bg rounded-full box-border px-[30px]">
        <div className="w-[1200px] flex items-center gap-[30px]">
          <div>
            {input.length === 0 ? (
              <RiSearchLine className="w-fit text-[25px] text-[#555555] font-[999]" />
            ) : (
              <IoIosArrowRoundBack
                className="w-fit text-[50px] text-black font-[999] cursor-pointer"
                onClick={() => {
                  // removing data
                  setInput("");
                  setClearData(true);
                }}
              />
            )}
          </div>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            className="w-[89%] outline-none text-[18px] font-[500]"
            placeholder="Type your medecine name"
          />
        </div>
        <button
          onClick={() => {
            fetchSatlsQuery.refetch();
          }}
          className="w-[10%] text-[#2A527A] hover:text-[#a0c9e7] text-[20px] font-bold"
        >
          Search
        </button>
      </div>
    </div>
  );
};
