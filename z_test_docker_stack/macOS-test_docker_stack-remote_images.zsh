sudo docker system prune -f
#fixed an issue with database initialisation
echo "Stopping the postgreSQL Ubuntu service if running".
sudo -u postgres /Library/PostgreSQL/13/bin/pg_ctl --pgdata=/Library/PostgreSQL/13/data stop &> /dev/null

echo "Suppressing the services if they exist already"
sudo docker service rm atl-front-end &> /dev/null
sudo docker service rm atl-back-end &> /dev/null
sudo docker service rm atl-postgres  &> /dev/null
sleep 10
sudo docker stack rm stack &> /dev/null
sleep 10

echo "Building atl-network if necessary"
sudo docker network create --driver overlay atl-network &> /dev/null
sleep 15

sudo docker stack deploy -c ../z_docker_compose_files/docker-compose-stack.yml stack

chromium-browser http://127.0.0.1 &> /dev/null