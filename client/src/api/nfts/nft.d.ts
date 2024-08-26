/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-22 00:31:42
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-26 21:42:54
 */
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
  tokenId: string;
  tokenURI: string;
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
  tokenId: string;
  name: string;
  description?: string;
  status: NftStatus;
}
