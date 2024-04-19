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

POST /sender - envia os dados selecionados pelo usuário para um Pod na cloud determinado por ele
no body deve ser enviado Json com o formato abaixo.

{
	"user": {
    "userid": "16523",
    "local_webid": "http://localhost:3000/Alex/profile/card#me",
    "webid": "http://localhost:3000/Alex/profile/card#me",
    "idp": "http://localhost:3000/",
    "name": "Alex",
    "username": "alex@test.com",
    "podname": "Alex",
    "password": "1234",
    "auth": "true"
	},
	"data" :
	[
			{
				"sensor": "sc18",
				"lat": "-1.29999101198E1",
				"long": "-3.85072755132E1",
				"sensorType": "http://purl.org/iot/vocab/m3-lite#AirThermometer",
				"unitType": "http://www.ontology-of-units-of-measure.org/resource/om-2/degreeCelsius",
				"quantityKind": "http://www.ontology-of-units-of-measure.org/resource/om-2/Temperature",
		"parentClass": "https://www.w3.org/ns/ssn/SensingDevice",
				"observation": 
				[
					{
						"observationId": "2e3c98ba-865c-4cd7-bd09-541c62e2937e",
						"resultValue": "8",
						"resultTime": "2023-07-13 17:29:45"
					},
					{
						"observationId": "79ac39fc-0ed4-4b84-baf5-b370c0453f79",
						"resultValue": "29",
						"resultTime": "2023-07-13 17:29:45"
					},
					{
						"observationId": "7dcce67c-f572-4339-ba22-3251314a41e9",
						"resultValue": "9",
						"resultTime": "2023-07-13 13:21:41"
					},
					{
						"observationId": "adf46978-3b8a-4c03-9f2d-f22402b01380",
						"resultValue": "8",
						"resultTime": "2023-07-13 17:29:45"
					},
					{
						"observationId": "255130d5-a675-4795-97cd-ce5d3509ad57",
						"resultValue": "9",
						"resultTime": "2023-07-13 13:21:41"
					},
					{
						"observationId": "d565bb6a-863f-47bd-a9b4-fad9373677aa",
						"resultValue": "8",
						"resultTime": "2023-07-13 17:29:45"
					}
				]
			},
			{
				"sensor": "sc19",
				"lat": "-1.29999101198E1",
				"long": "-3.85072755132E1",
				"sensorType": "http://purl.org/iot/vocab/m3-lite#AirThermometer",
				"unitType": "http://www.ontology-of-units-of-measure.org/resource/om-2/degreeCelsius",
				"quantityKind": "http://www.ontology-of-units-of-measure.org/resource/om-2/Temperature",
		"parentClass": "https://www.w3.org/ns/ssn/SensingDevice",
				"observation": 
				[
					{
						"observationId": "ba860d5a-fa5d-4e18-841c-4fdd78dc417d",
						"resultValue": "36",
						"resultTime": "2023-07-13 17:29:45"
					},
					{
						"observationId": "e6ff1d1f-7ee3-4b18-83b3-54a7e77216ea",
						"resultValue": "30",
						"resultTime": "2023-07-13 17:29:45"
					}
				]
			},
			{
				"sensor": "sc20",
				"lat": "-1.29999101198E1",
				"long": "-3.85072755132E1",
				"sensorType": "http://purl.org/iot/vocab/m3-lite#AirThermometer",
				"unitType": "http://www.ontology-of-units-of-measure.org/resource/om-2/degreeCelsius",
					"quantityKind": "http://www.ontology-of-units-of-measure.org/resource/om-2/none",
		"parentClass": "https://www.w3.org/ns/ssn/SensingDevice",
				"observation": 
				[
						{
							"observationId": "418abe0b-2614-47e7-ad47-1b995ae77d4f",
							"resultValue": "99",
							"resultTime": "2023-07-13 17:29:46"
						},
						{
							"observationId": "9e55b12d-0e21-4d33-81f0-e2c3baa6a166",
							"resultValue": "358",
							"resultTime": "2023-07-13 17:29:46"
						},
						{
							"observationId": "f6310ac0-8356-40ea-a451-87388fd205c3",
							"resultValue": "54",
							"resultTime": "2023-07-13 17:29:46"
						}
				]
			}
	]
}