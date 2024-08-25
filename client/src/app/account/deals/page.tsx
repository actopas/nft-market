/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-19 15:47:22
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-25 01:33:02
 */
"use client";
import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import NftTable from "@/components/NftTable";
import { findNftsByIds } from "@/api";
import { NftSummary } from "@/api/nfts/nft.d";
import { useAuth } from "@/context/AuthContext";
interface NftTableProps {
  nfts: NftSummary[];
  handleUpdateSaleStatus: (id: string) => void;
}

const ProfilePage: React.FC = () => {
  const { userInfo } = useAuth();
  const [nfts, setNfts] = useState<NftSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserDeals = async () => {
      if (userInfo?.transactions?.length > 0) {
        try {
          const nftData = await findNftsByIds(userInfo.transactions);
          setNfts(nftData);
        } catch (error) {
          setError("Failed to load NFTs.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserDeals();
  }, [userInfo]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (nfts.length === 0) return <div>No NFTs found.</div>;

  return (
    <div className="bg-white min-h-[600px] overflow-auto rounded-lg">
      <h1>Your Deals NFTs</h1>
      <NftTable scene="deal" nfts={nfts} handleUpdateSaleStatus={() => {}} />
    </div>
  );
};

export default ProfilePage;
