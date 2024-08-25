/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-19 15:28:19
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-24 21:53:33
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
    const fetchUserCreatedNfts = async () => {
      if (userInfo?.createdNfts?.length > 0) {
        try {
          const nftData = await findNftsByIds(userInfo.createdNfts);
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

    fetchUserCreatedNfts();
  }, [userInfo]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (nfts.length === 0) return <div>No NFTs found.</div>;

  return (
    <div className="bg-white min-h-[600px] overflow-auto rounded-lg">
      <h1>Your Created NFTs</h1>
      <NftTable scene="created" nfts={nfts} handleUpdateSaleStatus={() => {}} />
    </div>
  );
};

export default ProfilePage;
