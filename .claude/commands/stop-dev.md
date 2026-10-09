Stop the backend and frontend dev servers.

Kill any processes listening on the ports `dev.sh` used to start them. Default to 3000 (frontend) and 3001 (backend); if `./dev.sh` was last run with `BACKEND_PORT`/`FRONTEND_PORT` overrides, use those instead — ask the user if it's not clear which ports are in play. MongoDB container is left running.
