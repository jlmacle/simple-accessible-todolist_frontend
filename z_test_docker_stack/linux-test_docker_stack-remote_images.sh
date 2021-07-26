echo "* Docker system prune."
sudo docker system prune -f
#fixed an issue with database initialisation

echo "* Stopping the postgreSQL Ubuntu service if running."
sudo service postgresql stop
echo "* Stopping the nginx Ubuntu service if running."
sudo service nginx stop

echo "* Suppressing the stack services if they exist already."
sudo docker service rm atl-front-end &> /dev/null
sudo docker service rm atl-back-end &> /dev/null
sudo docker service rm atl-postgres  &> /dev/null

echo "* Building atl-network if necessary."
sudo docker network create --driver overlay atl-network &> /dev/null

echo "* Docker stack deploy."
sudo docker stack deploy -c ../z_docker_compose_files/docker-compose-stack.yml stack
sleep 120
echo "* Waiting for the stack to start."

echo "* Starting a browser to see the result."
chromium-browser http://127.0.0.1/index.html &> /dev/null