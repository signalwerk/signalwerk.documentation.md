import React from "react";

const libraryStyleSheets = [
  "https://fonts.signalwerk.ch/css/latest/family=Work+Sans:ital,wght@0,100..900;1,100..900.css",
];

function root(data, { Helmet, processor }) {
  return (
    <>
      <Helmet>
        {libraryStyleSheets.map((url) => (
          <link href={url} rel="stylesheet" />
        ))}
        <link rel="stylesheet" href="/style.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      {data?.children?.map((item, index) => (
        <>{processor.run(item)}</>
      ))}
    </>
  );
}

const config = {
  types: {
    ":root": root,
  },
  admin: {
    init: ({ CMS }) => {
      libraryStyleSheets.forEach((url) => {
        CMS.registerPreviewStyle(url);
      });
    },
  },
};
export default config;
