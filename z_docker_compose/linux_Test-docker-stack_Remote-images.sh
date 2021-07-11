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

echo "Building atl-network if necessary"
sudo docker network create --driver overlay atl-network &> /dev/null

sudo docker stack deploy -c docker-compose-stack.yml stack
sleep 20
chromium-browser http://127.0.0.1 &> /dev/null