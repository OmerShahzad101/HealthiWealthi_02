import { loadStripe } from '@stripe/stripe-js/pure';
import { Elements } from '@stripe/react-stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

export default function withStripeElements(Component) {
    return function StripeElements(props) {
        return (
            <Elements stripe={stripePromise}>
                <Component {...props} />
            </Elements>
        );
    };
}
