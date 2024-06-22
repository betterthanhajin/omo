import Image from "next/image";
import omoRibbonBunny from "@/public/omo-ribbon-bunny.svg";
import omoRibbonBunnyBlack from "@/public/omo-ribbon-bunny-black.svg";
import omoPinkEarTwo from "@/public/omo-pink-ear-two.svg";
import omoRibbon from "@/public/omo-ribbon.svg";
import omoCandy from "@/public/omo-candy.svg";
import omoBug from "@/public/omo-bug.svg";
import omoCloud from "@/public/omo-cloud.svg";

export default function OmoSectionFive() {
  return (
    <>
      <section>
        <div className="flex">
          <Image
            src={omoCloud}
            alt="omo pink cloud"
            width="100"
            height="100"
          ></Image>
          <Image
            src={omoCloud}
            alt="omo pink cloud"
            width="100"
            height="100"
          ></Image>
          <Image
            src={omoCloud}
            alt="omo pink cloud"
            width="100"
            height="100"
          ></Image>
          <Image
            src={omoCloud}
            alt="omo pink cloud"
            width="100"
            height="100"
          ></Image>
          <Image
            src={omoCloud}
            alt="omo pink cloud"
            width="100"
            height="100"
          ></Image>
          <Image
            src={omoCloud}
            alt="omo pink cloud"
            width="100"
            height="100"
          ></Image>
          <Image
            src={omoCloud}
            alt="omo pink cloud"
            width="100"
            height="100"
          ></Image>
        </div>

        <div>
          <Image
            src={omoRibbonBunny}
            alt="omo ribbon bunny"
            width="100"
            height="100"
          ></Image>
        </div>
        <div>
          <Image
            src={omoRibbonBunnyBlack}
            alt="omo ribbon bunny black"
            width="100"
            height="100"
          ></Image>
        </div>
        <div>
          <Image src={omoBug} alt="omo bug" width="100" height="100"></Image>
          <Image src={omoBug} alt="omo bug" width="100" height="100"></Image>
        </div>
      </section>
    </>
  );
}
