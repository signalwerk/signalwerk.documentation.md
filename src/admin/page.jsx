import { typeProcessor } from "../components/index.jsx";

const Page = ({ entry }) => {
  const data = entry.getIn(["data"]).toJS();
  const content = data?.children;
  return (
    <div className="page">
      {content?.map((item, index) => {
        return <div key={index}>{typeProcessor(item)}</div>;
      })}
    </div>
  );
};

export default Page;
