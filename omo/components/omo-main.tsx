export default function OmoMain() {
  return (
    <>
      <main className="w-full h-full">
        <section className="bg-[#FEA1A1] h-[1080px]">
          <div className="flex justify-between">
            <div className="w-[360px] h-[280px] bg-[#EFEFEF] p-4 m-0 title-box">
              <h2 className="text-5xl text-[#645555]">
                omoshiroi
                <br />
                my-tech
                <br />
                blog
              </h2>
            </div>
            <div className="w-[360px] h-[360px] rounded-full bg-gray-300 moving-circle"></div>
          </div>

          {/* <div className="w-28 h-28 rounded-full bg-gray-200"></div> */}
        </section>
      </main>
    </>
  );
}
