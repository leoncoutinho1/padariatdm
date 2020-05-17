Curso SASS

As imagens utilizadas no projeto devem ficar na pasta **img** logo abaixo da pasta raiz.

Para executar o projeto basta copiar as imagens para a pasta img e abrir o arquivo index.html pelo navegador.

Para trabalhar mais facilmente no projeto pode-se utilizar o comando no terminal:
```
    npm run compile:sass
```

O script compile:sass está configurando no arquivo package.json para acompanhar e compilar automaticamente quando qualquer alteração é feita no arquivo main.scss gerando o styles.css.

Outra ferramenta util que pode ser instalada é o live-server que pode ser instalado globalmente pelo comando:
```
    npm install live-server -g
```

Para executar basta rodar o comando __live-server__ no terminal no diretório raiz do projeto.
O live-server monitora qualquer alteração realizada dentro do diretório e faz um reload da página index.html no navegador.