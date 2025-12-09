const express = require('express');
const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3001;

const IMAGES_DIR = path.join(__dirname, 'images');

app.use(cors());
app.use(express.json());
fs.ensureDirSync(IMAGES_DIR); // Crea la carpeta si no existe

// Ruta para guardar imagen desde una URL
app.post('/save-image', async (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: 'Missing imageUrl' });
  }

  try {
    // Leer archivos ya existentes
    const files = await fs.readdir(IMAGES_DIR);
    const imageNumbers = files
      .map(name => parseInt(name.replace(/^P(\d+)\.png$/, '$1')))
      .filter(n => !isNaN(n));

    const nextNumber = imageNumbers.length > 0 ? Math.max(...imageNumbers) + 1 : 1;
    const filename = `P${nextNumber}.png`;
    const filepath = path.join(IMAGES_DIR, filename);

    // Descargar y guardar la imagen
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    await fs.writeFile(filepath, response.data);

    res.json({ message: 'Image saved', filename });
  } catch (err) {
    console.error('Error saving image:', err);
    res.status(500).json({ error: 'Failed to save image' });
  }
});

// Servir imágenes estáticamente
app.use('/images', express.static(IMAGES_DIR));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
