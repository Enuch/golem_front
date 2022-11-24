export type TMaterial = {
  id: number;
  name: string;
  origin: string;
  amount: number;
  category_id: number;
  category: {
    id: number;
    name: string;
  };
};
