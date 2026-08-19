Run the dev environment startup script at the project root:

```bash
./dev.sh
```

This starts MongoDB via Docker, waits for it to be healthy, then launches the NestJS backend (port 3001) and Next.js frontend (port 3000) with hot reload. Monitor the output and report when all services are running.
