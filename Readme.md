# Serviço Web para geração de certificados de conclusão de curso

## Desafio
A idéia é construir um serviço WEB que receba um modelo em HTML do certificado e os dados do aluno e gerar um arquivo PDF desse certificado.

## Passo a passo

1.  Criar repositório no github para o projeto.
2.  Criar um arquivo HTML como template do certificado usando o padrão do [Handlebars](https://handlebarsjs.com/). As informações dinâmicas como nome do curso, data e nome do aluno serão substituídas no momento da geração do PDF. O Handlebars usa {{input}} como padrão para essa marcação.
3.  Criar um serviço em node usando [Expressjs](https://expressjs.com/) ou [Fastify](https://www.fastify.io/docs/latest/). Pode usar algum outro Framework se preferir.  
    3.1.  Criar uma rota (endpoint) que responda no endereço /certificado com o método POST do http(s).  
    3.2.  Criar um serviço que receba os parâmetros para a impressão do Certificado, o template HTML e devolva o arquivo gerado. Pode utilizar libs como o Handlebars que "compila" o template gerando o HTML final e o [puppeteer](https://github.com/puppeteer/puppeteer) que cria uma pagina PDF a partir do HTML.
4.  Criar uma conta no [Firebase](https://firebase.google.com/) ou [Heroku](https://www.heroku.com/) e fazer a publicação (deploy) do serviço.
5. Usar uma ferramenta como o [Postman](https://www.postman.com/) para validar o serviço.

### Extra
Não precisa construir código de upload do template HTML, pode publicar o arquivo em algum lugar acessível (como no Storage do Firebase) e buscar com uma lib como o [axios](https://github.com/axios/axios).