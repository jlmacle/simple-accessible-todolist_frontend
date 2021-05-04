#sudo docker prune system
#fixed an issue with database initialisation
echo "Stopping the postgreSQL Ubuntu service if running".
sudo service postgresql stop
echo "Suppressing the services if they exist already"
sudo docker service rm atl-front-end &> /dev/null
sudo docker service rm atl-back-end &> /dev/null
sudo docker service rm atl-postgres  &> /dev/null
sleep 10
sudo docker-compose up