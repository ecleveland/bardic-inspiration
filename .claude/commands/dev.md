Run the dev environment startup script at the project root:

```bash
./dev.sh
```

This starts MongoDB via Docker, waits for it to be healthy, then launches the NestJS backend (port 3001 by default) and Next.js frontend (port 3000 by default) with hot reload. Monitor the output and report when all services are running.

If the user says these ports are already taken (another instance of this stack, or another project with the same layout), rerun with overrides instead of killing the other stack:

```bash
MONGO_PORT=27018 BACKEND_PORT=3011 FRONTEND_PORT=3010 ./dev.sh
```

Report back whichever ports actually got used, not the defaults.
