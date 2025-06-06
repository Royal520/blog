# Higress使用与介绍


# nacos 

- nacos 是一个注册中心，配置中心。

## 快速开始
``` sh
docker run \
  --name nacos-standalone-derby \
  -e MODE=standalone \
  -e NACOS_AUTH_TOKEN=+VdZL0VQqzrE6YySc6ZKUl2MiRncdkhdnZ4PSvPQ+jU= \
  -e NACOS_AUTH_IDENTITY_KEY=admin \
  -e NACOS_AUTH_IDENTITY_VALUE=admin \
  -p 8080:8080 \
  -p 8848:8848 \
  -p 9848:9848 \
  -p 9080:9080 \
  -d nacos/nacos-server:latest
```
## 版本差异较大
nacos3.0新增 mcp注册管理
3.0中没有下面的配置

nacos 3.0.1 适配mcp-registry协议更新，新增了 9080端口暴露mcp-server的注册信息
需要修改默认配置才会启用

``` properties
nacos.ai.mcp.registry.enabled=true
nacos.ai.mcp.registry.port=9080
```


# higress

 - 是一个微服务网关，由go语言编写，可以添加自定义插件
 - higress 2.1左右升级为ai网关，就是支持转发ai问答、mcp调用（通过两种方式实现）
    - 不需要nacos
    - 需要nacos

