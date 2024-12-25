import ErrorPage from "./Error";
import Home from "../pages/Home.jsx";
import AddProperty from "../pages/AddProperty.jsx";
import AdminDashboard from "../pages/AdminDashboard";
import EditProperty from "../pages/EditProperty";
import InteractiveMap from "../pages/InteractiveMap";
import PropertyDetails from "../pages/PropertyDetails";
import RequestCommercialContract from "../pages/RequestCommercialContract.jsx";
import RequestResidentialContract from "../pages/RequestResidentialContract.jsx";
import Explorer from "../pages/Explorer.jsx";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import ReviewAds from "../pages/ReviewAds.jsx";
import ReviewContractRequist from "../pages/ReviewContractRequist.jsx";
import ReviewManagement from "../pages/ReviewManagement.jsx";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
    {
        path: "/",
        errorElement: <ErrorPage />
    },
    {
        path: "/home",
        element: <Home />
    },
    {
        path: "/propertydetails/:id",
        element: <PropertyDetails />
    },
    {
        path: "/searchmap",
        element: <InteractiveMap />
    },
    {
        path: "/editproperty",
        element: <EditProperty />
    },
    {
        path: "/addproperty",
        element: <AddProperty />
    },
    {
        path: "/admindashboard",
        element: <AdminDashboard />
    },
    {
        path: "/requestcommercialcontract",
        element: <RequestCommercialContract />
    },
    {
        path: "/requestresidentialcontract",
        element: <RequestResidentialContract />
    },
    {
        path: "/explorer",
        element: <Explorer/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/signup",
        element: <Signup/>
    },
    {
        path: "/reviewads/:id",
        element: <ReviewAds/>
    },
    {
        path: "/reviewcontractrequist/:id/:type",
        element: <ReviewContractRequist/>
    },
    {
        path: "/reviewmanagement/:id",
        element: <ReviewManagement/>
    }


]);
const Router = () => {
    return <RouterProvider router={router} />;
};

export default Router
