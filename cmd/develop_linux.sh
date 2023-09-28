
projectPath=$(pwd)/../

#start frontend
cd $projectPath/client
if command -v pnpm;then
  npm i
else
  pnpm install
fi
npm dev

#start backend
cd $projectPath/server || ./bin/air


