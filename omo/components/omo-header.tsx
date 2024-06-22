import Image from "next/image";
import omoLogo from "@/public/omo-logo.svg";

export function OmoHeader() {
  return (
    <header className="flex justify-between items-center px-6 py-2 bg-white w-full h-[130px] text-[#645555]">
      <div className="flex items-center gap-2">
        <Image src={omoLogo} alt="omo logo" width="100" height="100"></Image>
        <span className="font-semibold">
          LEE
          <br />
          HAJIN
        </span>
      </div>

      <div>
        <span className="font-bold text-5xl text-[#645555]">My Tech Blog</span>
      </div>
      <div>
        <span className="font-semibold block text-right">omoshiroi</span>
        <div className="bg-[#FEBCBC] w-[120px] h-[25px] rounded-lg"></div>
        <span className="text-xs block text-right">switching concept</span>
        <div className="text-right text-sm">2024.08.01</div>
      </div>
    </header>
  );
}
