##cmd.exe /c "taskkill /FI "WINDOWTITLE eq angular*" && cd ../../../../../../../../AccessibleTodoList_FrontEnd && title "angular_server" && ng serve -o  & "

  
cmd.exe /c title "test" && taskkill /FI "WINDOWTITLE eq angular*" && start "angular_server" ng serve -o
