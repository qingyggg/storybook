FROM golang:1.19 as builder

# 配置模块代理
ENV GO111MODULE=on
ENV GOPROXY=https://goproxy.cn,direct

#工作目录
WORKDIR /app
ADD .  /app

#在Docker工作目录下执行命令
RUN go build -o main

FROM ubuntu:22.04 as runner

#作者信息
MAINTAINER "alice"

ENV FOO_ENV=production

WORKDIR /app

RUN mkdir envs

COPY --from=builder /app/envs/ ./envs
COPY --from=builder /app/main ./

#暴露端口
EXPOSE 8080

#执行项目的命令
CMD ["/app/main"]



