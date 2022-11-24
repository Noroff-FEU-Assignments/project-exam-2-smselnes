import { useContext } from "react";
import Heading from "../layout/Heading";
import SubHeading from "../layout/SubHeading";
import AuthContext from "../../context/AuthContext";

export default function DashboardWelcome() {
  const [auth] = useContext(AuthContext);
  return (
    <div className="dashboard__welcome text-center mt-3">
      <Heading heading="Good day" />
      <SubHeading subHeading={auth.name} />
      <SubHeading subHeading="What mood are you in today?" />
    </div>
  );
}
