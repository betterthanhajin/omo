export default function OmoSection({
  backgroundColor,
  block,
  children,
}: {
  backgroundColor: string;
  block?: { display?: string };
  children?: React.ReactNode;
}) {
  const blockStyle = block ? { display: block.display } : {};
  return (
    <div
      className="w-screen h-screen flex-shrink-0 flex justify-center items-center text-white"
      style={{ backgroundColor, ...blockStyle }}
    >
      {children}
    </div>
  );
}
