import { typeProcessor } from "../index.jsx";

export function box(data) {
  return (
    <>
      <div className={`box ${data.class || ""}`}>
        {data?.children?.map((item, index) => (
          <>{typeProcessor(item)}</>
        ))}
      </div>
    </>
  );
}
