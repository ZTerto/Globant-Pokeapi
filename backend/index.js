const express = require('express');
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const cors = require('cors');
const Database = require('better-sqlite3');

const app = express();
const PORT = 3001;

// Rutas importantes
const IMAGES_DIR = path.join(__dirname, 'images');
const DB_PATH = path.join(__dirname, 'db', 'data.db');

// Asegurar carpetas necesarias
fs.ensureDirSync(IMAGES_DIR);
fs.ensureDirSync(path.dirname(DB_PATH));

// Conectar a SQLite (crea el archivo si no existe)
const db = new Database(DB_PATH);

// Crear tabla si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    prompt TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`).run();

app.use(cors());
app.use(express.json());

// ✅ Ruta para guardar imagen + registrar en la DB
app.post('/save-image', async (req, res) => {
  const { imageUrl, prompt } = req.body;

  if (!imageUrl || !prompt) {
    return res.status(400).json({ error: 'Missing imageUrl or prompt' });
  }

  try {
    // Obtener siguiente número de imagen
    const files = await fs.readdir(IMAGES_DIR);
    const imageNumbers = files
      .map(name => parseInt(name.replace(/^P(\d+)\.png$/, '$1')))
      .filter(n => !isNaN(n));
    const nextNumber = imageNumbers.length > 0 ? Math.max(...imageNumbers) + 1 : 1;

    const filename = `P${nextNumber}.png`;
    const filepath = path.join(IMAGES_DIR, filename);

    // Descargar imagen
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    await fs.writeFile(filepath, response.data);

    // Guardar metadata en la DB
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

// ✅ Ruta para obtener las 12 últimas fusiones
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

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
