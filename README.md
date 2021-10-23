# trotRaceApplication
Steps to run the application :
1. npm install yarn      #not required if yarn already installed
2. yarn install          #install project dependencies 
2. Mongo DB [Optional. Please read below "Points to Know" point no 5]: 
    a) Update .env file present in the root directory
        i) replace username & password of MONGO_URI in with your Mongo DB   username and password
        ii) replace DB_NAME value with your Mongo DB Name
3. Email Address update [optional] :
    a) Update file src->utility->config.json.
    b) Replace value of "email" with your email ID.
4. Check lint errors using command :
    yarn lint
5. Run integration tests against Mongo DB using command :
    yarn test
4. Run the application using command :
    yarn start



--------------Points to Know-------------
1. On starting the app, the process initiates :
    authentication process by calling server API /auth, which in turn returns a token
2. App uses this token to make request to /results API
3. App keep receiving the race data, which it keeps saving in Mongo DB
4. Fetching of results is independent of DB connection, as data is fetched from the server, whereas the mongo DB connection is either local or on cloud.
5. Mongo DB : I am using cloud service to store race Data in Mongo DB. The same credentials can be used to operate this app if required. Kindly get in touch with me to use my personal credentials.
You would need MongoDBCompass App for the same.