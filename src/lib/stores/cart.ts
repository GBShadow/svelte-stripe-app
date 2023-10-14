import { get, writable } from 'svelte/store';

export const cartItems = writable<CartItem[]>([]);

export const addToCart = (id: string) => {
	const items = get(cartItems);

	const itemIndex = items.findIndex((item) => item.id === id);

	if (itemIndex !== -1) {
		const updateItems = items.map((item) =>
			item.id === id ? { ...item, quantity: item.quantity + 1 } : item
		);
		cartItems.update(() => [...updateItems]);

		return;
	}

	cartItems.update(() => [...items, { id, quantity: 1 }]);
};

export const removeFromCart = (id: string) => {
	const items = get(cartItems);

	const itemFounded = items.find((item) => item.id === id);

	if (itemFounded && itemFounded.quantity !== 0) {
		const updateItems = items.map((item) =>
			item.id === id ? { ...item, quantity: item.quantity - 1 } : item
		);
		cartItems.update(() => [...updateItems]);

		return;
	}

	cartItems.update(() => items.filter((item) => item.id !== id));
};
