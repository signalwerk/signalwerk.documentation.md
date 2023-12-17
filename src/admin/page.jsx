import { typeProcessor } from "../components/index.jsx";
import "./page.css";

const Page = ({ entry }) => {
  const data = entry.getIn(["data"]).toJS();
  const content = data?.content;

  return (
    <div className="page">
      {content?.map((item, index) => {
        return (
          <div key={index}>
            <hr />
            {typeProcessor(item)}
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default Page;
