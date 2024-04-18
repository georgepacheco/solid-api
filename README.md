# Solid API
API REST para interação com o Community Solid Server

# Passo a Passo - Instalação Docker
1. Clone projeto
2. Criar arquivo .env com as mesmas variáveis do arquivo .env.example
3. Build projeto - npm run build
4. Criar container docker - docker compose -f solid-node.yml up -d 
    obs: irá criar um container docker com uma instância do Community Solid Server 7 e copiar os arquivos do projeto da API para uma pasta (fot-solid) no container e executá-lo.


# Endpoints
GET /sensors - retorna todos os sensores armazenados no POD do usuário.
obs: necessário enviar no body um json com as seguintes características
{
    "userid": "",
    "local_webid": "",
    "webid": "",
    "idp": "",
    "name": "",
    "username": "",
    "podname": "",
    "password": "",
    "auth": ""
}

GET /sensor/:id/observations - retorna todas observações de um sensor específico armazenadas no Pod do usuário.
obs: além do :id (id do sensor) enviado nos parâmentros, também necessário enviar no body um json com as seguintes características
{
    "userid": "",
    "local_webid": "",
    "webid": "",
    "idp": "",
    "name": "",
    "username": "",
    "podname": "",
    "password": "",
    "auth": ""
}

GET /getAuthorization - realiza login no pod do usuário e retorna token de acesso.
no body deve ser enviado Json com dados de acesso do usuário.
{
    "userid": "16523",
    "local_webid": "http://localhost:3000/Home/profile/card#me",
    "webid": "http://localhost:3000/Home/profile/card#me",
    "idp": "http://localhost:3000/",
    "name": "home",
    "username": "home@test.com",
    "podname": "Home",
    "password": "1234",
    "auth": "true"
}


POST /save - insere dados no Pod do usuário
no body deve ser enviado Json com o formato abaixo.
{
	"user": {
			"userid": "16523",
			"local_webid": "http://localhost:3000/Home/profile/card#me",
			"webid": "http://localhost:3000/Home/profile/card#me",
			"idp": "http://localhost:3000/",
			"name": "home",
			"username": "home@test.com",
			"podname": "Home",
			"password": "1234",
			"auth": "true"
	},
	"data": 
	[
			{
					"code": "post",
					"method": "flow",
					"header": {
							"sensor": "environmentTemperatureSensor",
							"device": "sc18",
							"time": {
									"collect": 10000,
									"publish": 10000
							},
							"location": {
									"lat": -12.9999101198,
									"long": -38.5072755132
							}
					},
					"data": [
							"8",
							"8"
					],
					"datetime_pub": "2023-07-13 17:29:45"
			}, 

			{
					"code": "post",
					"method": "flow",
					"header": {
							"sensor": "environmentTemperatureSensor",
							"device": "sc18",
							"time": {
									"collect": 10000,
									"publish": 10000
							},
							"location": {
									"lat": -12.9999101198,
									"long": -38.5072755132
							}
					},
					"data": [
							"9",
							"9"
					],
					"datetime_pub": "2023-07-13 13:21:41"
			}
	]
}