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