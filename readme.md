# GreenThumb

## Como rodar este projeto

##### Rodando o modo de desenvolvimento


```
  yarn run watch:dev
```

##### Gerando o pacote para deploy

```
  yarn run build:dist
```

##### Rodar Testes

```
  yarn test
```

##### Realizar deploy no surge

```
  yarn run deploy
```

## Link da Aplicação

https://greenthumb2.surge.sh

## Arquitetura da Aplicação

Foquei em criar uma arquitetura onde tudo funciona como um palco (Stage) onde executamos Passos (Steps), a cada avanço o Stage é responsável por navegar entre os Steps, no Stage eu insiro um array de objetos que servem como um state de cada Step, que pode ser acessado pelos Controllers de cada Step;

### Roadmap

- [x] Handlebars
- [x] ES Modules
- [x] ITCSS + BEMCSS para arquitetura escalavel e manutenível
- [x] PostCSS com plugin do Autoprefixer
- [x] Corrigir Validação
- [x] Lazy-load das imagens
- [ ] JEST (**incompleto**)
- [ ] Animações de transição
- [ ] Cross-Browser IE 11
- [ ] JSON-LD
- [ ] WAI-ARIA
- [ ] CYPRESS

