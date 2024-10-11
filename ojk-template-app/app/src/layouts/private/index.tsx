import { Outlet } from "react-router-dom";
import Header from "components/header/Header";

const PrivateLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default PrivateLayout;
