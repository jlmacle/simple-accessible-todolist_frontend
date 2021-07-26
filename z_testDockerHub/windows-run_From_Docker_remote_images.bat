cls 
@echo off

echo ** Starting Docker Desktop. **
cmd /c "C:\Program Files\Docker\Docker\Docker Desktop.exe"

echo --------------------------------------------------------------------------------------------------------------------------------------------
echo ** You need to stop the PostgreSQL Windows service, if running, to free the use of port 5432. **
:: About escaping special characters
:: https://docs.microsoft.com/fr-fr/windows-server/administration/windows-commands/echo
echo You can find the name of the PostgreSQL service by running, in CMD,  sc query ^| findstr postgresql
echo You can stop the the PostgreSQL service from a PowerShell console with administrative rights 
echo with the command: sc stop ^<postgresql service name^> 
echo **** Giving time to stop the potential PostgreSQL service. 
timeout /T 300

echo --------------------------------------------------------------------------------------------------------------------------------------------
echo ** Suppressing the atl-postgres, atl-back-end and atl-front-end services potentially existing to start fresh. **
docker service rm atl-front-end 2> NUL
docker service rm atl-back-end 2> NUL
docker service rm atl-postgres 2> NUL
timeout /T 120

echo --------------------------------------------------------------------------------------------------------------------------------------------
echo ** Removing a potential Docker stack. **
docker stack rm stack 2> NUL
echo **** Waiting for the potential stack to be removed.
timeout /T 60

echo --------------------------------------------------------------------------------------------------------------------------------------------
echo ** Building atl-network if necessary. **
docker network create --driver overlay atl-network 2> NUL

echo --------------------------------------------------------------------------------------------------------------------------------------------
echo ** Services creation using the images on DockerHub. **
:: https://docs.docker.com/engine/reference/commandline/service_create/#publish-service-ports-externally-to-the-swarm--p---publish
:: About the --publish long format
:: "The target port within the container and the port to map it to on the nodes, using the routing mesh (ingress) or host-level networking."
:: "There is also a long format, which is easier to read and allows you to specify more options. The long format is preferred. 
:: You cannot specify the service’s mode when using the short format."
docker service create --publish published=5432,target=5432 --network atl-network --hostname postgresql ^
--secret POSTGRES_PASSWORD -e POSTGRES_PASSWORD_FILE=/run/secrets/POSTGRES_PASSWORD ^
--secret POSTGRES_USER -e POSTGRES_USER_FILE=/run/secrets/POSTGRES_USER ^
--secret POSTGRES_DB -e POSTGRES_DB_FILE=/run/secrets/POSTGRES_DB ^
--name atl-postgres postgres:alpine
echo ****  Waiting for the atl-postgres service to start
timeout /T 120

docker service create --network atl-network --hostname backend --publish published=8080,target=8080 ^
--secret POSTGRES_PASSWORD -e POSTGRES_PASSWORD_FILE=/run/secrets/POSTGRES_PASSWORD ^
--secret POSTGRES_USER -e POSTGRES_USER_FILE=/run/secrets/POSTGRES_USER ^
--secret POSTGRES_DB -e POSTGRES_DB_FILE=/run/secrets/POSTGRES_DB ^
--secret DB_JDBC_ROOT -e DB_JDBC_ROOT_FILE=/run/secrets/DB_JDBC_ROOT ^
--name atl-back-end docker.io/jlmacle/atl-back-end:v0.9
echo ****  Waiting for the atl-back-end service to start
timeout /T 120

docker service create --network atl-network --hostname frontend --publish published=80,target=80 ^
--name atl-front-end docker.io/jlmacle/atl-front-end:v0.9

echo --------------------------------------------------------------------------------------------------------------------------------------------
echo ****  Waiting for the atl-front-end service to start
timeout /T 120 
start msedge http://127.0.0.1   2> NUL &

