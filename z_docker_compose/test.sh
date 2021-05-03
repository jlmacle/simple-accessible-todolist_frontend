sudo docker service rm atl-postgres &> /dev/null
sudo docker service rm atl-back-end &> /dev/null
sudo docker service rm atl-front-end &> /dev/null
sudo docker-compose up