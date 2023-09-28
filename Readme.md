# Alice storybook
``welcome to my project ,this is a blog simalar,a minimal blog site``
### here are some steps of how to start project:
1.first:make your own ssl certification,i suggest you to use [mkcert](https://github.com/FiloSottile/mkcert)
### develop:
####   os: linux
```shell
#prerequires:git,node(>18),golang(>1.19),mysql,install these tools steps your can find in their own document
#1.exec shell
git clone https://github.com/qingyggg/storybook.git
cd storybook/cmd
#move you ssl certification into projectPath/server/ca directory,cert file name is localhost.pem,key file name is localhost-key.pem
sh develop_linux.sh
```

### deploy:
[docker desktop download page](https://www.docker.com/products/docker-desktop/)
```shell
#prerequires:docker
git clone https://github.com/qingyggg/storybook.git
cd storybook/cmd
#move you ssl certification into projectPath/server/ca directory,cert file name is localhost.pem,key file name is localhost-key.pem
sh deploy_linux.sh
```

#### if you have done the following commands,then open your browser and type [http:localhost:3000](http:localhost:3000)