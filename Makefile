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
	cd frontend && \
	npm create vite@latest && \