# code to run with sudo priviledges 
echo "Starting sudo docker system prune."
sudo docker system prune -f
sleep 10
echo "Building the new image."
cd context
sudo docker build -t atl-front-end:v0.9 .
exit

