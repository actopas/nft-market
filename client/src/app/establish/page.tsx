/*
 * @Describle:
 * @Author: actopas <fishmooger@gmail.com>
 * @Date: 2024-08-18 02:11:23
 * @LastEditors: actopas
 * @LastEditTime: 2024-08-23 13:30:59
 */

import React from "react";
import Header from "@/components/Header";
import ButtonCard from "@/components/ButtonCard";

const creatList = [
  {
    title: "Drop",
    path: "/establish/deploy-contract",
    content:
      "A drop is the release of a new project. This usually happens on a specified date and time. Items will be revealed after they have been purchased.",
  },
  // {
  //   title: "Collection or item",
  //   path: "/establish/mint",
  //   content:
  //     "Create a new NFT collection or add an NFT to an existing one. Your items will display immediately. List for sale when you're ready.",
  // },
];
const Create: React.FC = () => {
  return (
    <div className="w-full h-2/3 mt-[100px] flex flex-col justify-center items-center">
      {creatList.map((item, index) => {
        return <ButtonCard key={index} item={item} />;
      })}
    </div>
  );
};

export default Create;
