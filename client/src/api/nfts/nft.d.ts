export interface Nft {
  _id?: string;
  name: string;
  imageUrl?: string;
  artist: string;
  price: string;
  description?: string;
  properties?: {
    rarity: string;
    attributes: string[];
  };
  onSale?: boolean;
  owner: string;
  recommanded?: boolean;
  notable?: boolean;
  transactionHistory?: Array<{
    date: Date;
    price: string;
    previousOwner: string;
  }>;
}