## higress不用nacos实现mcp管理、调用、增强
    [官方教程](https://higress.cn/ai/mcp-quick-start_docker/?spm=36971b57.57c2c373.0.0.6c147267Jlv1rj)

```
前提条件
确认本机安装有 Docker 且 docker 命令可用。
Terminal window
docker

确认本机可以访问外网。
部署 Higress
在开始使用 MCP Server 之前，需要先部署 Higress。我们这里使用的是 all-in-one 镜像的部署方式。

Terminal window
# 创建一个工作目录
mkdir higress; cd higress
# 拉取最新的 Higress all-in-one 镜像
docker pull higress-registry.cn-hangzhou.cr.aliyuncs.com/higress/all-in-one:latest
# 启动 Higress，配置文件会写到工作目录下
docker run -d --rm --name higress-ai -v ${PWD}:/data \
        -p 8001:8001 -p 8080:8080 -p 8443:8443 \
        higress-registry.cn-hangzhou.cr.aliyuncs.com/higress/all-in-one:latest

**重要：**后续操作过程中，请勿切换终端的工作目录。应使其保持在新创建的 higress 目录下。

您也可以参考 Higress 快速入门指南 完成这部分的部署工作。

部署 Redis
MCP Server 的 SSE 功能需要依赖 Redis 服务用于数据缓存。我们可以使用以下命令在后台启动一个 Redis 服务容器，并将其 6379 端口映射到本机。

Terminal window
docker run -d --rm --name higress-redis -p 6379:6379 higress-registry.cn-hangzhou.cr.aliyuncs.com/higress/redis-stack-server:7.4.0-v3

配置 MCP Server
ConfigMap 全局参数配置
在 ConfigMap 中配置 MCP Server 的相关全局参数。

Terminal window
vi ./configmaps/higress-config.yaml

配置 Redis 连接信息和 MCP Server 的路由规则：

apiVersion: v1
kind: ConfigMap
metadata:
  name: higress-config
  namespace: higress-system
  creationTimestamp: "2000-01-01T00:00:00Z"
  resourceVersion: "1"
data:
  higress: |-
    mcpServer:
      sse_path_suffix: /sse  # SSE 连接的路径后缀
      enable: true          # 启用 MCP Server
      redis:
        address: IP:6379 # Redis服务地址。这里需要使用本机的内网 IP，不可以使用 127.0.0.1
        username: "" # Redis用户名（可选）
        password: "" # Redis密码（可选）
        db: 0 # Redis数据库（可选）
      match_list:          # MCP Server 会话保持路由规则（当匹配下面路径时，将被识别为一个 MCP 会话，通过 SSE 等机制进行会话保持）
        - match_rule_domain: "*"
          match_rule_path: /user
          match_rule_type: "prefix"
      servers: []
    downstream:
    # 以下配置无需修改，此处省略

**注意：**受 Docker 运行环境的限制，非 Linux 操作系统在修改 yaml 文件之后，需要等待一段时间才能让新的配置生效。如果希望立即生效的话，可以使用以下命令重启 higress-ai 容器：

Terminal window
docker stop higress-ai
docker run -d --rm --name higress-ai -v ${PWD}:/data \
        -p 8001:8001 -p 8080:8080 -p 8443:8443 \
        higress-registry.cn-hangzhou.cr.aliyuncs.com/higress/all-in-one:latest

配置 REST API MCP Server
任何 REST API 都可以通过以下步骤快速转换为 MCP Server：

1. 打开 Higress 控制台
在浏览器中访问 http://localhost:8001。

首次访问将会要求配置登录账号信息。配置完成后，请使用配置好的账号登录。

1. 添加服务来源
在 Higress 控制台添加目标 REST API 的服务来源。本示例使用 randomuser.me 作为服务来源。

添加服务来源-信息

添加完成后，服务来源列表显示如下：

添加服务来源-列表

2. 配置路由
在 Higress 控制台添加路由并指向对应的服务来源：

配置路由-信息

添加完成后，路由列表显示如下：

配置路由-列表

3. 配置 MCP Server 插件
点击新创建的路由右侧的“策略”链接进入插件配置页面。
找到“MCP 服务器”插件，并点击其下方的配置按钮
将“开启状态”切换至绿色的开。
将下发配置部分切换到 YAML 视图，并填入以下配置。
点击右上角的保存。

server:
  name: "random-user-server"
  securitySchemes:
  - defaultCredential: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhZG1pbiIsImV4cCI6MTc0ODM2MjE5NCwic3ViIjoiMTIzNDU2Nzg5MCIsInVzZXJuYW1lIjoiZ2wifQ.Rnq7y_OM7lZ94tBUh2g-OwIkuVsb0S88E-eNR4Yi6B--zAaSW9eMZPMr-WXNCKxETtbr7yowQSyeHZSHX-YCxUgKfqt3JJfKmzIC1AVT3Lzz3qq0wqwlpYcVPaYcIqYBut4tGHaq0tJZAXlFI9mC_KHx7jdKD-puo32iv1gyJZZSg_f9N6RC0Jspa48qXxweMcufbjX5YLG4YkYoYPRD06EdDPdFvUDOf5cJSvW4KwT6opHIOh2VPQZvlL0xsHWkckAzVGF3-AxiONTOYu8-Mpg353rCLxEPl7yEh6q92LqFs7IGHFMT2xhweR1ETKYKLBAuFQYQ7ftkotDTDFZrpQ"
    id: "ClientSideBearer"
    scheme: "bearer"
    type: "http"
tools:
- description: "Get random user information"
  name: "get-user"
  requestTemplate:
    method: "GET"
    url: "https://fakerapi.it/api/v1/persons?_locale=en&_quantity=1"
  responseTemplate:
    body: |-
      # User Information
      {{- with (index .data 0) }}
      - **Name**: {{.firstname}} {{.lastname}}
      - **Email**: {{.email}}
      - **Location**: {{.address.city}}, {{.address.country}}
      - **Phone**: {{.phone}}
      {{- end }}
  security:
    id: "ClientSideBearer"
    passthrough: true
- description: "Get ip"
  name: "get-ip"
  requestTemplate:
    method: "GET"
    security:
      id: "ClientSideBearer"
    url: "http://172.17.0.1:8008/ipinfo"
  responseTemplate:
    body: "- **ip**: {{.ip}}"


配置MCP Server插件

MCP Server 使用
在 AI Agent 中配置 MCP Server 的 SSE Server，本文以 Cherry Studio 为例。

1. 添加 MCP 服务器
按照以下说明添加一个新的 MCP 服务器指向我们刚刚配置的路由：

名称：可以任意填写
类型：服务器发送事件（sse）
URL：http://localhost:8080/user/sse
配置MCP Server插件-1

配置MCP Server插件-2

2. 使用 MCP 服务
在 Cherry Studio 中，要在对话中使用 MCP 服务，我们需要先激活它。

切换到“助手”页面
点击右侧输入框下方的“MCP 服务器”按钮
在弹出的 MCP 服务器列表中点击我们刚刚添加的“GetRandomUser”服务，使其变绿且右侧出现“√”标识
激活MCP Server

现在我们就可以在对话中使用这个 MCP 服务服务了。

在输入框中输入“帮我生成一段用户信息”。就可以看到 Cherry Studio 利用大模型并通过 MCP Server 来为我们生成了一段随机的用户信息。

使用MCP Server

模板使用 GJSON Template 语法 (https://github.com/higress-group/gjson_template)，该语法结合了 Go 模板和 GJSON 路径语法进行 JSON 处理。模板引擎支持：

基本点表示法访问字段：{{.fieldName}}
用于复杂查询的 gjson 函数：{{gjson “users.#(active==true)#.name”}}
所有 Sprig 模板函数（类似 Helm）：{{add}}、{{upper}}、{{lower}}、{{date}} 等
控制结构：{{if}}、{{range}}、{{with}} 等
变量赋值：{{$var := .value}}
对于复杂的 JSON 响应，请考虑使用 GJSON 强大的过滤和查询能力来提取和格式化最相关的信息。


```
```
server:
  name: "random-user-server"
  securitySchemes:
  - id: "ClientSideBearer"
    scheme: "bearer"
    type: "http"
tools:
- description: "Get ip"
  name: "get-ip"
  requestTemplate:
    method: "GET"
    security:
      id: "ClientSideBearer"
    url: "http://172.17.0.1:8008/ipinfo"
  responseTemplate:
    body: "- **ip**: {{.ip}}"
  security:
    id: "ClientSideBearer"
    passthrough: true
```

```

consumers:
- issuer: "admin"
  jwks: |-
    {
      "keys": [
        {
          "kty": "RSA",
          "kid": "rsa-key-1",
          "use": "sig",
          "n": "0F6T0OlSBVw8BleLjqtqpNI25z0j-_YewR4tQl8p-Qif16A02uNBC7FI5uMSffL8w1QzA9zPOa1opie2QzuhZ34DdiLWG8iR76gxXQr7eTydqh1nlIpa7qMNz40YKGjX18c8jKM40AQlMlHNN5ORzenjTXPe3Zv0FrhoXEv4UGC5TBgJ6lvkbZWw_Ek79DT0huFJwX8zqk8lltEKcC083O-IvCJmw564VV_-6SzwePyvubLiVc4YCfiZSnjowveQeME3Orqde38ArPrNZBPR3sjSiqx19BcztwVDRaIBzSyBmEQDCct73CEPPMaZgda1UBmszlO_5pq9ilDd3hi9Dw",
          "e": "AQAB",
          "alg": "RS256"
        }
      ]
    }
  name: "ucp"
global_auth: false
```