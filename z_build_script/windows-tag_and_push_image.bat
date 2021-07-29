@echo off
cls
echo ** Starting Docker Desktop. **
cmd /c "C:\Program Files\Docker\Docker\Docker Desktop.exe"
echo -------------------------------------------------------------------------------------------------------------------------------------------
echo ** Docker login. **
docker login
echo -------------------------------------------------------------------------------------------------------------------------------------------
echo ** Docker tag. **
docker tag atl-front-end:v0.9  jlmacle/atl-front-end:v0.9
echo -------------------------------------------------------------------------------------------------------------------------------------------
echo  ** Docker push. **
docker push jlmacle/atl-front-end:v0.9
