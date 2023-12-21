import { typeProcessor } from "../index.jsx";
// import "./column.css";

export function column(data) {
  return (
    <>
      {/* <pre>column -- {JSON.stringify({ column: data }, null, 2)}</pre> */}
      <div
        className={`grid-column ${data.class || ""}`}
        style={{ "--grid-column--grid-column--count": data.cols || 12 }}
      >
        {data?.children?.map((item, index) => (
          <>{typeProcessor({ type: "column", ...item })}</>
        ))}
      </div>
    </>
  );
}
