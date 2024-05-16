export interface SaltSuggestions {
  id: number;
  salt: string;
  salt_frequency: number;
  available_forms: string[];
  most_common: {
    Form: string;
    Strength: string;
    Packing: string;
  };
  salt_forms_json: {
    [form: string]: {
      [strength: string]: {
        [packing: string]: {
          [product_id: string]:
            | {
                pharmacy_id: number;
                selling_price: number | null;
              }[]
            | null;
        };
      };
    };
  };
}

export interface Strength {
  form: string;
  strength: string;
  isAvailable: boolean;
}

export interface Packaging {
  form: string;
  strength: string;
  quantity: string;
  isAvailable: boolean;
  lowestPrice: number | null;
}
