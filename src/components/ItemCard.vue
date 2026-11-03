<script setup>
// TODO 3: Create the ItemCard component with an items prop
// Declare the prop with defineProps. Each item looks like { id, name, price, emoji }.
const props = defineProps({ items: { type: Array, required: true } })

// TODO 4: Emit add-to-cart from ItemCard
// Declare the event with defineEmits, then emit it from addToCart with the matching item.
const emit = defineEmits(['add-to-cart'])

function addToCart(id) {
  const item = props.items.find((i) => i.id === id)
  emit('add-to-cart', item)
}
</script>

<template>
  <div class="grid">
    <article v-for="item in items" :key="item.id" class="card">
      <div class="emoji">{{ item.emoji }}</div>
      <h3>{{ item.name }}</h3>
      <p class="price">${{ item.price.toFixed(2) }}</p>
      <button @click="addToCart(item.id)">Add to cart</button>
    </article>
  </div>
</template>
