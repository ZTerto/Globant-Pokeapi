const express = require('express');
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const cors = require('cors');
const Database = require('better-sqlite3');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3001;
const SECRET_KEY = 'supersecret';

// Rutas importantes
const IMAGES_DIR = path.join(__dirname, 'images');
const DB_PATH = path.join(__dirname, 'db', 'data.db');

// Asegurar carpetas necesarias
fs.ensureDirSync(IMAGES_DIR);
fs.ensureDirSync(path.dirname(DB_PATH));

// Conectar a SQLite
const db = new Database(DB_PATH);

// Crear tablas
db.prepare(`
  CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    prompt TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`).run();

app.use(cors());
app.use(express.json());

// Middleware de autenticación
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied: No token provided' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

// Registro
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare('INSERT INTO users (email, password) VALUES (?, ?)');
    const result = stmt.run(email, hashedPassword);

    const token = jwt.sign({ userId: result.lastInsertRowid }, SECRET_KEY, {
      expiresIn: '2h'
    });

    res.json({ token });
  } catch (err) {
    if (err.code === 'SQLITE_CONSTRAINT') {
      res.status(400).json({ error: 'Email already registered' });
    } else {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: 'Email and password required' });

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);

  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ userId: user.id }, SECRET_KEY, {
    expiresIn: '2h'
  });

  res.json({ token });
});

// ✅ Ruta protegida para guardar imagen
app.post('/save-image', verifyToken, async (req, res) => {
  const { imageUrl, prompt } = req.body;

  if (!imageUrl || !prompt) {
    return res.status(400).json({ error: 'Missing imageUrl or prompt' });
  }

  try {
    const files = await fs.readdir(IMAGES_DIR);
    const imageNumbers = files
      .map(name => parseInt(name.replace(/^P(\d+)\.png$/, '$1')))
      .filter(n => !isNaN(n));
    const nextNumber = imageNumbers.length > 0 ? Math.max(...imageNumbers) + 1 : 1;

    const filename = `P${nextNumber}.png`;
    const filepath = path.join(IMAGES_DIR, filename);

    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    await fs.writeFile(filepath, response.data);

    db.prepare(`
      INSERT INTO images (filename, prompt)
      VALUES (?, ?)
    `).run(filename, prompt);

    res.json({ message: '✅ Image saved', filename });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed to save image' });
  }
});

// ✅ Ruta pública para mostrar últimas fusiones
app.get('/recent-fusions', (req, res) => {
  try {
    const recent = db
      .prepare("SELECT filename, prompt FROM images ORDER BY id DESC LIMIT 12")
      .all();

    res.json(recent);
  } catch (err) {
    console.error("Error fetching recent fusions:", err);
    res.status(500).json({ error: "Failed to get recent fusions" });
  }
});

// Servir imágenes de forma estática
app.use('/images', express.static(IMAGES_DIR));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
