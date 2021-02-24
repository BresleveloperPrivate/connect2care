git clone  https://github.com/BresleveloperPrivate/connect2care.git

Then npm install in the root folder.

If you have mySQL server, XAMPP and Node installed on your computer, please continue, if not please install it locally

Open XAMPP and start Apache and MySQL server, the open the MySQL admin from Xampp.
In  the Admin interface open a new Database and call it "ourBro"
After that please go to users and open a new user with all the privileges and give it a name and a password in accordance to the one written in the "datasource.json " in "Server" folder
After creating the user, go to import and from the "dumps" folder import the file ourBro-new.dump.sql and press "Go" to run the file, this will fill the local DB with the data.
Now we can try and run the server, open a terminal and run node . 
If you receive the following message "Web server listening at: http://localhost:8080
Browse your REST API at http://localhost:8080/explorer" everything is working properly.
Next open an additional terminal  and run "npm start" 
If it runs propely you can open the project in http://localhost:3000/
Should you want to access the loopbak interface open your explorer in http://localhost:8080/explorer/#/
 





// 1. git clone https://github.com/carmel-6000/ourBrothers.git
// 2. cd ourBrothers
//3. git submodule update --init --recursive
// 4. npm install
// 5. npm run build

There is a dump inside dumps/ourBro.dump.sql




# add user my sql

```
FLUSH PRIVILEGES;
CREATE USER 'ourBroDev'@'localhost' IDENTIFIED BY 'z10mz10m';
GRANT ALL PRIVILEGES ON ourBroDev.* TO 'ourBro'@'localhost';
```

