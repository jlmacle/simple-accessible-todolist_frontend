#-------------------------------------------------------------------------------------------------------------------
# Checking potential npm issues
#-------------------------------------------------------------------------------------------------------------------
echo "An opportunity to check potential npm issues."
npm doctor
#-------------------------------------------------------------------------------------------------------------------
# Checking the potential npm security issues
#-------------------------------------------------------------------------------------------------------------------
npm audit
npm audit fix

#-------------------------------------------------------------------------------------------------------------------
# Checking the code quality with SonarQube
#-------------------------------------------------------------------------------------------------------------------
echo "Starting the SonarQube server."
osascript -e 'tell application "Terminal" to do script "sonar.sh start; sleep 90"'

echo "Waiting for the SonarQube server to start."
sleep 90

echo "Starting the analysis."

  
osascript -e 'tell application "Terminal"  to do script "cd /Users/jean-louis/Desktop/AccessibleTodoList_FrontEnd;sonar-scanner -Dsonar.projectKey=Accessible-Todo-List_Front-end -Dsonar.sources=. -Dsonar.host.url=http://127.0.0.1:9000 -Dsonar.login=4bf5f3c63a973d0ce6ba9ace744121a8be8172d3; sleep 100"'

  
echo "Waiting for the analysis to be done."
sleep 40 

echo "Starting a browser to check the result of the analysis."
open -a Safari http://localhost:9000 &
sleep 100

#--------------------------------------------------------------------------------------------------------------------
# Preparing the build of the Docker image
#--------------------------------------------------------------------------------------------------------------------
echo "Starting Docker Destop."
/Applications/Docker.app/Contents/MacOS/Docker &

cd ..
echo "Starting the ng build."
ng build --configuration production

echo "Website files moving in context folder."
cp -Rf dist/AccessibleTodoList-FrontEnd/*.* z_build_script/context/html
cp -Rf dist/AccessibleTodoList-FrontEnd/assets z_build_script/context/html

cd z_build_script
su -m admin -c ./macOS_Check_Build_script-sudo_code.zsh


