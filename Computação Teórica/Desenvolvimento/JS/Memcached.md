O Memcached é um sistema de cache de memória amplamente utilizado para acelerar o acesso a dados em aplicativos da web. 

### Como o Memcached Funciona?

O Memcached opera em um ambiente cliente-servidor, onde os clientes se conectam a um ou mais servidores Memcached para armazenar e recuperar dados em cache. 

Quando um cliente deseja recuperar um valor, ele envia uma solicitação ao servidor Memcached especificando a chave associada ao valor desejado. 

Se o valor estiver presente no cache, o servidor Memcached o retornará ao cliente; caso contrário, o cliente precisará recalcular ou buscar o valor em outra fonte de dados.

### Instalação - Ubuntu

```
wget http://memcached.org/latest
tar -zxvf memcached-1.x.x.tar.gz
cd memcached-1.x.x
./configure && make && make test && sudo make install
sudo apt install memcached
```

Para iniciar, basta executar `memcached` via terminal.

O exemplo de uso está no `index.js`.

Retorno esperado:
> Set cache for key "email"
> Get cache for key "email"
> From cache: my-email@gmail.com
> Deleted cache for key "email"
> No cache found for key "email"
> From cache after delete: null