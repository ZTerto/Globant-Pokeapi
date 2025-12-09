# 🔥 PokéFusion App

Generador visual de fusiones Pokémon basado en sus tipos, colores y formas. Este proyecto permite fusionar dos Pokémon y generar una imagen única usando una API de imagen generativa, además de guardar y mostrar las últimas fusiones generadas.

---

## 🧩 Características

- ✨ Fusión dinámica de Pokémon usando IA (pollinations API)
- 🔍 Selección visual de Pokémon (1–820)
- 💾 Backend con Express + SQLite para guardar:
  - Imagen generada
  - Prompt utilizado
  - Fecha de creación
- 🧰 Configurado con Docker y Makefile para automatizar todo el entorno

---

## 📸 Vista del Proyecto
![Home](./frontend/public/screenshots/home.png)
![Fusioner Screenshot](./frontend/public/screenshots/fusioner.png)

---

## 🚀 Instalación Rápida

```bash
# Clonar repositorio
git clone https://github.com/tuusuario/Globant-Pokeapi.git
cd Globant-Pokeapi

# Levantar el proyecto completo
make up

# Levantar entorno docker
make upFrontend

# Levantar entorno docker
make upBackend
