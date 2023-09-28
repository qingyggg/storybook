
if command -v docker;then
  cd .. && docker compose up -d
else
  echo "docker havent been installed,please install docker at first"
fi