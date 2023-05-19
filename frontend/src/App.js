import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//import "./App.css";
//import "./components/educationComponents/Educationstyle.css"
//import "./App.css";
import "./App.css";
//import "./components/HealthCare/Health.css";

//import Header from "./components/Header";
import Navigator from "./components/Navigator/Navigator";
import Footer from "./components/Footer";
import AllServices from "./components/AllServices";
//import Courseadmin from "./components/educationComponents/Courseadmin";








// Ads Components
import AdvertiserForm from "./components/Ads/AdvertiserForm";
import PropertyCatalog from "./components/Ads/PropertyCatalog";
import DisplayAd from "./components/Ads/DisplayAd";
import AdvertiserLogin from "./components/Ads/AdvertiserLogin";

/*CareerManagement*/



import AdminViewAds from "./components/Ads/AdminViewAds";
import AdminUpdateAds from "./components/Ads/AdminUpdateAds";
import AdvertiserDetails from "./components/Ads/AdvertiserDetails";



//Lab components
import AddReport from "./components/labComponent/AddReport";
import AllReports from "./components/labComponent/AllReports";
import EditReport from "./components/labComponent/EditReport";
import ReportDetails from "./components/labComponent/ReportDetails";
import UserAllReports from "./components/labComponent/UserAllReports";
import UserReportDetails from "./components/labComponent/UserReportDetails";
//import DeleteReport from "./components/labComponent/DeleteReport";

// User Components
import Login from "./components/Users/Login";
import Register from "./components/Users/Register";
import Profile from "./components/Users/Profile";



function App() {
  useEffect(() => {}, []);

  return (
    <BrowserRouter>
      <Navigator />
      <Routes>
        <Route path="/" element={<AllServices />} />
       
        
        {/* Health Lab Routes */}
        <Route path="/rep" element={<AllReports />} />
        <Route path="/add" element={<AddReport />} />
        <Route path="/edit/:id" element={<EditReport />} />
        <Route path="/rep/:id" element={<ReportDetails />} />
        <Route path="/" element={<AllServices />} />
        <Route path="/Ulabs" element={<UserAllReports />} />
        <Route path="/URepDet/:id" element={<UserReportDetails />} />
       

        
       


        
        
        {/* Ads Routes */}
        <Route path="/Ads/adform" element={<AdvertiserForm />} />
        <Route path="/Ads/properties" element={<PropertyCatalog />} />
        <Route path="/Ads/AdverLogin" element={<AdvertiserLogin />} />
        <Route path="/Ads/AdminView" element={<AdminViewAds />} />
        <Route
          path="/Ads/edit/:id/:town/:agentRef/:heading/:description/:sizeofArea/:priceRate/:contactName/:email/:phone/:image"
          element={<AdminUpdateAds />}
        />
        <Route
          path="/Ads/Ad/:id/:town/:agentRef/:heading/:description/:sizeofArea/:priceRate/:contactName/:email/:phone/:image"
          element={<DisplayAd />}
        />
        <Route path="/Ads/:id" element={<DisplayAd />} />
        <Route path="/Ads/AdverDetails" element={<AdvertiserDetails />} />
        {/* Users */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
