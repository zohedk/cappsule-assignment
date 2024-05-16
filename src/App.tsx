import "./App.css";
import { SaltCard, SearchBar } from "./components";
import { useHandleFetchSalts } from "./hooks";

function App() {
  const {
    fetchSatlsQuery,
    input,
    setInput,
    saltsData,
    clearData,
    setClearData,
  } = useHandleFetchSalts();

  return (
    <div className="w-screen  flex justify-center inter-font">
      <div className=" flex flex-col items-center ">
        <h1 className="text-[26px] mt-[60px]">Cappsule web development test</h1>

        <SearchBar {...{ input, setInput, fetchSatlsQuery, setClearData }} />
        <div className="w-[1200px] h-[1px] bg-[rgba(77,77,77,0.4)]"></div>

        {saltsData && saltsData.length !== 0 ? (
          <div className="w-[1200px] flex flex-col gap-[20px] mt-[50px] mb-[50px] ">
            {saltsData.map((saltData, index) => {
              return (
                <SaltCard
                  key={index}
                  {...{ clearData, setClearData, saltData }}
                />
              );
            })}
          </div>
        ) : (
          <div
            className="w-[100%] h-screen font-semibold text-[22px] flex justify-center items-center text-[#888888]"
            style={{
              position: "fixed",
              top: "0",
            }}
          >
            {" "}
            <h1>" Find medecines with amazing discount "</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
