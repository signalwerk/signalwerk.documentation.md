import { typeProcessor } from "../index.jsx";
// import "./grid.css";

export function grid(data) {
  return (
    <>
      {/* <pre>{JSON.stringify({ grid: data }, null, 2)}</pre> */}
      <div className={`grid ${data.class || ""}`}>
        {data?.children?.map((item, index) => (
          <>{typeProcessor({ type: "grid-column", ...item })}</>
        ))}
      </div>
    </>
  );
}
