

::-------------------------------------------------------------------------------------------------------------------
:: Checking potential npm issues
::-------------------------------------------------------------------------------------------------------------------
echo "** An opportunity to check potential npm issues. **"
echo "**** npm doctor: skipped to avoid breaking changes with ng."
:: start npm doctor
:: timeout /T 60

::-------------------------------------------------------------------------------------------------------------------
:: Checking the potential npm security issues
::-------------------------------------------------------------------------------------------------------------------
echo "**** npm audit"
start npm audit
timeout /T 60

echo "**** npm audit fix"
start npm audit fix
timeout /T 60

echo --------------------------------------------------------------------------------------------------------------------------------------------
::-------------------------------------------------------------------------------------------------------------------
:: Checking the code quality with SonarQube
::-------------------------------------------------------------------------------------------------------------------
echo "** SonarQube analysis process. **"
echo "**** Starting the SonarQube server."
start "SonarQube" StartSonar.bat &
echo "Waiting for the SonarQube server to start."
timeout /T 60

echo "**** Starting the analysis."
cd ..
start sonar-scanner.bat -D"sonar.projectKey=Accessible-Todo-List_Front-end" ^
-D"sonar.sources=." -D"sonar.host.url=http://127.0.0.1:9000" -D"sonar.login=7996651e4d30e4839ede619aaf76a994d11380ef"
  
  
echo  "**** Waiting for the analysis to be done."
timeout /T 60

echo "**** Starting a browser to check the result of the analysis."
start msedge http://localhost:9000

echo --------------------------------------------------------------------------------------------------------------------------------------------
::--------------------------------------------------------------------------------------------------------------------
:: Docker image build and test
::--------------------------------------------------------------------------------------------------------------------
echo "** Starting the script building the image and testing the application with local inages.**"
./windows-no_code_quality_test_version-build_frontend_locally_and_start_app_with_local_images.bat
