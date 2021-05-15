#-------------------------------------------------------------------------------------------------------------------
# Checking potential npm issues
#-------------------------------------------------------------------------------------------------------------------
echo "An opportunity to check potential npm issues"
npm doctor
#-------------------------------------------------------------------------------------------------------------------
# Checking the potential npm security issues
#-------------------------------------------------------------------------------------------------------------------
npm audit
npm audit fix

#-------------------------------------------------------------------------------------------------------------------
# Checking the code quality with SonarQube
#-------------------------------------------------------------------------------------------------------------------
echo "Starting the SonarQube server"
gnome-terminal -- bash -c 'sonar.sh start; sleep 90'
echo "Waiting for the SonarQube server to start"
sleep 90

echo "Starting the analysis"
gnome-terminal -- bash -c 'cd .. ; sonar-scanner \
  -Dsonar.projectKey=front-end \
  -Dsonar.sources=. \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=6fb38c8274cb8efccba8778aef56d226e7550659; sleep 100'
  
echo "Waiting for the analysis to be done."
sleep 40 

echo "Starting a browser to check the result of the analysis."
chromium-browser http://localhost:9000 &
sleep 100

#--------------------------------------------------------------------------------------------------------------------
# Preparing the build of the Docker image
#--------------------------------------------------------------------------------------------------------------------
cd ..
echo "ng build"
ng build

echo "Website files moving in context folder"
cd dist/AccessibleTodoList-FrontEnd
cd ../..
cp -Rfu dist/AccessibleTodoList-FrontEnd/*.* z_build_script/context/html
cp -Rfu dist/AccessibleTodoList-FrontEnd/assets z_build_script/context/html

#-----------------------------------------------------------------------------------------------------------------------------
#  Pushing the code to Git
#-----------------------------------------------------------------------------------------------------------------------------

echo "git add ."
git add .
echo "git commit: enter a commit message"
read commit
git commit -m "$commit"
echo "You entered $commit"
echo "git push"
git push
sleep 300
#------------------------------------------------------------------------------------------------------------------------------
# Testing docker stack with the new image updated on DockerHub
#------------------------------------------------------------------------------------------------------------------------------
echo "Testing docker stack with the new image."

sudo docker system prune
#fixed an issue with database initialisation

echo "Stopping the postgreSQL Ubuntu service if running".
sudo service postgresql stop
echo "Stopping the nginx Ubuntu service if running".
sudo service nginx stop

echo "Suppressing the services if they exist already"
sudo docker service rm atl-front-end &> /dev/null
sudo docker service rm atl-back-end &> /dev/null
sudo docker service rm atl-postgres  &> /dev/null

echo "Building atl-network"
sudo docker network create --driver overlay atl-network &> /dev/null

sudo docker stack deploy -c z_docker_compose/docker-compose-stack.yml stack
echo "Note: the front-end might take a little while to start."
sleep 200
chromium-browser http://127.0.0.1 &> /dev/null &


