import { useState, useEffect } from "react";
import Image from "next/image";
import omoLogo from "@/public/omo-logo.svg";
import omoArrow from "@/public/omo-arrow.svg";
import omoSearch from "@/public/omo-search.svg";

export function OmoBoard() {
  return (
    <>
      <div className="flex min-h-40 h-full w-full">
        <div className="w-1/2 bg-[#EBEAEA]">
          <div className="flex w-full bg-white p-2">
            <input type="text" className="w-full p-1" placeholder="검색....." />
            <Image
              src={omoSearch}
              alt="omo search"
              width="20"
              height="20"
            ></Image>
          </div>

          <ul className="p-2">
            <li className="flex gap-2 p-2 text-[#645555] hover:bg-[#645555] hover:text-white">
              <div>props 를 통해 컴포넌트에게 값 전달하기</div>
              <Image
                src={omoArrow}
                alt="omo arrow"
                width="10"
                height="10"
              ></Image>
            </li>
            <li className="flex gap-2 p-2 text-[#645555] hover:bg-[#645555] hover:text-white">
              <div>props 를 통해 컴포넌트에게 값 전달하기</div>
              <Image
                src={omoArrow}
                alt="omo arrow"
                width="10"
                height="10"
              ></Image>
            </li>
            <li className="flex gap-2 p-2 text-[#645555] hover:bg-[#645555] hover:text-white">
              <div>props 를 통해 컴포넌트에게 값 전달하기</div>
              <Image
                src={omoArrow}
                alt="omo arrow"
                width="10"
                height="10"
              ></Image>
            </li>
            <li className="flex gap-2 p-2 text-[#645555] hover:bg-[#645555] hover:text-white">
              <div>props 를 통해 컴포넌트에게 값 전달하기</div>
              <Image
                src={omoArrow}
                alt="omo arrow"
                width="10"
                height="10"
              ></Image>
            </li>
            <li className="flex gap-2 p-2 text-[#645555] hover:bg-[#645555] hover:text-white">
              <div>props 를 통해 컴포넌트에게 값 전달하기</div>
              <Image
                src={omoArrow}
                alt="omo arrow"
                width="10"
                height="10"
              ></Image>
            </li>
            <li className="flex gap-2 p-2 text-[#645555] hover:bg-[#645555] hover:text-white">
              <div>props 를 통해 컴포넌트에게 값 전달하기</div>
              <Image
                src={omoArrow}
                alt="omo arrow"
                width="10"
                height="10"
              ></Image>
            </li>
            <li className="flex gap-2 p-2 text-[#645555] hover:bg-[#645555] hover:text-white">
              <div>props 를 통해 컴포넌트에게 값 전달하기</div>
              <Image
                src={omoArrow}
                alt="omo arrow"
                width="10"
                height="10"
              ></Image>
            </li>
            <li className="flex gap-2 p-2 text-[#645555] hover:bg-[#645555] hover:text-white">
              <div>props 를 통해 컴포넌트에게 값 전달하기</div>
              <Image
                src={omoArrow}
                alt="omo arrow"
                width="10"
                height="10"
              ></Image>
            </li>
          </ul>
        </div>
        <div className="w-1/2 p-8">내용..ascacssacas.</div>
      </div>
    </>
  );
}
