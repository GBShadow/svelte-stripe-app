import type { RequestHandler } from '@sveltejs/kit';
import Stripe from 'stripe';

const SECRET_STRIPE_KEY = '';
const stripe = new Stripe(SECRET_STRIPE_KEY, {
	apiVersion: '2023-08-16'
});

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const items = data.items as CartItem[];

	const lineItems: any[] = [];

	items.forEach((item) => {
		lineItems.push({
			price: item.id,
			quantity: item.quantity
		});
	});

	const session = await stripe.checkout.sessions.create({
		line_items: lineItems,
		mode: 'payment',
		success_url: 'http://localhost:5173/success',
		cancel_url: 'http://localhost:5173/cancel'
	});

	return new Response(JSON.stringify({ url: session.url }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' }
	});
};
