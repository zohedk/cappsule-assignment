import React, { SetStateAction, useCallback } from "react";
import { Button } from "./Button";
import { ButtonBox } from "./ButtonBox";
import { SliceSate } from "../hooks";
import { Packaging, Strength } from "../lib/types";

interface ButtonContainerProp {
  shouldSlice: SliceSate;
  setShowMore: React.Dispatch<SetStateAction<SliceSate>>;
  showMore: SliceSate;
  slicedForm: string[];
  slicedPackaging: Packaging[];
  slicedStrength: Strength[];
  selectedForm: String;
  setSelectedForm: React.Dispatch<SetStateAction<string>>;
  selectedStrength: string;
  setSelectedStrength: React.Dispatch<SetStateAction<string>>;
  selectedPackaging: string;
  setSelectedPackaging: React.Dispatch<SetStateAction<string>>;
}

export const ButtonsContainer = (prop: ButtonContainerProp) => {
  const handleMoreAndHide = useCallback(
    ({
      type,
      showMoreState,
    }: {
      type: "form" | "strength" | "packaging";

      showMoreState: boolean;
    }) => {
      console.log(type, showMoreState);
      prop.setShowMore((crnt) => {
        return { ...crnt, [type]: showMoreState };
      });
    },
    [prop.showMore]
  );
  return (
    <>
      {/* forms btn */}
      <ButtonBox title="Form:">
        <div className="flex flex-wrap items-center  gap-[20px]">
          {prop.slicedForm.map((form) => {
            return (
              <Button
                key={form}
                {...{
                  onClick: () => prop.setSelectedForm(form),
                  title: form,
                  isSelected: prop.selectedForm === form,
                  isAvailable: true,
                }}
              />
            );
          })}
          {prop.shouldSlice.form && (
            <div className=" flex items-center justify-end text-[#204772] font-bold">
              {prop.showMore.form ? (
                <button
                  onClick={() =>
                    handleMoreAndHide({ type: "form", showMoreState: false })
                  }
                >
                  hide..
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleMoreAndHide({ type: "form", showMoreState: true })
                  }
                >
                  more..
                </button>
              )}
            </div>
          )}
        </div>
      </ButtonBox>
      {/* strengths btn */}
      <ButtonBox title="Strength:">
        <div className="flex flex-wrap items-center gap-[20px]">
          {prop.slicedStrength.map(({ strength, isAvailable }, index) => {
            return (
              <Button
                key={index}
                {...{
                  onClick: () => {
                    prop.setSelectedStrength(strength);
                  },
                  title: strength,
                  isAvailable,
                  isSelected: prop.selectedStrength === strength,
                }}
              />
            );
          })}
          {prop.shouldSlice.strength && (
            <div className=" text-[#204772] font-bold">
              {prop.showMore.strength ? (
                <button
                  onClick={() =>
                    handleMoreAndHide({
                      type: "strength",
                      showMoreState: false,
                    })
                  }
                >
                  hide..
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleMoreAndHide({
                      type: "strength",
                      showMoreState: true,
                    })
                  }
                >
                  more..
                </button>
              )}
            </div>
          )}
        </div>
      </ButtonBox>
      {/* forms btn */}
      <ButtonBox title="Packaging:">
        <div className="flex flex-wrap items-center gap-[20px]">
          {prop.slicedPackaging.map(({ quantity, isAvailable }, index) => {
            return (
              <Button
                key={index}
                {...{
                  onClick: () => {
                    prop.setSelectedPackaging(quantity);
                  },
                  title: quantity,
                  isAvailable,
                  isSelected: prop.selectedPackaging === quantity,
                }}
              />
            );
          })}
          {prop.shouldSlice.packaging && (
            <div className=" text-[#204772] font-bold">
              {prop.showMore.packaging ? (
                <button
                  onClick={() =>
                    handleMoreAndHide({
                      type: "packaging",
                      showMoreState: false,
                    })
                  }
                >
                  hide..
                </button>
              ) : (
                <button
                  onClick={() =>
                    handleMoreAndHide({
                      type: "packaging",
                      showMoreState: true,
                    })
                  }
                >
                  more..
                </button>
              )}
            </div>
          )}
        </div>
      </ButtonBox>
    </>
  );
};
