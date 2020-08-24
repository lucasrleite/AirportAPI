<div  align="center">

<H1>AirportAPI</H1>
<br>
<br>
<br>
<img src="./readme/logo.png" width="400">
<br>
<br>
<br>
<br>
:airplane: Este projeto foi criado na intenção de propor uma API com dados de Aeroportos.
 

</div>

  

# :bulb: Ideia do projeto:
A ideia do projeto foi utilizar dos dados fornecidos pelo: OurAirports.com, e realizar uma API para busca de dados dos aeroportos, como localização(longitude e latitude,altitude).  

#  </> Tecnologias:

  

Este projeto foi feito utilizando as seguintes tecnologias e dados.


<ul>

<li><a  href="https://nodejs.org/en/docs/">NodeJs</a></li>
<li><a  href="https://ourairports.com/data/">OurAirports</a></li>
</ul>


# 👩🏼‍💻 Formato de resposta:

Chamando a seguinte rota:

`http://localhost:3000/aero/info/####`

*No Lugar do #### coloque o ICAO do aeroporto que deseja fazer a pesquisa.*

**Exemplo:**
`http://localhost:3000/aero/info/SBSP`

*Retorna

<img src="./readme/response.png" width="400">

*
# :construction_worker: Como executar o projeto:

  

### :computer: Downloading project

  

```bash

# Clone repository into your machine

$ git clone https://github.com/lcsxz/AirportAPI.git



# Go to project's server folder

$ cd server

  

# Install dependencies

$ yarn install or npm install

  

# Run application

$ yarn start or npm run start

  
```
  

API available to be tested on http://localhost:3000/.


# :memo: ToDo

  

- METAR

- Procurar aeroportos por região

- Procurar aeroportos por país


  

# :art: License

  

Em desenvolvimento...

Primeiro commit 20/08/2020.


Made with passion by [Lucas Leite](https://github.com/lcsxz) 🚀.

Este projeto tem uma [MIT LICENSE](https://github.com/lcsxz/AirportAPI/blob/master/LICENSE)
