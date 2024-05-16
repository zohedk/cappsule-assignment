import { SetStateAction, useEffect } from "react";
import { Packaging, Strength } from "../lib/types";

interface Props {
  selectedForm: string;
  selectedStrength: string;
  allStrength: Strength[];
  allPackaging: Packaging[];
  setSelectedStrength: React.Dispatch<SetStateAction<string>>;
  setSelectedPackaging: React.Dispatch<SetStateAction<string>>;
}

export const useSetDefaultStrengthAndPackaging = (prop: Props) => {
  useEffect(() => {
    //when form changes set its first strength as selectedStrength
    if (prop.allStrength.length !== 0) {
      const firstStrengthOfSelectedForm = prop.allStrength.filter(
        ({ form }) => form === prop.selectedForm
      )[0]?.strength;
      prop.setSelectedStrength(firstStrengthOfSelectedForm);
    }
  }, [prop.allStrength, prop.selectedForm]);

  useEffect(() => {
    //when strength changes set its first package as selectedPackage
    if (prop.allPackaging.length !== 0) {
      const firstPackagingOfSelectedStrength = prop.allPackaging.filter(
        ({ form, strength }) =>
          form === prop.selectedForm && strength === prop.selectedStrength
      )[0]?.quantity;
      prop.setSelectedPackaging(firstPackagingOfSelectedStrength);
    }
  }, [prop.selectedStrength, prop.allPackaging]);
};
