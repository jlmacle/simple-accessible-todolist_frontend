echo "* docker login."
sudo docker login
echo "* docker tag."
sudo docker tag atl-front-end:v0.9  jlmacle/atl-front-end:v0.9
echo "* docker push."
sudo docker push jlmacle/atl-front-end:v0.9
