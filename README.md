# https://github.com/ddanielsouza/consulta-pessoa-fisica-front

Aplicação desenvolvida em VUE.JS para consumir API dos microsserviços <br>
Simula uma simples consulta de débitos e score de um CPF e registra o log da consulta 

<img src="https://i.pinimg.com/originals/4c/ce/d5/4cced5cd1de68c541880c20ed92d6189.png">

Usuário de teste criado no serviço de autenticação: 
email: daniell.oliveirra@gmail.com
senha: 123456

### Executando o projeto no docker

1. Instalando
    * ``` git clone git@github.com:ddanielsouza/consulta-pessoa-fisica-front.git ```
    * ``` docker build -t front . ```
2. Rodando
    * ``` docker run -itd -p 8080:80  front ```

## Configuração do projeto
```
npm install
```

### Compilação e "hot-reloads" para desenvolvimento
```
npm run serve
```

### Compilação para produção
```
npm run build
```

### Lints
```
npm run lint
```

### Arquitetura dos microsservicos
A arquitetura adotada para os microsserviços foi a de login unico (Single sign-on)
<img src="https://i.pinimg.com/originals/72/2d/dc/722ddc85dad8a4cdf783dbc23e660d33.png"/>

* AUTH: <a href="https://github.com/ddanielsouza/consulta-pessoa-fisica-auth">https://github.com/ddanielsouza/consulta-pessoa-fisica-auth</a> 
* consulta-pessoa-fisica-clientes-dividas: <a href="https://github.com/ddanielsouza/consulta-pessoa-fisica-clientes-dividas">https://github.com/ddanielsouza/consulta-pessoa-fisica-clientes-dividas</a> 
* consulta-pessoa-fisica-credito-pessoal: <a href="https://github.com/ddanielsouza/consulta-pessoa-fisica-credito-pessoal">https://github.com/ddanielsouza/consulta-pessoa-fisica-credito-pessoal</a> 
* consulta-pessoa-fisica-eventos: <a href="https://github.com/ddanielsouza/consulta-pessoa-fisica-eventos">https://github.com/ddanielsouza/consulta-pessoa-fisica-eventos</a>
* consulta-pessoa-fisica-utils: <a href="https://github.com/ddanielsouza/consulta-pessoa-fisica-utils">https://github.com/ddanielsouza/consulta-pessoa-fisica-utils</a>
