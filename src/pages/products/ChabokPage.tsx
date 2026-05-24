import ProductPage from './ProductPage'
import { productsBySlug } from '@/content/products'

export default function ChabokPage() {
  return <ProductPage product={productsBySlug.chabok} />
}
