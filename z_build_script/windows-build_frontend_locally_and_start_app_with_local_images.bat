::--------------------------------------------------------------------------------------------------------------------
:: Starting Docker Desktop
::-------------------------------------------------------------------------------------------------------------
cmd /c "C:\Program Files\Docker\Docker\Docker Desktop.exe"

::--------------------------------------------------------------------------------------------------------------------
:: Preparing the build of the Docker image
::--------------------------------------------------------------------------------------------------------------------
cd ..
echo "ng build"
start ng build --prod &

echo "Waiting for the ng build to be finished."
timeout /T 60

echo "Website files moving in context folder"
xcopy  .\dist\AccessibleTodoList-FrontEnd\ .\z_build_script\context\html\ /s /e /y

::-----------------------------------------------------------------------------------------------------------------------------
::  Building the new image
::-----------------------------------------------------------------------------------------------------------------------------

cd .\z_build_script\context\
docker build -t atl-front-end:v0.9 .

::------------------------------------------------------------------------------------------------------------------------------
:: Testing docker stack with the new image updated on DockerHub
::------------------------------------------------------------------------------------------------------------------------------
echo "Testing docker stack with the new image."

docker system prune -f
::fixed an issue with database initialisation

::echo "Stopping the postgreSQL Ubuntu service if running".
::No Postgresql service on current installation

echo "Suppressing the services if they exist already"
docker service rm atl-front-end 2> NUL
docker service rm atl-back-end 2> NUL
docker service rm atl-postgres  2> NUL
::https://docs.microsoft.com/en-us/previous-versions/windows/it-pro/windows-xp/bb490982(v=technet.10)

echo "Building atl-network"
docker network create --driver overlay atl-network 2> NUL

docker stack deploy -c ../../z_docker_compose/docker-compose-stack_local-images.yml stack
echo "Note: the front-end might take a little while to start."
timeout /T 200
start msedge http://127.0.0.1 
cd ..


