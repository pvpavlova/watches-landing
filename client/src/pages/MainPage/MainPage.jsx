import React from 'react'
import InfoPage from '../InfoPage/InfoPage'
import AboutPage from '../AboutPage/AboutPage'
import ContactsPage from '../ContactsPage/ContactsPage'
import './MainPage.css'
import GalleryPage from '../GalleryPage/GalleryPage'

export default function MainPage() {
  return (
    <div><InfoPage/><div className='mr'><AboutPage/></div><ContactsPage/><GalleryPage/></div>
  )}

