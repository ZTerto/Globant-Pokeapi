.PHONY: up down reload build clean

# Levantar entorno docker
up:
	docker-compose down --volumes --remove-orphans || true
	docker-compose up -d frontend
	cd backend && node index.js &

# Levantar entorno docker
upFrontend:
	docker-compose down --volumes --remove-orphans || true
	docker-compose up frontend

# Levantar entorno docker
upBackend:
	cd backend && node index.js

# Apagar entorno
down:
	docker-compose down

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

clean:
	@echo "🧹 Limpiando entorno del frontend..."
	rm -rf frontend
	rm -f docker-compose.yml

	@echo "🧹 Limpiando entorno del backend..."
	rm -rf backend
	rm -rf mongo-data

	@echo "✅ Limpieza completada."

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

	@echo "🎉 Todos los requisitos están satisfechos."
