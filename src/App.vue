<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const categories = ref([])
const selectedCategory = ref('')
const items = ref([])
const cart = ref([])
const receipt = ref(null)

// TODO 1: Create the Vue app with a list of categories
// Load them from GET /api/categories when the page opens, then select the first one.
onMounted(async () => {
  const { data } = await axios.get('/api/categories')
  categories.value = data
  selectedCategory.value = data[0]
  await loadItems()
})

// TODO 2: Fetch items for the selected category with axios
// Call GET /api/items with the selected category as a query parameter.
async function loadItems() {
  const { data } = await axios.get('/api/items', { params: { category: selectedCategory.value } })
  items.value = data
}

// TODO 5: Add the item to the cart in the parent (increase quantity if it's already there)
function addToCart(item) {
}

// TODO 6: Show the cart total with a computed property

// TODO 7: Save the cart to localStorage and load it on start

// TODO 8: Add Reset and Checkout buttons (POST /api/checkout)
// Reset empties the cart. Checkout sends { cart } and shows the receipt that comes back.
</script>

<template>
  <header class="topbar">
    <h1>Mini Cart</h1>
    <span class="badge">{{ cart.length }} in cart</span>
  </header>

  <main class="layout">
    <section>
      <label for="category">Category</label>
      <select id="category" v-model="selectedCategory" @change="loadItems">
        <option v-for="category in categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>

      <!-- TODO 3: Create the ItemCard component with an items prop -->
      <!-- Then import ItemCard above, show it here, and listen for its add-to-cart event. -->
    </section>

    <aside class="cart">
      <h2>Your cart</h2>
      <p v-if="cart.length === 0" class="muted">Nothing here yet.</p>
      <ul v-else>
        <li v-for="line in cart" :key="line.id">
          <span>{{ line.name }} × {{ line.quantity }}</span>
          <span>${{ (line.price * line.quantity).toFixed(2) }}</span>
        </li>
      </ul>

      <div v-if="receipt" class="receipt">
        <strong>Receipt #{{ receipt.receiptId }}</strong>
        <span>Paid ${{ receipt.total.toFixed(2) }}</span>
      </div>
    </aside>
  </main>
</template>
