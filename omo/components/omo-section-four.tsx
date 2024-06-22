import Image from "next/image";
import omoPinkEar from "@/public/omo-pink-ear.svg";
import omoPinkEarTwo from "@/public/omo-pink-ear-two.svg";
import omoRibbon from "@/public/omo-ribbon.svg";
import omoCandy from "@/public/omo-candy.svg";

export default function OmoSectionFour() {
  return (
    <>
      <section className="flex flex-col gap-10">
        {/* <div>
          <h2 className="text-[#645555] text-[1.5rem] font-bold">FRONTEND</h2>
          <h2 className="text-[#645555] text-[1.5rem] font-bold">DEVELOPER</h2>
        </div> */}
        <div>
          <Image
            src={omoPinkEar}
            alt="omo pink ear"
            width="100"
            height="100"
          ></Image>
        </div>
        <div className="flex justify-between">
          <div>
            <Image
              src={omoRibbon}
              alt="omo pink ear two"
              width="100"
              height="100"
            ></Image>
          </div>
          <div>
            <Image
              src={omoCandy}
              alt="omo pink ear two"
              width="200"
              height="200"
            ></Image>
          </div>
          <div>
            <Image
              src={omoRibbon}
              alt="omo pink ear two"
              width="100"
              height="100"
            ></Image>
          </div>
        </div>
        <div>
          <Image
            src={omoPinkEarTwo}
            alt="omo pink ear two"
            width="100"
            height="100"
          ></Image>
        </div>
        {/* <div>
          <h2 className="text-[#645555] text-[1.5rem] font-bold">OMOSHIROI</h2>
          <h2 className="text-[#645555] text-[1.5rem] font-bold">TECH BLOG</h2>
        </div> */}
      </section>
    </>
  );
}
