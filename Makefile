.PHONY: up down reload build clean

# Levantar entorno docker
up:
	docker-compose up frontend

# Levantar entorno vite
upVite:
	cd frontend && \
	npm run dev

# Apagar entorno
down:
	docker-compose down

# Reiniciar
reload: down up

# Reconstruir frontend con todo lo necesario
build frontend:
	mkdir frontend && \
	cd frontend && \
	npm create vite@latest && \
	npm install react-router-dom && \
	npm install -D tailwindcss@next @tailwindcss/vite@next