import { useEffect, useMemo, useState } from "react";
import { api } from "../utils/api";
import { toast } from "react-toastify";
import "./CartPage.css";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  const setBusyFor = (pid, val) =>
    setBusy((m) => ({ ...m, [pid]: val }));

  const fetchCart = async () => {
    if (!user?.userId) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await api.get(`/cart/${user.userId}`);
      console.log("Cart API Response:", res.data);
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error("Error fetching cart", err);
      toast.error("Couldn't fetch cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateQuantity = async (productId, newQty) => {
    if (newQty < 1) return;
    try {
      setBusyFor(productId, true);
      await api.put(`/cart`, {
        userId: user.userId,
        productId,
        quantity: newQty,
      });
      await fetchCart();
    } catch (err) {
      console.error("Error updating quantity", err);
      toast.error("Failed to update quantity");
    } finally {
      setBusyFor(productId, false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      setBusyFor(productId, true);
      await api.delete(`/cart/remove/${user.userId}/${productId}`);
      toast.info("Item removed from cart");
      await fetchCart();
    } catch (err) {
      console.error("Error removing item", err);
      toast.error("Failed to remove item");
    } finally {
      setBusyFor(productId, false);
    }
  };

  // Totals – fallback to mrp when price not present
  const { total, mrpTotal, saved } = useMemo(() => {
    const t = cartItems.reduce(
      (acc, item) => {
        const unitPrice = Number(item.price ?? item.mrp) || 0; // what you actually charge
        const unitMrp = Number(item.mrp ?? item.price) || 0;   // original MRP if present
        acc.total += unitPrice * item.quantity;
        acc.mrpTotal += unitMrp * item.quantity;
        return acc;
      },
      { total: 0, mrpTotal: 0 }
    );
    return { ...t, saved: Math.max(0, t.mrpTotal - t.total) };
  }, [cartItems]);

  if (loading) {
    return (
      <div className="cart-page">
        <h2>Your Cart</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item) => {
              const pid = item.productId;
              const disabled = !!busy[pid];

              const unitPrice = Number(item.price ?? item.mrp) || 0;
              const unitMrp = Number(item.mrp ?? item.price) || 0;
              const lineTotal = unitPrice * item.quantity;

              return (
                <li key={pid} className="cart-item">
                  <img src={item.image} alt={item.name} />
                  <div>
                    <h4>{item.name}</h4>

                    <p>
                      Price: ₹{unitPrice}
                      {unitMrp > unitPrice && (
                        <span
                          style={{
                            marginLeft: 8,
                            textDecoration: "line-through",
                            color: "#888",
                          }}
                        >
                          ₹{unitMrp}
                        </span>
                      )}
                    </p>

                    <p className="qty-row">
                      Quantity:
                      <button
                        onClick={() => updateQuantity(pid, item.quantity - 1)}
                        disabled={item.quantity === 1 || disabled}
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(pid, item.quantity + 1)}
                        disabled={disabled}
                      >
                        +
                      </button>
                    </p>

                    <p>
                      <b>Subtotal:</b> ₹{lineTotal.toFixed(2)}
                    </p>

                    <div className="actions">
                      <button
                        className="remove"
                        onClick={() => handleRemoveItem(pid)}
                        disabled={disabled}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="cart-total">
            {mrpTotal > total && (
              <div style={{ color: "#888", textDecoration: "line-through" }}>
                MRP Total: ₹{mrpTotal.toFixed(2)}
              </div>
            )}
            <div>
              <b>Total: ₹{total.toFixed(2)}</b>
            </div>
            {saved > 0 && (
              <div style={{ color: "#2e7d32", fontWeight: 600 }}>
                You saved ₹{saved.toFixed(2)}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;
