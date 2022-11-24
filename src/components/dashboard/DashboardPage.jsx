import DashboardWelcome from "./DashboardWelcome";
import DashboardLinks from "./DashboardLinks";

export default function DashboardPage() {
  document.title = "Medi@holic | Register";

  return (
    <>
      <DashboardWelcome />
      <DashboardLinks />
    </>
  );
}
