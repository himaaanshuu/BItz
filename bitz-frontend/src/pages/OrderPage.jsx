import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, X, ChevronRight, CreditCard, Wallet, User, LogOut, Package } from 'lucide-react';

const OrderPage = () => {
  const [selectedCanteen, setSelectedCanteen] = useState(null);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user data
    const userData = localStorage.getItem('bitezUser') || sessionStorage.getItem('bitezUser');
    const token = localStorage.getItem('bitezToken') || sessionStorage.getItem('bitezToken');
    const hasAuthCookie = document.cookie
      .split(';')
      .some((cookie) => cookie.trim().startsWith('bitezAuth=student'));
    
    if (!userData || !token || !hasAuthCookie) {
      navigate('/student-login');
      return;
    }
    
    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      console.error('Error loading user:', error);
      navigate('/student-login');
    }
  }, [navigate]);

  const canteens = [
    {
      id: 1,
      name: "Main Canteen",
      location: "Ground Floor, Building A",
      timing: "8:00 AM - 8:00 PM",
      menu: [
        { id: 101, name: "Veg Burger", price: 60, category: "Fast Food", image: "🍔" },
        { id: 102, name: "Pizza Slice", price: 80, category: "Fast Food", image: "🍕" },
        { id: 103, name: "French Fries", price: 40, category: "Snacks", image: "🍟" },
        { id: 104, name: "Cold Coffee", price: 50, category: "Beverages", image: "☕" },
        { id: 105, name: "Sandwich", price: 45, category: "Snacks", image: "🥪" },
      ]
    },
    {
      id: 2,
      name: "South Canteen",
      location: "2nd Floor, Building B",
      timing: "9:00 AM - 6:00 PM",
      menu: [
        { id: 201, name: "Masala Dosa", price: 70, category: "South Indian", image: "🥘" },
        { id: 202, name: "Idli Sambhar", price: 50, category: "South Indian", image: "🍚" },
        { id: 203, name: "Vada", price: 30, category: "South Indian", image: "🥯" },
        { id: 204, name: "Filter Coffee", price: 25, category: "Beverages", image: "☕" },
        { id: 205, name: "Upma", price: 40, category: "South Indian", image: "🍜" },
      ]
    },
    {
      id: 3,
      name: "North Canteen",
      location: "1st Floor, Building C",
      timing: "8:30 AM - 7:00 PM",
      menu: [
        { id: 301, name: "Chole Bhature", price: 80, category: "North Indian", image: "🫓" },
        { id: 302, name: "Paneer Paratha", price: 60, category: "North Indian", image: "🥙" },
        { id: 303, name: "Samosa", price: 20, category: "Snacks", image: "🥟" },
        { id: 304, name: "Lassi", price: 35, category: "Beverages", image: "🥛" },
        { id: 305, name: "Rajma Chawal", price: 90, category: "North Indian", image: "🍛" },
      ]
    },
    {
      id: 4,
      name: "Juice Corner",
      location: "Near Library",
      timing: "7:00 AM - 9:00 PM",
      menu: [
        { id: 401, name: "Fresh Orange Juice", price: 40, category: "Fresh Juice", image: "🍊" },
        { id: 402, name: "Watermelon Juice", price: 35, category: "Fresh Juice", image: "🍉" },
        { id: 403, name: "Mixed Fruit Smoothie", price: 60, category: "Smoothies", image: "🥤" },
        { id: 404, name: "Banana Shake", price: 50, category: "Shakes", image: "🍌" },
        { id: 405, name: "Lemonade", price: 25, category: "Beverages", image: "🍋" },
      ]
    }
  ];

  const addToCart = (item, canteen) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1, canteenName: canteen.name }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId);
    if (existingItem.quantity === 1) {
      setCart(cart.filter(cartItem => cartItem.id !== itemId));
    } else {
      setCart(cart.map(cartItem =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ));
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCheckout = (paymentMethod) => {
    const tokenNumber = Math.floor(Math.random() * 900) + 100;
    
    // Create order object
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      status: 'Pending',
      total: getCartTotal(),
      estimatedTime: '25-30 mins',
      deliveryAddress: 'Campus Hostel',
      paymentMethod: paymentMethod,
      tokenNumber: tokenNumber,
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        canteen: item.canteenName
      }))
    };

    // Save to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('bitezOrders') || '[]');
    existingOrders.unshift(newOrder);
    localStorage.setItem('bitezOrders', JSON.stringify(existingOrders));

    alert(`Order Placed! 🎉\nToken Number: ${tokenNumber}\nPayment: ${paymentMethod}\nTotal: ₹${getCartTotal()}\n\nPlease collect your order from the canteen!`);
    
    setCart([]);
    setShowPaymentModal(false);
    setShowCart(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('bitezToken');
    localStorage.removeItem('bitezUser');
    sessionStorage.removeItem('bitezToken');
    sessionStorage.removeItem('bitezUser');
    document.cookie = 'bitezAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    navigate('/student-login');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo - Clickable */}
          <div 
            onClick={() => navigate('/')} 
            className="cursor-pointer hover:opacity-80 transition"
          >
            <h1 className="text-3xl font-bold">BITEZ.</h1>
            <p className="text-sm opacity-90">Order Your Food</p>
            <p className="text-xs opacity-75">Choose from our amazing canteens!</p>
          </div>

          {/* Right Side - User Menu & Cart */}
          <div className="flex items-center gap-4">
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="bg-white text-orange-600 px-4 py-2 rounded-full font-bold hover:bg-orange-50 transition flex items-center gap-2"
              >
                <User size={20} />
                <span className="hidden md:inline">{user.name}</span>
              </button>

              {/* Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 z-50 border-2 border-orange-200">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="font-bold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  
                  <button
                    onClick={() => {
                      navigate('/order');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-orange-50 text-gray-800 flex items-center gap-3"
                  >
                    <User size={18} />
                    Dashboard
                  </button>
                  
                  <button
                    onClick={() => {
                      navigate('/track');
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-orange-50 text-gray-800 flex items-center gap-3"
                  >
                    <Package size={18} />
                    Track Orders
                  </button>
                  
                  <hr className="my-2" />
                  
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-600 font-semibold flex items-center gap-3"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setShowCart(!showCart)}
              className="relative bg-white text-orange-600 p-3 rounded-full hover:bg-orange-50 transition"
            >
              <ShoppingCart size={24} />
              {getCartItemCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                  {getCartItemCount()}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {!selectedCanteen ? (
          /* Canteen Selection */
          <div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Choose Your Canteen
            </h2>
            <p className="text-gray-600 mb-8">Select from our available canteens</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {canteens.map(canteen => (
                <div
                  key={canteen.id}
                  onClick={() => setSelectedCanteen(canteen)}
                  className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl transition transform hover:-translate-y-1 border-2 border-transparent hover:border-orange-400"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{canteen.name}</h3>
                      <p className="text-gray-600 text-sm mb-1">📍 {canteen.location}</p>
                      <p className="text-gray-600 text-sm">🕐 {canteen.timing}</p>
                    </div>
                    <ChevronRight className="text-orange-600" size={28} />
                  </div>
                  <div className="flex gap-2 flex-wrap mt-4">
                    {canteen.menu.slice(0, 3).map(item => (
                      <span key={item.id} className="text-2xl">{item.image}</span>
                    ))}
                    <span className="text-gray-500 text-sm self-center">+{canteen.menu.length - 3} more</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Menu Display */
          <div>
            <button
              onClick={() => setSelectedCanteen(null)}
              className="mb-6 text-orange-600 hover:text-orange-800 font-semibold flex items-center gap-2"
            >
              ← Back to Canteens
            </button>
            
            <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl p-6 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{selectedCanteen.name}</h2>
              <p className="text-gray-700">📍 {selectedCanteen.location}</p>
              <p className="text-gray-700">🕐 {selectedCanteen.timing}</p>
            </div>

            <h3 className="text-2xl font-bold mb-6 text-gray-800">Menu</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedCanteen.menu.map(item => {
                const cartItem = cart.find(c => c.id === item.id);
                const quantity = cartItem ? cartItem.quantity : 0;

                return (
                  <div key={item.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
                    <div className="p-6">
                      <div className="text-5xl mb-4 text-center">{item.image}</div>
                      <div className="mb-4">
                        <h4 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h4>
                        <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                        <p className="text-2xl font-bold text-orange-600">₹{item.price}</p>
                      </div>
                      
                      {quantity === 0 ? (
                        <button
                          onClick={() => addToCart(item, selectedCanteen)}
                          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition"
                        >
                          Add to Cart
                        </button>
                      ) : (
                        <div className="flex items-center justify-between bg-orange-100 rounded-lg p-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-white text-orange-600 w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
                          >
                            <Minus size={20} />
                          </button>
                          <span className="font-bold text-orange-600 text-lg">{quantity}</span>
                          <button
                            onClick={() => addToCart(item, selectedCanteen)}
                            className="bg-white text-orange-600 w-10 h-10 rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
                          >
                            <Plus size={20} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowCart(false)}>
          <div
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Your Cart</h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center gap-4 bg-orange-50 p-4 rounded-lg">
                        <span className="text-3xl">{item.image}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800">{item.name}</h4>
                          <p className="text-sm text-gray-500">{item.canteenName}</p>
                          <p className="text-orange-600 font-semibold">₹{item.price} × {item.quantity}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="bg-white text-orange-600 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 border border-orange-200"
                          >
                            <Minus size={16} />
                          </button>
                          <button
                            onClick={() => addToCart(item, { name: item.canteenName })}
                            className="bg-white text-orange-600 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 border border-orange-200"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">₹{getCartTotal()}</span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold text-gray-800">
                      <span>Total</span>
                      <span className="text-orange-600">₹{getCartTotal()}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-red-600 transition shadow-lg"
                  >
                    Place Order - ₹{getCartTotal()}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-black text-gray-900">Choose Payment</h2>
              <button 
                onClick={() => setShowPaymentModal(false)} 
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">
              <div className="bg-orange-50 rounded-xl p-4 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">Order Total</span>
                  <span className="text-3xl font-black text-orange-600">₹{getCartTotal()}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={() => handleCheckout('UPI')}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-5 rounded-2xl font-bold text-lg hover:scale-105 transition shadow-lg flex items-center justify-center gap-3"
              >
                <CreditCard size={24} />
                Pay via UPI
              </button>
              
              <button 
                onClick={() => handleCheckout('Cash')}
                className="w-full bg-white border-4 border-orange-500 text-orange-600 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition shadow-lg flex items-center justify-center gap-3"
              >
                <Wallet size={24} />
                Pay with Cash
              </button>
            </div>

            <p className="text-center text-gray-500 text-sm mt-6">
              Your order will be confirmed after payment
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderPage;