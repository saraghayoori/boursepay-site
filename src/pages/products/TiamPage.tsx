import ProductPage from './ProductPage'
import { productsBySlug } from '@/content/products'

export default function TiamPage() {
  return <ProductPage product={productsBySlug.tiam} />
}
