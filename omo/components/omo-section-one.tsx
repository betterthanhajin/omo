export default function OmoSectionOne() {
  return (
    <>
      <section className="bg-[#FEA1A1] w-full h-full p-4">
        <div className="flex justify-between">
          <div className="w-[360px] h-[280px] bg-[#EFEFEF] p-4 m-0">
            <h2 className="text-5xl text-[#645555]">
              omoshiroi
              <br />
              my-tech
              <br />
              blog
            </h2>
          </div>
          <div className="w-[360px] h-[360px] rounded-full bg-gray-300"></div>
        </div>
        <article className="flex justify-center">
          <div className="bg-gray-300 p-8">
            {/* <h2 className="text-[#645555] text-[2rem]">
              4년차 프론트엔드 개발자 이하진입니다.
              <br />
              저의 기술 블로그에 오신 것을 환영합니다.
            </h2> */}
          </div>
        </article>
        <div className="w-28 h-28 rounded-full bg-gray-200"></div>
      </section>
    </>
  );
}
