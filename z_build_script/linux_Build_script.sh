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
chromium-browser http://localhost:9000
sleep 300

#--------------------------------------------------------------------------------------------------------------------
# Building the Docker image
#--------------------------------------------------------------------------------------------------------------------
echo "Removing potential conflicting services"
sudo docker service rm atl-front-end &> /dev/null
sudo docker stack rm stack
sleep 10

cd ..
echo "ng build"
ng build

echo "Website files moving in context folder"
cd dist/AccessibleTodoList-FrontEnd
cd ../..
cp -Rfu dist/AccessibleTodoList-FrontEnd/*.* z_build_script/context/html
cp -Rfu dist/AccessibleTodoList-FrontEnd/assets z_build_script/context/html

cd z_build_script/context/
echo "docker build"
sudo docker build -t front-end:v0.9 .

echo "Building atl-network if necessary"
sudo docker network create --driver overlay atl-network &> /dev/null

echo "Removing potential nginx service running" 
sudo service nginx stop

echo "Building the front-end service"
sudo docker service create --network atl-network --hostname frontend --publish published=80,target=80 --name atl-front-end front-end:v0.9

#-----------------------------------------------------------------------------------------------------------------------------
#  Pushing the code to Git
#-----------------------------------------------------------------------------------------------------------------------------
echo "git add ."
git add .
echo "git commit: enter a commit message"
read commit
git commit -m "$commit"
echo "You entered $commit"
echo "Waiting before pushing the code."
sleep 40 
echo "git push"
git push