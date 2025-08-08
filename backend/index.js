import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1";

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      HF_API_URL,
      {
        inputs: `Suggest advice for the following symptoms:\n${message}`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const botReply = response.data?.[0]?.generated_text || "Sorry, I couldn't understand your symptoms.";
    res.json({ reply: botReply });

  } catch (err) {
    console.error("API Error:", err.message);
    res.status(500).json({ reply: "Sorry, I couldn’t process your request." });
  }
});


// ---- CONFIG ----
const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://sakshichavan61116:ZhMYrr3rOO6DzNRr@cluster0.86yrmn2.mongodb.net/MediGo";
const DB_NAME = process.env.DB_NAME || "MediGo";
const PORT = process.env.PORT || 5000;

let db; // will hold the connected db instance

// ---------- Helpers ----------
const getCollection = (name) => db.collection(name);

const toNumber = (v) => (typeof v === "string" ? Number(v) : v);

// ---------- Routes ----------

// Health
app.get("/health", (req, res) => {
  return res.json({ ok: true });
});

/**
 * POST /login
 * Body: { name, email, type }
 * Returns: { message, userId }
 */
app.post("/login", async (req, res) => {
  try {
    const users = getCollection("users");
    const userData = {
      name: req.body.name,
      email: req.body.email,
      type: req.body.type,
      createdAt: new Date(),
    };
    const result = await users.insertOne(userData);
    return res.send({ message: "User inserted successfully", userId: result.insertedId });
  } catch (err) {
    console.error("Error inserting user:", err);
    return res.status(500).send("Error inserting user: " + err.message);
  }
});

/**
 * POST /consultation
 * Body: { name, age, gender, symptoms, date, time }
 */
app.post("/consultation", async (req, res) => {
  try {
    const consultations = getCollection("consultations");
    const consultData = {
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      symptoms: req.body.symptoms,
      date: req.body.date,
      time: req.body.time,
      submittedAt: new Date(),
    };
    await consultations.insertOne(consultData);
    return res.send("Consultation request stored successfully");
  } catch (err) {
    console.error("Error storing consultation:", err);
    return res.status(500).send("Error storing consultation: " + err.message);
  }
});

/**
 * GET /cart/:userId
 * Returns the user's cart items
 */
app.get("/cart/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const carts = getCollection("carts");

    const cart = await carts.findOne({ userId });
    return res.json({ items: cart?.items || [] });
  } catch (err) {
    console.error("Error fetching cart:", err);
    return res.status(500).send("Error fetching cart: " + err.message);
  }
});

/**
 * POST /cart/add
 * Body: { userId, productId, name, price, image, quantity }
 * If item exists -> increment, else push.
 */
app.post("/cart/add", async (req, res) => {
  console.log("Adding item to cart:", req.body);
  try {
    const { userId, productId, name, price, image } = req.body;
    let { quantity } = req.body;

    if (!userId || productId === undefined) {
      return res.status(400).json({ message: "Missing userId or productId" });
    }

    quantity = Number(quantity) || 1;

    const carts = getCollection("carts");
    let cart = await carts.findOne({ userId });

    const pid = toNumber(productId);

    if (!cart) {
      cart = {
        userId,
        items: [
          {
            productId: pid,
            name,
            price,
            image,
            quantity,
          },
        ],
        createdAt: new Date(),
      };
      await carts.insertOne(cart);
      return res.json({ items: cart.items });
    }

    const idx = cart.items.findIndex((i) => toNumber(i.productId) === pid);

    if (idx > -1) {
      cart.items[idx].quantity += quantity;
    } else {
      cart.items.push({ productId: pid, name, price, image, quantity });
    }

    await carts.updateOne(
      { userId },
      { $set: { items: cart.items, updatedAt: new Date() } }
    );

    return res.json({ items: cart.items });
  } catch (err) {
    console.error("Error adding item to cart:", err);
    return res.status(500).send("Error adding item to cart: " + err.message);
  }
});

/**
 * PUT /cart
 * Body: { userId, productId, quantity }
 * If quantity < 1 -> remove it.
 */
app.put("/cart", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || productId === undefined || typeof quantity !== "number") {
      return res.status(400).json({ message: "Invalid input" });
    }

    const pid = toNumber(productId);
    const carts = getCollection("carts");
    const cart = await carts.findOne({ userId });

    if (!cart) return res.json({ items: [] });

    const idx = cart.items.findIndex((i) => toNumber(i.productId) === pid);

    if (idx === -1) {
      // nothing to update
      return res.json({ items: cart.items });
    }

    if (quantity < 1) {
      cart.items.splice(idx, 1);
    } else {
      cart.items[idx].quantity = quantity;
    }

    await carts.updateOne(
      { userId },
      { $set: { items: cart.items, updatedAt: new Date() } }
    );

    return res.json({ items: cart.items });
  } catch (err) {
    console.error("Failed to update item:", err);
    return res.status(500).send("Failed to update item: " + err.message);
  }
});

/**
 * DELETE /cart/remove/:userId/:productId
 */
app.delete("/cart/remove/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;
    const pid = toNumber(productId);

    const carts = getCollection("carts");
    const cart = await carts.findOne({ userId });

    if (!cart) return res.json({ items: [] });

    const filtered = cart.items.filter((i) => toNumber(i.productId) !== pid);

    await carts.updateOne(
      { userId },
      { $set: { items: filtered, updatedAt: new Date() } }
    );

    return res.json({ items: filtered });
  } catch (err) {
    console.error("Error deleting cart item:", err);
    return res.status(500).send("Failed to remove item: " + err.message);
  }
});

/**
 * POST /lab
 * Body: { userId, testId, name, price, fasting, reportTime, includes, quantity }
 */
app.post("/lab", async (req, res) => {
  try {
    const labTests = getCollection("labTests");
    const labTestData = {
      userId: req.body.userId,
      testId: req.body.testId,
      name: req.body.name,
      price: req.body.price,
      fasting: req.body.fasting,
      reportTime: req.body.reportTime,
      includes: req.body.includes,
      quantity: req.body.quantity || 1,
      createdAt: new Date(),
    };

    const result = await labTests.insertOne(labTestData);

    return res.send({
      message: "Lab test booked successfully",
      testId: result.insertedId,
    });
  } catch (err) {
    console.error("Error booking lab test:", err);
    return res.status(500).send("Error booking lab test: " + err.message);
  }
});






// ---------- Start server after DB connects ----------
(async function start() {
  try {
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    db = client.db(DB_NAME);
    console.log(`✅ Connected to MongoDB (${DB_NAME})`);

    // Start server only after DB is ready
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  }
})();

