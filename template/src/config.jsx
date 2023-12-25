import React from "react";

// function root(data, { Helmet, processor }) {
//   if (!data) return null;
//   return (
//     <>
//       <Helmet>
//         <link rel="stylesheet" href="/style.css" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Helmet>
//       <>{data.children && processor.run(data.children)}</>
//     </>
//   );
// }

const config = {
  // types: {
  //   ":root": root,
  // },
  // for the admin interface
  // admin: {
  //   // for init the admin interface
  //   init: ({ CMS }) => {
  //     CMS.registerPreviewStyle(url);
  //   },
  // },
};
export default config;
