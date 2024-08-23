/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-19 15:28:19
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-23 22:37:06
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
  handleSoldOut: (id: string) => void;
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

  const handleSoldOut = (id: string) => {
    // 这里模拟更新 NFT 状态的请求
    message.success(`NFT with id ${id} marked as Sold Out.`);
    // 这里你可以调用实际的 API 来更新 NFT 的状态
    setNfts((prevNfts) => prevNfts.filter((nft) => nft._id !== id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (nfts.length === 0) return <div>No NFTs found.</div>;

  return (
    <div className="bg-white min-h-[600px] overflow-auto rounded-lg">
      <h1>Your Created NFTs</h1>
      <NftTable nfts={nfts} handleSoldOut={handleSoldOut} />
    </div>
  );
};

export default ProfilePage;
