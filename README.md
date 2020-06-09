<h1 align="center">
    <img alt="EColeta" title="#NextLevelWeek" src="https://raw.githubusercontent.com/radaelilucca/EColeta-NLW01/7e2ba7eafed08e9b903123e91a88d78bc8e00ab8/readme-assets/logo.svg" width="250px" />
</h1>

<h2 align="center"> 
	Desenvolvido durante a Next Level Week 1.0  da <a href="https://rocketseat.com.br/"> Rocketseat</a>
</h2>

<p align="center">		
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/radaelilucca/EColeta-NLW01?style=for-the-badge">

  <img alt="Languages" src="https://img.shields.io/github/languages/count/radaelilucca/EColeta-NLW01?style=for-the-badge">
  
	
  <a href="https://www.linkedin.com/in/luccaradaeli/">
    <img alt="Made by Lucca Radaeli" src="https://img.shields.io/badge/made%20by-Lucca_Radaeli-%2304D361?style=for-the-badge">
  </a>

  <a href="https://github.com/radaelilucca/EColeta-NLW01/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/radaelilucca/EColeta-NLW01?style=for-the-badge">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge">
   <a href="https://github.com/radaelilucca/EColeta-NLW01/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/radaelilucca/EColeta-NLW01?style=for-the-badge">
  </a>
</p>

<h3 align="center">
  🌟 &nbsp; <a href="#-NLW">Next Level Week</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  💻 &nbsp;<a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  🚀 &nbsp; <a href="#rocket-Technologies">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  🎆 &nbsp; <a href="#-layout">Layout</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</h3>

<h3 align="center">
  👨‍🏫 &nbsp; <a href="#gear-executando">Executar</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  ➕ &nbsp; <a href="#-como-contribuir">Contribuir</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  :memo: &nbsp; <a href="#memo-licença">License</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  📧 &nbsp;<a href="#-contato">Contato</a>
</h3>

<br/>

## 🌟 NLW - O que é?

A Next Level Week é uma semana prática com muito código, desafios, networking e um único objetivo: levá-lo ao próximo nível.
Através do nosso método, você aprenderá novas ferramentas, aprenderá sobre novas tecnologias e descobrirá hacks que irão impulsionar sua carreira.
Um evento online e totalmente gratuito que o ajudará a dar o próximo passo na sua evolução como desenvolvedor.



## 💻 Projeto

O Ecoleta visa conectar pessoas à companhias que coletam resíduos recicláveis como pilhas, lâmpadas, óleo de cozinha, etc...


<h1 align="center">
    <img alt="Example" title="Example" src="https://raw.githubusercontent.com/radaelilucca/EColeta-NLW01/master/readme-assets/readme-example-image.png" width="900px" />
</h1>


## :rocket: Tecnologias Utilizadas

Este projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js][nodejs]
- [Docker][docker]
- [PostgreSQL][postgresql]
- [TypeScript][typescript]
- [React][reactjs]
- [React Native][rn]
- [Expo][expo]

## 🔖 Layout

Você pode visualizar o layout no [Figma](https://www.figma.com/file/1SxgOMojOB2zYT0Mdk28lB/)!

## :gear: Executando


Para baixar e executar esta aplicação você vai precisar de: [Git](https://git-scm.com), [Docker][docker], [PostgreSQL][postgresql] e [Node.js][nodejs] + [Yarn][yarn].

### 🗄️ Executando a API 

<a href="" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>

```bash
# Clone este repositório:
$ git clone https://github.com/radaelilucca/EColeta-NLW01.git

# Entre na pasta do repositório, em seguida na pasta do backend:
$ cd EColeta-NLW01/backend

# Instale as dependências:
$ yarn install

# Suba um docker container com a imagem postgres
$ docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres

# Crie uma database chamada ecoleta
$ CREATE DATABASE ecoleta 
# ou em algum client postgresql como Postico ou Postbird

# Preencha as variáveis ambiente no arquivo .env.example e renomei-o para '.env'.

# Execute as migrations e as seeds:
$ yarn setup-database

# Inicie a API:
$ yarn dev

# A API roda por padrão na porta 3333!

Para testes, utilize um cliente HTTP como o Insomnia ou Postman.
```

### 🌐 Executando o Front-end Web

```bash
# Clone este repositório:
$ git clone https://github.com/radaelilucca/EColeta-NLW01.git

# Entre na pasta do repositório, em seguida na pasta do mobile:
$ cd EColeta-NLW01/frontend

# Instale as dependências:
$ yarn install

# Execute o projeto em modo desenvolvimento:
$ yarn start

# Não se esqueça de preencher as variáveis ambiente no arquivo .env.example e renomeá-lo para '.env'.

# O frontend roda por padrão na porta 3000!
```

### 📱 Executando o Front-end Mobile 

```bash
# Clone este repositório:
$ git clone https://github.com/radaelilucca/EColeta-NLW01.git

# Entre na pasta do repositório, em seguida na pasta do mobile:
$ cd EColeta-NLW01/mobile

# Instale as dependências:
$ yarn install

# Execute o projeto em modo desenvolvimento:
$ yarn start

Para testes, utilize um dispositivo físico com o aplicativo do Expo ou emuladores.

```

## ➕ Como contribuir
- Primeiramente deixe uma ⭐;
- Faça um fork deste repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Após o merge da sua PR você pode deletar sua branch por conta própria!

## :memo: Licença

This project is under the MIT license. See the [LICENSE](https://github.com/radaelilucca/EColeta-NLW01/blob/master/LICENSE) for details.

## 📧 Contato  
 <h4>Gostou do Projeto e quer conversar sobre? Me chama pra gente trocar uma idéia! </h4>  
  <p>
    <a href="https://www.linkedin.com/in/luccaradaeli/">
      <img src="https://github.com/radaelilucca/FinDevs/blob/master/Assets/Linkedin.png?raw=true" width=10%/> 
      </a>
  </p>
<p>
</p>
Parte dos créditos do readme vão para <a href="https://www.linkedin.com/in/danielobara/"> Daniel Obara</a>. Obrigado, Daniel!

Made with ♥ by Lucca Radaeli :wave: 


[nodejs]: https://nodejs.org/
[docker]: https://www.docker.com/
[postgresql]: https://www.postgresql.org/
[typescript]: https://www.typescriptlang.org/
[expo]: https://expo.io/
[reactjs]: https://reactjs.org
[rn]: https://facebook.github.io/react-native/
[yarn]: https://yarnpkg.com/