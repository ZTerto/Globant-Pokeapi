.PHONY: up down reload

up:
	docker-compose up --build

down:
	docker-compose down

reload: down up
