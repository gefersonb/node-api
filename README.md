Docker:

docker-compose up -d


Exemplo de body :

{
"data":{
    "id": 4,
    "descricao":"TAREFA PARA RESPONSAVEL 5",
    "id_responsavel":"5",
    "nome":"USUARIO 3",
    "email":"user3@gmail.com",
    "tipo":"1",
    "inicio" : "2020-12-04",
    "fim" : "2020-12-08",
    "status": "1"

},
"auth":{
    "usuario":2
},
"query":{
    "descricao":""
}
}