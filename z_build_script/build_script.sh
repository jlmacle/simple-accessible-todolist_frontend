cd ..
ng build
mv -f dist/AccessibleTodoList-FrontEnd z_build_script/context/
echo "website files moved in context folder"
cd z_build_script/context/
sudo docker build -t front-end:docker-test .