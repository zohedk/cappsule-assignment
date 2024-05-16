import { useEffect, useState } from "react";
import { Packaging, Strength, SaltSuggestions } from "../lib/types";

export const useSetStrengthAndPackaging = ({
  saltData,
}: {
  saltData: SaltSuggestions;
}) => {
  //
  //
  const [allStrength, setAllStrength] = useState<Strength[]>([]);
  const [allPackaging, setAllPackaging] = useState<Packaging[]>([]);

  useEffect(() => {
    saltData.available_forms.forEach((currentForm) => {
      // gettingf all strength key's
      const strengthsKeys = Object.keys(saltData.salt_forms_json[currentForm]);

      strengthsKeys.forEach((currentStrength) => {
        // creating a temperary strength to push into the allStrength state
        const tempStrengthObj: Strength = {
          form: currentForm,
          strength: currentStrength,
          isAvailable: false,
        };

        const packagesKeys = Object.keys(
          saltData.salt_forms_json[currentForm][currentStrength]
        );

        packagesKeys.forEach((currentPackage) => {
          const tempPackageObj: Packaging = {
            form: currentForm,
            strength: currentStrength,
            quantity: currentPackage,
            isAvailable: false,
            lowestPrice: null,
          };

          const productKeys = Object.keys(
            saltData.salt_forms_json[currentForm][currentStrength][
              currentPackage
            ]
          );

          productKeys.forEach((productkey) => {
            const productArr =
              saltData.salt_forms_json[currentForm][currentStrength][
                currentPackage
              ][productkey];

            productArr?.forEach((product) => {
              if (product) {
                // setting both package and strength available to true
                tempStrengthObj.isAvailable = true;
                tempPackageObj.isAvailable = true;
                // setting lowest price of the first product
                if (!tempPackageObj.lowestPrice) {
                  tempPackageObj.lowestPrice = product.selling_price;
                }
                // if there is a lower price than reset lower price to this
                if (product.selling_price! < tempPackageObj.lowestPrice!) {
                  tempPackageObj.lowestPrice = product.selling_price;
                }
              }
            });
          });
          //

          setAllPackaging((crnt) => {
            let newPackageArr = [...crnt, tempPackageObj];
            return newPackageArr;
          });
        });

        setAllStrength((crnt) => {
          let newStrengthArr = [...crnt, tempStrengthObj];
          return newStrengthArr;
        });
      });
    });
  }, [saltData]);

  // useEffect(() => {
  //   if (allPackaging.length && allStrength.length) {
  //     console.log(saltData.salt);
  //     console.log("packaging: ", allPackaging);
  //     console.log("strength: ", allStrength);
  //   }
  // }, [allPackaging, allStrength]);

  return {
    allPackaging,
    allStrength,
  };
};
