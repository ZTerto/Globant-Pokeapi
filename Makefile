.PHONY: up down reload build clean

# Levantar entorno docker
up:
	- docker rm -f pokeapi-backend || true
	docker-compose down --volumes --remove-orphans || true
	docker-compose up --build -d
	@echo ""
	@echo "🌐 Frontend: http://localhost:8080"
	@echo "🔧 Backend:  http://localhost:3000"

# Levantar entorno docker
upFrontend:
	docker-compose up -d frontend

# Levantar entorno docker
upBackend:
	docker-compose up -d backend

# Apagar entorno
down:
	@echo "🛑 Cerrando contenedores con docker-compose..."
	-docker-compose down

	@echo "🔍 Buscando procesos usando el puerto 3000..."
	@if lsof -i :3000 | grep LISTEN; then \
		echo "⚠️  Puerto 3000 en uso. Matando proceso..."; \
		lsof -ti :3000 | xargs kill -9; \
	else \
		echo "✅ Puerto 3000 libre."; \
	fi

	@echo "✅ Entorno detenido correctamente."


# Acceder a la base de datos SQLite
db:
	@echo ""
	@echo "ℹ️  Comandos útiles dentro de SQLite:"
	@echo ".tables                       -- Ver todas las tablas"
	@echo ".schema images                -- Ver la estructura de la tabla 'images'"
	@echo "SELECT * FROM images;        -- Ver todo el contenido"
	@echo "SELECT * FROM users;         -- Ver usuarios registrados"
	@echo ".quit                        -- Para salir"
	@echo ""
	sqlite3 backend/db/data.db


# Reiniciar
reload: down up

build:
	@echo "🧪 Verificando entorno..."

	@# Verificar make
	@if ! command -v make > /dev/null; then \
		echo "❌ make no está instalado. Instálalo con: sudo apt install make"; \
		exit 1; \
	else \
		echo "✅ make instalado"; \
	fi

	@# Verificar node
	@if ! command -v node > /dev/null; then \
		echo "❌ Node.js no está instalado. Instálalo con: sudo apt install nodejs"; \
		exit 1; \
	else \
		echo "✅ Node.js instalado: $$(node -v)"; \
	fi

	@# Verificar npm
	@if ! command -v npm > /dev/null; then \
		echo "❌ npm no está instalado. Instálalo con: sudo apt install npm"; \
		exit 1; \
	else \
		echo "✅ npm instalado: $$(npm -v)"; \
	fi

	@# Verificar docker
	@if ! command -v docker > /dev/null; then \
		echo "❌ Docker no está instalado. Instálalo con: sudo apt install docker.io"; \
		exit 1; \
	else \
		echo "✅ Docker instalado: $$(docker --version)"; \
	fi

	@# Verificar docker-compose
	@if ! command -v docker-compose > /dev/null; then \
		echo "❌ docker-compose no está instalado. Instálalo con: sudo apt install docker-compose"; \
		exit 1; \
	else \
		echo "✅ docker-compose instalado: $$(docker-compose --version)"; \
	fi

	@# Verificar sqlite3
	@if ! command -v sqlite3 > /dev/null; then \
		echo "❌ sqlite3 no está instalado. Instálalo con: sudo apt install sqlite3"; \
		exit 1; \
	else \
		echo "✅ sqlite3 instalado: $$(sqlite3 --version)"; \
	fi

	@echo "🎉 Todos los requisitos están satisfechos."
