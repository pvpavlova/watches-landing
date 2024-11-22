import React from "react";
import InfoPage from "../InfoPage/InfoPage";
import AboutPage from "../AboutPage/AboutPage";
import ContactsPage from "../ContactsPage/ContactsPage";
import "./MainPage.css";
import GalleryPage from "../GalleryPage/GalleryPage";
import AboutPage2 from "../AboutPage/AboutPage2";
import PoolPage from "../PoolPage/PoolPage";

export default function MainPage() {
  return (
    <div>
      <InfoPage />
           <AboutPage2 style={{zIndex: 10000}}/>
        <AboutPage style={{zIndex: 10000}}/>
      <GalleryPage />
      <PoolPage />
    </div>
  );
}
