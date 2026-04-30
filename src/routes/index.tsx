import { createBrowserRouter } from 'react-router';
import { ROUTES } from '../lib/constants';
import { RootLayout } from './RootLayout';
import { HomePage } from './HomePage';
import { ShopPage } from './ShopPage';
import { ProductPage } from './ProductPage';
import { AboutPage } from './AboutPage';
import { SourcingPage } from './SourcingPage';
import { CartPage } from './CartPage';
import { CheckoutPage } from './CheckoutPage';
import { CheckoutSuccessPage } from './CheckoutSuccessPage';
import { ContactPage } from './ContactPage';
import { FaqPage } from './FaqPage';
import { PrivacyPolicyPage } from './PrivacyPolicyPage';
import { TermsOfUsePage } from './TermsOfUsePage';
import { RefundPolicyPage } from './RefundPolicyPage';
import { NotFoundPage } from './NotFoundPage';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: 'shop', Component: ShopPage },
      { path: 'shop/:category', Component: ShopPage },
      { path: 'products/:slug', Component: ProductPage },
      { path: 'about', Component: AboutPage },
      { path: 'sourcing', Component: SourcingPage },
      { path: 'cart', Component: CartPage },
      { path: 'checkout', Component: CheckoutPage },
      { path: 'checkout/success', Component: CheckoutSuccessPage },
      { path: 'contact', Component: ContactPage },
      { path: 'faq', Component: FaqPage },
      { path: 'privacy-policy', Component: PrivacyPolicyPage },
      { path: 'terms-of-use', Component: TermsOfUsePage },
      { path: 'refund-policy', Component: RefundPolicyPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
]);
