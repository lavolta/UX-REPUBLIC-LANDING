# ux-republic-landing-page

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Docker Deployment

This project includes Docker support for easy deployment and containerization.

### Method 1: Simple Docker Build (Recommended)

This method requires building the app first, then creating a Docker image with the pre-built files.

```sh
# Step 1: Build the application locally
npm install
npm run build

# Step 2: Build the Docker image
docker build -f Dockerfile.simple -t ux-republic-landing .

# Step 3: Run the container
docker run -d -p 8080:80 --name ux-republic-landing ux-republic-landing
```

The application will be available at `http://localhost:8080`

### Method 2: Multi-Stage Docker Build

This method builds everything inside Docker (no local build needed, but takes longer).

```sh
# Build the Docker image (includes npm install and build)
docker build -t ux-republic-landing .

# Run the container
docker run -d -p 8080:80 --name ux-republic-landing ux-republic-landing
```

### Using Docker Compose (Works with either Dockerfile)

```sh
# For simple build (default):
docker-compose up -d

# For multi-stage build:
# Edit docker-compose.yml to use "Dockerfile" instead of "Dockerfile.simple"
docker-compose up -d

# Stop the container
docker-compose down

# View logs
docker-compose logs -f
```

### Docker Configuration Files

- **Dockerfile.simple**: Quick build using pre-built dist folder (recommended)
- **Dockerfile**: Full multi-stage build from source (Node.js build + Nginx serve)
- **nginx.conf**: Custom Nginx configuration with:
  - Vue Router history mode support (SPA routing)
  - Gzip compression for faster loading
  - Security headers
  - Static asset caching with proper cache control
  - Health check endpoint at `/health`
- **docker-compose.yml**: Simple orchestration configuration

### Testing the Deployment

```sh
# Check if the container is running
docker ps

# Test the health endpoint
curl http://localhost:8080/health

# View container logs
docker logs ux-republic-landing
```
