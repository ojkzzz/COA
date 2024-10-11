import { LoginPage, OrdersPage } from "pages";

export const PRIVATE_ROUTES = [{ path: "/orders", Element: OrdersPage }];

export const PUBLIC_ROUTES = [
  {
    path: "/auth/sign-in",
    Element: LoginPage,
  },
];
