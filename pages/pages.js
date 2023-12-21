// const originalCwd = process.cwd;

// // Step 2: Define your new function
// function patchedCwd() {
//   // Log the current working directory
//   console.log('Current Working Directory:', originalCwd());

//   // Return the original current working directory
//   return originalCwd();
// }

// // Step 3: Replace process.cwd with your patched function
// process.cwd = patchedCwd;


import Dhow, { Head } from "@fsoc/dhow";
import { readFile, readdir } from "fs/promises";

import { pagePath, slugs, config } from "../src";
import { typeProcessor } from "../src/components/index.jsx";
import { join } from "path";
// import matter from 'gray-matter'
// import marked from 'marked'

export default ({ page: { data } }) => {
  // const { title, date, description, content } = data;
  const description = data.description || "";
  const content = data.content;
  const title = data.title;
  const date = new Date(data.date).toDateString();

  return (
    <article>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      {content.map((item, index) => {
        return (
          <div key={index}>
            <hr />
            {typeProcessor(item)}
            <hr />
          </div>
        );
      })}
      <br />

      <h2>{title}</h2>
      <p>
        <small>{date}</small>
      </p>
      <p>{description}</p>
      <h4>―</h4>
      <code>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </code>
    </article>
  );
};

export const getPaths = async () => {
  console.log("getPaths");
  return config.slugs;
};

export const getProps = async (slug) => {
  console.log("start getProps");
  const data = config.data[slug];

  const page = {
    data: data.file.data,
  };
  console.log("end getProps", page);

  return { page };
};
