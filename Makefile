.PHONY: up down reload build clean

# Levantar entorno docker
up:
	docker-compose down --volumes --remove-orphans || true
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

clean:
	rm -rf frontend
	rm -rf frontend docker-compose.yml

# Construir entorno docker con Vite y TailwindCSS
build0:
	echo "📁 Creando carpeta frontend..."; \
	mkdir frontend && \
	echo ""; \
	echo "🐳 Ejecutando docker-compose build..."; \
	docker-compose build && \
	echo ""; \
	echo "📝 Generando docker-compose.yml..."; \
	echo "services:" > docker-compose.yml && \
	echo "  frontend:" >> docker-compose.yml && \
	echo "    build:" >> docker-compose.yml && \
	echo "      context: ./frontend" >> docker-compose.yml && \
	echo "    ports:" >> docker-compose.yml && \
	echo "      - \"8080:8080\"" >> docker-compose.yml && \
	echo "    volumes:" >> docker-compose.yml && \
	echo "      - ./frontend:/app" >> docker-compose.yml && \
	echo "      - /app/node_modules" >> docker-compose.yml && \
	echo "" >> docker-compose.yml && \
	echo "networks:" >> docker-compose.yml && \
	echo "  app-network:" >> docker-compose.yml && \
	echo "    driver: bridge" >> docker-compose.yml && \
	echo ""; \
	echo "✅ docker-compose.yml creado correctamente con puerto 8080."

# Configurar Vite
build1:
	cd frontend && \
	echo ""; \
	echo "⚙️  Ejecutando instalación de Vite..."; \
	npm create vite@latest


# https://tailwindcss.com/docs/installation/using-vite
build2:
	cd frontend && \
	npm install -D vite && \
	npm install tailwindcss @tailwindcss/vite && \
	echo ""; \
	echo "⚙️  Generando vite.config.ts..."; \
	echo "import { defineConfig } from 'vite'" > vite.config.ts && \
	echo "import tailwindcss from '@tailwindcss/vite'" >> vite.config.ts && \
	echo "export default defineConfig({" >> vite.config.ts && \
	echo "  plugins: [" >> vite.config.ts && \
	echo "    tailwindcss()," >> vite.config.ts && \
	echo "  ]," >> vite.config.ts && \
	echo "})" >> vite.config.ts && \
	echo ""; \
	echo "🎨 Generando index.css con directivas de Tailwind..."; \
	echo "@tailwind base;" > src/index.css && \
	echo "@tailwind components;" >> src/index.css && \
	echo "@tailwind utilities;" >> src/index.css && \
	echo "@import \"tailwindcss\";" >> src/index.css && \
	echo ""; \
	echo "🐳 Generando Dockerfile..."; \
	echo "# Etapa de desarrollo" > dockerfile && \
	echo "FROM node:20" >> dockerfile && \
	echo "" >> dockerfile && \
	echo "# Crear directorio de trabajo" >> dockerfile && \
	echo "WORKDIR /app" >> dockerfile && \
	echo "" >> dockerfile && \
	echo "# Copiar dependencias" >> dockerfile && \
	echo "COPY package*.json ./" >> dockerfile && \
	echo "" >> dockerfile && \
	echo "# Instalar dependencias" >> dockerfile && \
	echo "RUN npm install" >> dockerfile && \
	echo "" >> dockerfile && \
	echo "# Copiar el resto del código fuente" >> dockerfile && \
	echo "COPY . ." >> dockerfile && \
	echo "" >> dockerfile && \
	echo "# Exponer el puerto de desarrollo" >> dockerfile && \
	echo "EXPOSE 8080" >> dockerfile && \
	echo "" >> dockerfile && \
	echo "# Comando para modo dev" >> dockerfile && \
	echo 'CMD ["npm", "run", "dev", "--", "--host", "--port", "8080"]' >> dockerfile

build3:
	cd frontend && \
	echo "🚏 Instalando dependencias para SPA..." && \
	npm install react-router-dom @types/react-router-dom && \
	echo "✅ Dependencias SPA instaladas."
