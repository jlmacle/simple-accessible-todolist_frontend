@echo off
::cls

echo ** Starting Docker Desktop. **
cmd /c "C:\Program Files\Docker\Docker\Docker Desktop.exe"
:: https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/cmd

echo --------------------------------------------------------------------------------------------------------------------------------------------
echo ** Docker build process. **
::--------------------------------------------------------------------------------------------------------------------
:: Preparing the build of the Docker image
::--------------------------------------------------------------------------------------------------------------------
echo **** Removing the files from the previous build (minus the pictures).
del /q .\context\html\

cd ..
echo **** ng build.
cmd /c "ng build --configuration production &"

echo **** Website files moving in context folder.
xcopy  .\dist\AccessibleTodoList-FrontEnd\ .\z_build_script\context\html\ /s /e /y

::-----------------------------------------------------------------------------------------------------------------------------
::  Building the new image
::-----------------------------------------------------------------------------------------------------------------------------
echo ***** Building the Docker image.
cd .\z_build_script\context\
docker build -t atl-front-end:v0.9 .

echo --------------------------------------------------------------------------------------------------------------------------------------------
::------------------------------------------------------------------------------------------------------------------------------
:: Testing docker stack with the new image updated on DockerHub
::------------------------------------------------------------------------------------------------------------------------------
echo ** Testing Docker stack with the new image. **

docker system prune -f
::fixed an issue with database initialisation

::echo "Stopping the postgreSQL Ubuntu service if running."
::No Postgresql service on current installation

echo ** Suppressing the services if they exist already."
docker service rm atl-front-end 2> NUL
docker service rm atl-back-end 2> NUL
docker service rm atl-postgres  2> NUL
::https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-xp/bb490982(v=technet.10)

echo "Building atl-network."
docker network create --driver overlay atl-network 2> NUL

docker stack deploy -c ../../z_docker_compose_files/docker-compose-stack_local-images.yml stack
echo "Note: the front-end might take a little while to start."
cd ..
timeout /T 200
start msedge http://127.0.0.1 



:: Troubleshouting
:: docker container exec   <container_id>  ls -lah usr/share/nginx/html
:: docker container exec   77321f45353a   ls -lah usr/share/nginx/html
