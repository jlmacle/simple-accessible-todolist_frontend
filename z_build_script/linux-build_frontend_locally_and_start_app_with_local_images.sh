#--------------------------------------------------------------------------------------------------------------------
# Preparing the build of the Docker image
#--------------------------------------------------------------------------------------------------------------------
cd ..
echo "* Docker image build process."
echo "**** Starting ng build --prod ."
ng build --prod

echo "**** Website files moving in context folder."
cp -Rfu dist/AccessibleTodoList-FrontEnd/*.* z_build_script/context/html
cp -Rfu dist/AccessibleTodoList-FrontEnd/assets z_build_script/context/html

#-----------------------------------------------------------------------------------------------------------------------------
#  Building the new image
#-----------------------------------------------------------------------------------------------------------------------------
echo "**** Build of the Docker image."
cd z_build_script/context
sudo docker build -t atl-front-end:v0.9 .
cd ../..

#------------------------------------------------------------------------------------------------------------------------------
# Testing docker stack with the local images
#--------------------------------------------------------------------------------**** ----------------------------------------------
echo "* Testing docker stack with the new image."

echo "**** Docker system prune."
sudo docker system prune -f
#fixed an issue with database initialisation

echo "**** Stopping the postgreSQL Ubuntu service if running".
sudo service postgresql stop
echo "**** Stopping the nginx Ubuntu service if running."
sudo service nginx stop

echo "**** Suppressing the stack services if they exist already."
sudo docker service rm atl-front-end &> /dev/null
sudo docker service rm atl-back-end &> /dev/null
sudo docker service rm atl-postgres  &> /dev/null

echo "**** Building atl-network."
sudo docker network create --driver overlay atl-network &> /dev/null

echo "**** Docker stack deploy."
sudo docker stack deploy -c z_docker_compose_files/docker-compose-stack_local-images.yml stack
echo "Note: the front-end might take a little while to start."
sleep 200
chromium-browser http://127.0.0.1/index.html &> /dev/null &


