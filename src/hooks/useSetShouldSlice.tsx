import { useEffect, useState } from "react";
import { Packaging, SaltSuggestions, Strength } from "../lib/types";

interface Props {
  saltData: SaltSuggestions;
  filteredStrength: Strength[];
  filteredPackaging: Packaging[];
  selectedForm: string;
  selectedStrength: string;
}
export interface SliceSate {
  form: boolean;
  strength: boolean;
  packaging: boolean;
}

export const useSetShouldSlice = (prop: Props) => {
  // states to handle show more option
  const [showMore, setShowMore] = useState<SliceSate>({
    form: false,
    strength: false,
    packaging: false,
  });
  const [shouldSlice, setShouldSlice] = useState<SliceSate>({
    form: false,
    strength: false,
    packaging: false,
  });

  // if form , strength or packaging lengts exceeds more than 3 it will be true

  // all slided data if should slice is true
  const slicedForm =
    shouldSlice.form && !showMore.form
      ? prop.saltData.available_forms.slice(0, 3)
      : prop.saltData.available_forms;

  //
  const slicedStrength =
    shouldSlice.strength && !showMore.strength
      ? prop.filteredStrength.slice(0, 3)
      : prop.filteredStrength;
  //
  const slicedPackaging =
    shouldSlice.packaging && !showMore.packaging
      ? prop.filteredPackaging.slice(0, 3)
      : prop.filteredPackaging;

  useEffect(() => {
    setShouldSlice({
      form: prop.saltData.available_forms.length > 3,
      strength: prop.filteredStrength.length > 3,
      packaging: prop.filteredPackaging.length > 3,
    });
  }, [prop.filteredPackaging, prop.filteredStrength]);

  return {
    shouldSlice,
    showMore,
    setShowMore,
    slicedForm,
    slicedStrength,
    slicedPackaging,
  };
};
