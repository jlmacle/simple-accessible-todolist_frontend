

::-------------------------------------------------------------------------------------------------------------------
:: Checking potential npm issues
::-------------------------------------------------------------------------------------------------------------------
echo "An opportunity to check potential npm issues."
echo "**** npm doctor: skipped to avoid breaking changes with ng."
:: start npm doctor
:: timeout /T 60

::-------------------------------------------------------------------------------------------------------------------
:: Checking the potential npm security issues
::-------------------------------------------------------------------------------------------------------------------
start npm audit
timeout /T 60

start npm audit fix
timeout /T 60

::-------------------------------------------------------------------------------------------------------------------
:: Checking the code quality with SonarQube
::-------------------------------------------------------------------------------------------------------------------
echo "Starting the SonarQube server."
start "SonarQube" StartSonar.bat &
echo "Waiting for the SonarQube server to start."
timeout /T 60

echo "Starting the analysis."
cd ..
start sonar-scanner.bat -D"sonar.projectKey=Accessible-Todo-List_Front-end" -D"sonar.sources=." -D"sonar.host.url=http://127.0.0.1:9000" -D"sonar.login=7996651e4d30e4839ede619aaf76a994d11380ef"
  
  
echo  "Waiting for the analysis to be done."
timeout /T 60

echo "Starting a browser to check the result of the analysis."
start msedge http://localhost:9000

::--------------------------------------------------------------------------------------------------------------------
:: Preparing and building the build of the Docker image
::--------------------------------------------------------------------------------------------------------------------
:: Starting Docker Desktop
echo "Starting Docker Desktop."
start cmd /c "C:\Program Files\Docker\Docker\Docker Desktop.exe"

echo "Starting ng build."
start ng build --configuration production
timeout /T 30

echo "Website files moving in context folder."
xcopy  .\dist\AccessibleTodoList-FrontEnd\ .\z_build_script\context\html\ /s /e /y

echo "Docker system prune."
docker system prune -f 
timeout /T 20 

docker build -f z_build_script\context\Dockerfile -t atl-front-end:v0.9 .

cd z_build_script
