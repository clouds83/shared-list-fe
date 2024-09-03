export type Item = {
  id: string;
  subscriptionId: string;
  name: string;
  isBought: boolean;
  quantity?: number;
  unit?: string;
  category?: string;
  price1Name?: string;
  price2Name?: string;
  price3Name?: string;
  price1?: number;
  price2?: number;
  price3?: number;
};
