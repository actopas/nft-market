export enum NftStatus {
  Hold = 0,
  OnSale = 1,
  Sold = 2,
}

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
  status: NftStatus;
  owner: string;
  recommanded?: boolean;
  notable?: boolean;
  transactionHistory?: Array<{
    date: Date;
    price: string;
    previousOwner: string;
  }>;
}
export interface NftSummary {
  id?: string;
  name: string;
  description?: string;
  status: NftStatus;
}
