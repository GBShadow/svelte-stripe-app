<script lang="ts">
	import ProductCard from '$lib/productCard.svelte';

	const products: Product[] = [
		{
			id: crypto.randomUUID(),
			name: 'Coffee',
			price: 5
		},
		{
			id: crypto.randomUUID(),
			name: 'Sunglasses',
			price: 10
		},
		{
			id: crypto.randomUUID(),
			name: 'Water bottle',
			price: 15
		}
	];
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="grid grid-cols-3 gap-4">
		<div class="col-span-3 prose-xl">
			<h1>SvelteKit 1.0 Store</h1>
		</div>
		{#each products as product}
			<ProductCard {product} />
		{/each}
		<div class="col-span-3">
			<button class="btn variant-filled-primary">Checkout with Stripe API</button>
		</div>
	</div>
</div>
