import { typeProcessor } from "../components/index.jsx";
import config from "../../../../src/config.jsx";
import { fixPage } from "../utils/fixPage";
import { env } from "process";

const Page = ({ entry, CMS }) => {
  const dataCMS = entry.getIn(["data"]).toJS();

  const data = fixPage(dataCMS);
  const content = typeProcessor(data, config);
  return (
    <div className="preview">
      {/* process */}
      {content}
    </div>
  );
};

export default Page;
