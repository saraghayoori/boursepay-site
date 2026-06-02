import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import RootLayout from './layouts/RootLayout'
import HomePage from './pages/home/HomePage'
import ProductsIndex from './pages/products/ProductsIndex'
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
        {/* Legacy per-product paths — redirect to the matching tab on
            the unified /products page. Preserved so any old links
            (Header dropdowns, blog posts, external referrals) keep
            working. */}
        <Route path="products/:slug" element={<LegacyProductRedirect />} />
        <Route path="blog" element={<BlogIndex />} />
        <Route path="blog/:slug" element={<BlogPost />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>
    </Routes>
  )
}

function LegacyProductRedirect() {
  const { slug } = useParams<{ slug: string }>()
  return (
    <Navigate to={`/products${slug ? `#${slug}` : ''}`} replace />
  )
}
