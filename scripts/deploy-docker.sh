#!/usr/bin/env bash
set -euo pipefail

IMAGE_NAME=${IMAGE_NAME:-pptist}
CONTAINER_NAME=${CONTAINER_NAME:-pptist}
PORT=${PORT:-5000}
ENV_FILE=${ENV_FILE:-.env}

if ! command -v docker &> /dev/null; then
  echo "Error: docker command not found. Install Docker to use this script." >&2
  exit 1
fi

echo "Building Docker image '${IMAGE_NAME}'..."
docker build -t "${IMAGE_NAME}" .

if docker ps -a --format '{{.Names}}' | grep -Eq "^${CONTAINER_NAME}$"; then
  echo "Removing existing container '${CONTAINER_NAME}'..."
  docker rm -f "${CONTAINER_NAME}" >/dev/null 2>&1 || true
fi

RUN_ARGS=("--name" "${CONTAINER_NAME}" "-p" "${PORT}:5000")

if [[ -f "${ENV_FILE}" ]]; then
  RUN_ARGS+=("--env-file" "${ENV_FILE}")
else
  echo "Warning: '${ENV_FILE}' not found. Container will start without an env file." >&2
fi

echo "Starting container '${CONTAINER_NAME}' on port ${PORT}..."
docker run -d "${RUN_ARGS[@]}" "${IMAGE_NAME}"

echo "Deployment complete. Visit http://localhost:${PORT}"
