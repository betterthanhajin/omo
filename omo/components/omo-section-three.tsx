import Image from "next/image";
import omoEar from "@/public/omo-ear.svg";
import omoFace from "@/public/omo-face.svg";

export default function OmoSectionThree() {
  return (
    <>
      <section className="w-full flex justify-between p-12">
        <div>
          <Image
            className="mb-6"
            src={omoEar}
            alt="omo ear"
            width="100"
            height="100"
          ></Image>
          <Image src={omoFace} alt="omo face" width="100" height="100"></Image>
        </div>
        <div>
          <div>
            <Image
              className="mb-6"
              src={omoEar}
              alt="omo ear"
              width="100"
              height="100"
            ></Image>
            <Image
              src={omoFace}
              alt="omo face"
              width="100"
              height="100"
            ></Image>
            <div className="text-black text-center">MY BLOG</div>
          </div>
        </div>
        <div>
          <Image
            className="mb-6"
            src={omoEar}
            alt="omo ear"
            width="100"
            height="100"
          ></Image>
          <Image src={omoFace} alt="omo face" width="100" height="100"></Image>
        </div>
      </section>
    </>
  );
}
