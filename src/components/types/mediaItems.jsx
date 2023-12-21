// import "./mediaItems.css";

export function mediaItems(data) {
  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className={`media-items ${data.class || ""}`}>
        {data?.children?.map((item, index) => (
          <div key={index}>
            {item.path && (
              <img
                className={`media-items__image`}
                src={`./${item.path.replace("/public/", "")}`}
                alt={item.caption || data.caption || "Media item"}
              />
            )}
            {item.caption && <p>{item.caption}</p>}
          </div>
        ))}
        {data.caption && <p>{data.caption}</p>}
      </div>
    </>
  );
}
