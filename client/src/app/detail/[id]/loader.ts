import { findNftById } from "@/api/index";

// src/app/detail/[id]/loader.ts

export async function loader({ params }) {
  try {
    const nftDetails = await findNftById(params.id);
    return {
      props: {
        // 确保使用 props 包装数据
        nft: nftDetails,
        error: null,
      },
    };
  } catch (error) {
    console.error("Failed to load NFT details:", error);
    return {
      props: {
        nft: null,
        error: "Failed to fetch NFT details.",
      },
    };
  }
}
