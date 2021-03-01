# Setup
* `git clone  https://github.com/BresleveloperPrivate/connect2care.git`
* `npm install`
    * might also need `npm install node-sass`
* install mysql\XAMMP
* start Apache and MySql
* new Database `ourBro`
* use lates `dump.sql` (`ourbro.marches.sql`) file
* update file `my.ini`, add after `[mysqld]` these 2 values
    * `ft_min_word_len=2`
    * `innodb_ft_min_token_size=2`
* for dev:
    * `node .`
    * `npm start`

go down to see DB setup


# add user my sql

```
FLUSH PRIVILEGES;
CREATE USER 'ourBroDev'@'localhost' IDENTIFIED BY 'z10mz10m';
GRANT ALL PRIVILEGES ON ourBroDev.* TO 'ourBro'@'localhost';
```


After that please go to users and open a new user with all the privileges and give it a name and a password in accordance to the one written in the "datasource.json " in "Server" folder



# other noteables
code filters meeting from 2021 only via this line
`src\stores\meetings.store.js:104`, u can comment it to get old data
