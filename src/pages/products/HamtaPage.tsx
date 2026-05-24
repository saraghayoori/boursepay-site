import ProductPage from './ProductPage'
import { productsBySlug } from '@/content/products'

export default function HamtaPage() {
  return <ProductPage product={productsBySlug.hamta} />
}
