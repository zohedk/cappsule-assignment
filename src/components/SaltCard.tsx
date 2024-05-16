import React, { useEffect, useState } from "react";
import { Packaging, SaltSuggestions, Strength } from "../lib/types";
import {
  useSetDefaultStrengthAndPackaging,
  useSetShouldSlice,
  useSetStrengthAndPackaging,
} from "../hooks";
import { ButtonsContainer } from "./ButtonsContainer";

export const SaltCard: React.FC<{
  saltData: SaltSuggestions;
}> = ({ saltData }) => {
  //
  const [selectedForm, setSelectedForm] = useState(saltData.available_forms[0]);
  const [selectedStrength, setSelectedStrength] = useState("");
  const [selectedPackaging, setSelectedPackaging] = useState("");
  const [filteredStrength, setFilterdStrength] = useState<Strength[]>([]);
  const [filteredPackaging, setFilteredPackaging] = useState<Packaging[]>([]);
  // custom hook which
  const { allPackaging, allStrength } = useSetStrengthAndPackaging({
    saltData,
  });

  // setting filtered data based on form and strength
  useEffect(() => {
    const filteredStrength = allStrength?.filter(
      ({ form }) => form === selectedForm
    );
    const filteredPackaging = allPackaging?.filter(
      ({ form, strength }) =>
        form === selectedForm && strength === selectedStrength
    );

    setFilterdStrength(filteredStrength);
    setFilteredPackaging(filteredPackaging);
  }, [selectedForm, selectedStrength]);

  useSetDefaultStrengthAndPackaging({
    selectedForm,
    allStrength,
    allPackaging,
    selectedStrength,
    setSelectedPackaging,
    setSelectedStrength,
  });

  const {
    shouldSlice,
    setShowMore,
    showMore,
    slicedForm,
    slicedPackaging,
    slicedStrength,
  } = useSetShouldSlice({
    saltData,
    selectedForm,
    selectedStrength,
    filteredPackaging,
    filteredStrength,
  });

  return (
    <div className="w-[1200px]  flex  justify-between box-border p-[20px] shadow-bg rounded-3xl green-gradient-bg">
      {/* button sec */}
      <div className="w-[35%] flex flex-col gap-[30px]">
        <ButtonsContainer
          {...{
            shouldSlice,
            showMore,
            setShowMore,
            slicedForm,
            slicedStrength,
            slicedPackaging,
            selectedForm,
            setSelectedForm,
            selectedPackaging,
            setSelectedPackaging,
            selectedStrength,
            setSelectedStrength,
          }}
        />
      </div>
      {/* salt */}
      <div className="w-[32.5%] flex flex-col justify-center gap-[5px]  ">
        <div className="flex flex-wrap justify-center items-center font-bold text-[20px] ">
          {saltData.salt.split("+").map((word, index) => {
            if (index === 0) {
              return <span>{`${word} `}</span>;
            }
            return <span>{` + ${word}`}</span>;
          })}
        </div>
        <div className="flex justify-center flex-wrap text-[#2A527A]  items-center gap-[2px] ">
          <span>{selectedForm}</span>|<span>{selectedStrength}</span>|
          <span>{selectedPackaging}</span>
        </div>
      </div>
      {/* price */}
      <div className="w-[32.5%] flex justify-center items-center ">
        {allPackaging.length &&
          allPackaging
            .filter(
              (prop) =>
                prop.form === selectedForm &&
                prop.strength === selectedStrength &&
                prop.quantity === selectedPackaging
            )
            .map(({ lowestPrice, isAvailable }, index) => {
              return (
                <React.Fragment key={index}>
                  {isAvailable ? (
                    <div className="flex justify-center items-center text-[40px] text-[#102E32] font-bold">
                      From&#8377;{lowestPrice}
                    </div>
                  ) : (
                    <div
                      className="w-[250px] p-[20px] border-[1px] border-[#A7D6D4] bg-white rounded-md text-clip text-center"
                      key={index}
                    >
                      No stores selling this product near you
                    </div>
                  )}
                </React.Fragment>
              );
            })}
      </div>
    </div>
  );
};
