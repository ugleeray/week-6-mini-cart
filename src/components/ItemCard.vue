<script setup>
// TODO 3: Create the ItemCard component with an items prop
// Declare the prop with defineProps. Each item looks like { id, name, price, emoji }.

// TODO 4: Emit add-to-cart from ItemCard
// Declare the event with defineEmits, then emit it from addToCart with the matching item.
function addToCart(id) {
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
