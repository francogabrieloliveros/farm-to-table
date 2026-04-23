# Docker Development Guide

This guide explains how to use Docker and Docker Compose for the Farm-to-Table project. Using Docker ensures that every developer on the team has the exact same environment, regardless of their local machine setup.

## 1. Core Concepts

- **Docker Image**: A blueprint for your environment (OS, Node version, dependencies).
- **Docker Container**: A running instance of an image.
- **Docker Compose**: A tool for defining and running multi-container applications (Frontend + Backend).

## 2. Getting Started

### Initial Build
The first time you run the project, or when you change `package.json` dependencies, you need to build the images:
```bash
docker compose up --build
```

### Regular Startup
If dependencies haven't changed, you can just run:
```bash
docker compose up
```

### Running in Background
To run the containers without locking your terminal:
```bash
docker compose up -d
```

## 3. Common Commands

| Command | Description |
|---------|-------------|
| `docker compose ps` | List all running containers and their ports. |
| `docker compose logs -f` | Follow the logs of all running containers. |
| `docker compose logs -f backend` | Follow only the backend logs. |
| `docker compose down` | Stop and remove containers. |
| `docker compose restart` | Restart all containers. |

## 4. Managing Dependencies

If you install a new package locally (e.g., `npm install axios` in the frontend), Docker won't automatically know about it in its internal `node_modules` volume.

**To sync new dependencies:**
1. Stop the containers: `docker compose down`
2. Rebuild: `docker compose up --build`

## 5. Troubleshooting

### "Command Not Found"
If `docker-compose` fails, use `docker compose` (modern version).

### Containers are "Out of Sync"
Sometimes the volumes get messy. You can perform a clean start by removing volumes:
```bash
docker compose down -v
docker compose up --build
```

### Checking Container Health
If a service isn't responding, check if it's running:
```bash
docker compose ps
```

## 6. Accessing the Containers

Even though the code is running inside Docker, you can still "enter" the container to run commands (like a database seed script):
```bash
docker compose exec backend sh
```
(Once inside, you can run `ls`, `npm test`, etc.)

---
**Tip**: Always keep your `.env` files updated and out of Git. Check the `README.md` for the required environment variables.
