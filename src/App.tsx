import { Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/home/HomePage'
import ProductsIndex from './pages/products/ProductsIndex'
import ChabokPage from './pages/products/ChabokPage'
import TiamPage from './pages/products/TiamPage'
import HamtaPage from './pages/products/HamtaPage'
import GiftCardPage from './pages/products/GiftCardPage'
import BlogIndex from './pages/blog/BlogIndex'
import BlogPost from './pages/blog/BlogPost'
import AboutPage from './pages/about/AboutPage'
import ContactPage from './pages/contact/ContactPage'

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsIndex />} />
        <Route path="products/chabok" element={<ChabokPage />} />
        <Route path="products/tiam" element={<TiamPage />} />
        <Route path="products/hamta" element={<HamtaPage />} />
        <Route path="products/gift-card" element={<GiftCardPage />} />
        <Route path="blog" element={<BlogIndex />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}
