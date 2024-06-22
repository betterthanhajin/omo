import Image from "next/image";
import omoLogo from "@/public/omo-logo.svg";

export default function OmoSectionTwo() {
  return (
    <>
      <section>
        <div className="w-full h-full relative">
          <div className="flex">
            <div className="flex justify-center items-center w-[250px] h-[250px] rounded-full bg-[#E7E7E7]">
              <span className="text-[#645555] font-semibold">NODEJS</span>
            </div>
            <div className="flex justify-center items-center w-[250px] h-[250px] rounded-full bg-[#E7E7E7]">
              <span className="text-[#645555] font-semibold">REACT</span>
            </div>
          </div>
          <div className="flex justify-center absolute top-[150px] left-[160px] w-[180px] h-[180px] rounded-full bg-[#DEB4B4]">
            <Image
              src={omoLogo}
              alt="omo logo"
              width="100"
              height="100"
            ></Image>
          </div>
          <div className="flex">
            <div className="flex justify-center items-center w-[250px] h-[250px] rounded-full bg-[#E7E7E7]">
              <span className="text-[#645555] font-semibold">NEXTJS</span>
            </div>
            <div className="flex justify-center items-center w-[250px] h-[250px] rounded-full bg-[#E7E7E7]">
              <span className="text-[#645555] font-semibold">TYPESCRIPT</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
