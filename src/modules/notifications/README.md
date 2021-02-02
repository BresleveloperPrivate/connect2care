
# Carmel Notifications Module.
if you want to include real time notifications in your project, use this repo!

### First steps: 

**Make sure to have REACT_APP_DOMAIN in your ```.env``` file to set your domain. on dev, use localhost:3000**

1. Create subscriptions table, using [create_table_subscriptions](https://github.com/carmel-6000/notifications/blob/master/  create_table_subscriptions), or create it manually from the file "create_table_subscription" straight in your mysql db.
2. Put **worker.js** in your Public folder, and un-comment it.
3. CREATE YOUR API KEYS, and replace them in the code (1 public, 1 private. you will find them in fcmhandler.js, and     
   SwNtfFactory.js) to generate, run in cmd:
      ``` 
      npm install web-push
      web-push generate-vapid-keys
      ```

4. comment out / delete this line from 'src/index.js': 
      ```serviceWorker.unregister();```

5. add to model config, in module-loader section :
   ```
         {
         "name": "notifications",
         "path": "../src/modules/notifications",
         "models": "server/models",
         "routes": "server/routes",
         "github": "https://github.com/carmel-6000/notifications.git"
         }
   ```
   after you load this script, make sure you have this files and data: 
      - At server/config.js -- > "notification" key. 
      - At src/consts/ModelConfig.json -- > "notification" key. 
      - At server/model-config.json --- > have "Subscription" model and "Notification" model. 

THEN:

6. in fcmhandler.js, add your model names to modelsToListen:
   ```const modelsToListen = [<model_name>];```

7. How to register a model in the client and listen to changes:
   ```
   componentDidMount() { 
         NtfFactory.getInstance().subscribeModel(<Model_name>, (data) => { console.log("NTF!", data) });
      }
   ```

8. Implement ```afterSaveWebpush``` , ```afterDeleteWebpush ```in each model you listen to!
 - afterSaveWebpush --> function that happend every times your model is going through "save" funtcion such
   as upsert, update, create, etc. 
 - afterDeleteWebpush --> function that happend every times your model is going through "delete" funtcion.

      ***THIS IS AN EXAMPLE. COPY IT AND CHANGE THE DATA IN YOUR OWN CODE.***
      users- should be a list of users ids to send them this notification.
      ntf-
      body : the content you see in the push message.
         title: the title you see in the push.
         data: Object of data you want to use in order to update the DOM in the client, put what you need in there.
      ```
         MODELNAME.afterSaveWebpush = function (ctx, cb) {
            let ntf = {
               title: "message from server",
               body: "",
               data: {}
            }
            let users = [1, 3]; // here you should give an array of users ids.
            cb(ntf, users);
         }
      ```
9. if you want to send a notification from your server, but you dont want it to happend afterSave/afterDelete, just do so:
   ```
   let ntf = { data: {}, body: "תתאמנו בטטות!!!!!!!", title: "10katef" }
      [modelname].createNotification(ntf, [userId]);
   ```

10. If you want to log out user, please use 
   ```
   NtfFactory.unsubscribe()
   ```
   It will delete the subscription from the database, and clear the ntf instance.

### Fcm updates: 
   *13/1/20*
      In order to deploy cordova you will need:

   1. Create firebase account for your project.
      
   2. Go to [console.developers](https://console.developers.google.com), make sure to be on your project. In Credentials tab, create new service_account credentials. type- App Engine default Service account. 
   it will download json file with your credentials. copy its content into [fcmHandler](https://github.com/carmel-6000/notifications/blob/fcmTest/server/routes/fcmhandler.js).

   3. Inside your cordova folder, run: 

   ```
      cordova platform add android
      cordova plugin add cordova-plugin-fcm-with-dependecy-updated
      cordova plugin add cordova-plugin-device
   ```

   4. Go back to *firebase* -> *settings* -> *Grenral*. In *Your apps* tab, add a new Android app. Download **google-services.json**.
   Make sure to register your app as com.carmel6000.**[Your app name]** , and to be consistent with your app signature.

   Add **google-services.json** to : 
         cordova, cordova/platforms/android, cordova/platforms/android/app .


   If you have bugs, talk to Reut/Zehava.


   ### Gitignore updates:

   Hi, we moved all project-based data to config.json and to ModulesConfig.json. Run ```generate-config``` script to update.

   ### ios:
   Follow this guide to enable ios notifications https://www.appcoda.com/firebase-push-notifications/
