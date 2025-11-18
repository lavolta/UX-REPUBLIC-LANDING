# Docker Setup Guide

This guide provides detailed instructions for running the UX-REPUBLIC-LANDING project in a Docker container.

## Prerequisites

- Docker installed on your system ([Install Docker](https://docs.docker.com/get-docker/))
- Docker Compose (included with Docker Desktop)

## Quick Start (Recommended)

The simplest way to run the application is using the pre-built approach:

```bash
# 1. Build the application
npm install
npm run build

# 2. Build Docker image
docker build -f Dockerfile.simple -t ux-republic-landing .

# 3. Run the container
docker run -d -p 8080:80 --name ux-republic-landing ux-republic-landing

# 4. Access the application
# Open http://localhost:8080 in your browser
```

## Using Docker Compose (Easiest)

```bash
# Build the app first (required for Dockerfile.simple)
npm install
npm run build

# Start the container
docker compose up -d

# View logs
docker compose logs -f

# Stop the container
docker compose down
```

## Multi-Stage Build (No Local Build Required)

If you prefer to build everything inside Docker:

```bash
# Build using the multi-stage Dockerfile
docker build -t ux-republic-landing .

# Run the container
docker run -d -p 8080:80 --name ux-republic-landing ux-republic-landing
```

**Note:** The multi-stage build may take longer as it installs all dependencies inside Docker.

## Docker Commands Reference

### Container Management

```bash
# Start a container
docker start ux-republic-landing

# Stop a container
docker stop ux-republic-landing

# Restart a container
docker restart ux-republic-landing

# Remove a container
docker rm ux-republic-landing

# View container logs
docker logs ux-republic-landing

# Follow logs in real-time
docker logs -f ux-republic-landing

# View running containers
docker ps

# View all containers (including stopped)
docker ps -a
```

### Image Management

```bash
# List Docker images
docker images

# Remove an image
docker rmi ux-republic-landing

# Build with no cache
docker build --no-cache -f Dockerfile.simple -t ux-republic-landing .
```

### Troubleshooting

```bash
# Check container status
docker inspect ux-republic-landing

# Execute commands inside the container
docker exec -it ux-republic-landing sh

# Check nginx configuration
docker exec ux-republic-landing nginx -t

# View nginx logs
docker exec ux-republic-landing cat /var/log/nginx/error.log
```

## Configuration

### Port Mapping

By default, the application runs on port 8080. To use a different port:

```bash
docker run -d -p 3000:80 --name ux-republic-landing ux-republic-landing
```

This maps port 3000 on your host to port 80 in the container.

### Environment Variables

You can pass environment variables to the container:

```bash
docker run -d -p 8080:80 -e "NODE_ENV=production" --name ux-republic-landing ux-republic-landing
```

### Custom Nginx Configuration

The `nginx.conf` file in the project root contains the Nginx configuration. Modify it to customize:

- Server settings
- Caching policies
- Security headers
- Compression settings
- SPA routing behavior

After modifying, rebuild the Docker image for changes to take effect.

## Health Check

The application includes a health check endpoint:

```bash
curl http://localhost:8080/health
```

Expected response: `healthy`

## Production Deployment

For production deployments, consider:

1. **Using HTTPS:** Place the container behind a reverse proxy (nginx, Traefik, etc.) with SSL/TLS
2. **Resource Limits:** Set memory and CPU limits
   ```bash
   docker run -d -p 8080:80 --memory="512m" --cpus="1" --name ux-republic-landing ux-republic-landing
   ```
3. **Restart Policy:** Use `--restart=unless-stopped` or configure in docker-compose.yml
4. **Logging:** Configure log rotation and external log aggregation
5. **Monitoring:** Set up health checks and monitoring

## Files Overview

- **Dockerfile** - Multi-stage build from source (Node.js + Nginx)
- **Dockerfile.simple** - Simple build using pre-built dist folder (recommended)
- **nginx.conf** - Custom Nginx configuration with SPA support
- **docker-compose.yml** - Docker Compose orchestration file
- **.dockerignore** - Files to exclude from Docker build context

## Support

For issues related to Docker deployment, please check:
1. Docker logs: `docker logs ux-republic-landing`
2. Nginx configuration: `docker exec ux-republic-landing nginx -t`
3. Container health: `docker inspect ux-republic-landing`

For application-specific issues, refer to the main README.md file.
