# Replacing the localhost version of the back-end server with the version with loopback address in variables.ts
# https://javafullstackcode.wpcomstaging.com/2021/04/28/docker-image-creation-back-end/
echo "Removing the potential front-end service"
sudo docker service rm atl-front-end &> /dev/null

echo "Front-end server configuration from localhost to backend."
cp -f util/variables_loopback_address.ts ../src/environments/variables.ts

cd ..
echo "ng build"
ng build

echo "Website files moving in context folder"
cd dist/AccessibleTodoList-FrontEnd
cd ../..
mv -f dist/AccessibleTodoList-FrontEnd/*.* z_build_script/context/html
mv -f dist/AccessibleTodoList-FrontEnd/assets z_build_script/context/html

cd z_build_script/context/
echo "docker build"
sudo docker build -t front-end:v0.9 .

# Replacing the hostname version of the back-end server with the version with localhost in variables.ts
cd ..
echo "Front-end server configuration modified from localhost to backend."
cp -f util/variables.ts ../src/environments/variables.ts

echo "Building the front-end service"
sudo docker service create --network atl-network --hostname frontend --publish 4200:80 --name atl-front-end front-end:v0.9 

#