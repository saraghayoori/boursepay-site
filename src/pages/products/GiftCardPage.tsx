import ProductPage from './ProductPage'
import { productsBySlug } from '@/content/products'

/**
 * The only B2C product page. Wrapping the whole page in `.theme-b2c`
 * retargets `--color-accent` to coral via CSS variables — so the rest
 * of the design system stays untouched, but every `accent` utility
 * picks up the warm B2C tone on this page only.
 */
export default function GiftCardPage() {
  return (
    <div className="theme-b2c">
      <ProductPage product={productsBySlug['gift-card']} />
    </div>
  )
}
