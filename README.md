1. git clone https://github.com/carmel-6000/ourBrothers.git
2. cd ourBrothers
3. git submodule update --init --recursive
4. npm install
5. npm run build

There is a dump inside dumps/ourBro.dump.sql




# add user my sql

```
FLUSH PRIVILEGES;
CREATE USER 'ourBroDev'@'localhost' IDENTIFIED BY 'z10mz10m';
GRANT ALL PRIVILEGES ON ourBroDev.* TO 'ourBro'@'localhost';
```

