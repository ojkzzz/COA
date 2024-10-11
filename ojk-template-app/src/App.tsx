import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { useAppSelector } from "store/hooks/hooks";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "router";
import PrivateLayout from "layouts/private";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { auth } = useAppSelector((state) => state.auth);
  return (
    <>
      {!auth ? (
        <Routes>
          {PUBLIC_ROUTES.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                <Suspense fallback={<CircularProgress />}>
                  <route.Element />
                </Suspense>
              }
            />
          ))}
          <Route path="*" element={<Navigate to="/auth/sign-in" />} />
        </Routes>
      ) : (
        <Routes>
          <Route element={<PrivateLayout />}>
            {PRIVATE_ROUTES.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Suspense fallback={<CircularProgress />}>
                    <route.Element />
                  </Suspense>
                }
              />
            ))}
            <Route path="*" element={<Navigate to="/orders" />} />
          </Route>
        </Routes>
      )}
      <ToastContainer transition={Slide} position="bottom-right" hideProgressBar />
    </>
  );
}

export default App;
