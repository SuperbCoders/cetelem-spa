import { lazy } from "react";

// User pages

export const Index = lazy(() => import('../components/pages/Client/IndexPage'));

export const CarsList = lazy(() => import('../components/pages/Client/CarsPage'));

export const CarsDetail = lazy(() => import('../components/pages/Client/CarsDetail'));

export const WrongUserPage = lazy(() => import('../components/pages/Client/WrongUserPage'));

// Admin pages

export const AdminLogin = lazy(() => import('../components/pages/Login'));

export const AdminDashboard = lazy(() => import('../components/pages/Admin/Dashboard'));

export const AdminCars = lazy(() => import('../components/pages/Admin/Cars'));

export const AdminFilters = lazy(() => import('../components/pages/Admin/DefaultFilter'));

export const AdminDealerCars = lazy(() => import('../components/pages/Admin/DealerCars'));

export const AdminDealersList = lazy(() => import('../components/pages/Admin/DealersList'));

export const AdminReservations = lazy(() => import('../components/pages/Admin/Reservations'));

export const AdminUsers = lazy(() => import('../components/pages/Admin/Users'));

export const AdminGroups = lazy(() => import('../components/pages/Admin/Groups'));

// Dealer pages

export const DealerDashboard = lazy(() => import('../components/pages/Dealer/Dashboard'));

export const DealerCarsList = lazy(() => import('../components/pages/Dealer/CarsList'));

export const DealerReservations = lazy(() => import('../components/pages/Dealer/Reservations'));

export const DealerPersonal = lazy(() => import('../components/pages/Dealer/Personal'));
