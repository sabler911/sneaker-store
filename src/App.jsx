import { useState } from 'react'
import './App.css'

const PRODUCTS = [
  { id: 1, name: 'Air Max 90', price: 120, image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&q=80' },
  { id: 2, name: 'Yeezy Boost 350', price: 220, image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=500&q=80' },
  { id: 3, name: 'Jordan 1 Retro', price: 170, image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&q=80' },
  { id: 4, name: 'Dunk Low Panda', price: 110, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&q=80' },
]

function App() {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  function addToCart(product) {
    setCart([...cart, product])
  }

  function removeFromCart(index) {
    const newCart = [...cart]
    newCart.splice(index, 1)
    setCart(newCart)
  }

  function checkout() {
    alert("Order placed successfully! 🎉")
    setCart([])
    setIsCartOpen(false)
  }

  const total = cart.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className="app">
      <header className="navbar">
        <h1>Kicks Store</h1>
        <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
          🛒 Cart: {cart.length} items | Total: ${total}
        </button>
      </header>

      <main className="product-grid">
        {PRODUCTS.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </main>

      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Your Cart</h2>
              <button className="close-btn" onClick={() => setIsCartOpen(false)}>×</button>
            </div>
            
            <div className="cart-items">
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <div>
                      <h4>{item.name}</h4>
                      <p>${item.price}</p>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(index)}>
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="cart-footer">
              <h3>Total: ${total}</h3>
              <button 
                className="checkout-btn" 
                disabled={cart.length === 0}
                onClick={checkout}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App