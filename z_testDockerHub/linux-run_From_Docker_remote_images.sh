echo "Stopping the postgreSQL Ubuntu service if running".
sudo service postgresql stop
echo "Stopping the nginx Ubuntu service if running".
sudo service nginx stop

echo "Suppressing the services if they exist already"
sudo docker service rm atl-front-end &> /dev/null
sudo docker service rm atl-back-end &> /dev/null
sudo docker service rm atl-postgres &> /dev/null
sleep 10

echo "Removing potential stack" 
sudo docker stack rm stack &> /dev/null

echo "Building atl-network if necessary"
sudo docker network create --driver overlay atl-network &> /dev/null

echo "Services creation"
sudo docker service create --publish 5432:5432 --network atl-network --hostname postgresql --secret POSTGRES_PASSWORD -e POSTGRES_PASSWORD_FILE=/run/secrets/POSTGRES_PASSWORD --secret POSTGRES_USER -e POSTGRES_USER_FILE=/run/secrets/POSTGRES_USER --secret POSTGRES_DB -e POSTGRES_DB_FILE=/run/secrets/POSTGRES_DB --name atl-postgres postgres:alpine

sudo docker service create --network atl-network --hostname backend --publish 8080:8080 --secret POSTGRES_PASSWORD -e POSTGRES_PASSWORD_FILE=/run/secrets/POSTGRES_PASSWORD --secret POSTGRES_USER -e POSTGRES_USER_FILE=/run/secrets/POSTGRES_USER --secret POSTGRES_DB -e POSTGRES_DB_FILE=/run/secrets/POSTGRES_DB --secret DB_JDBC_ROOT -e DB_JDBC_ROOT_FILE=/run/secrets/DB_JDBC_ROOT --name atl-back-end jlmacle/atl-back-end:v0.9

sudo docker service create --network atl-network --hostname frontend --publish 80:80 --name atl-front-end jlmacle/atl-front-end:v0.9

sleep 10 

chromium-browser http://127.0.0.1   &> /dev/null &

