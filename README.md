# MEVN task for user registration
Part of task for user registration

## Run:

### Install dependencies
> 1. Run npm install in the '/server' directory  
> 2. Run npm install in the '/client/crowsoft_auth_client' directory  

### Create database:
> 1. Create MySQL database with UTF-8 encoding  
> 2. Set database connection configurations in '/server/src/config/config.json'  
> 3. Navigate to '/server/src' & run sequilize-cli db:migrate to create your tables  
> 4. Import the csv file '/server/src/db/address_dump.csv' in the Addresses table created by the migration  

### Start server:
> 1. Navigate to '/server' and run 'npm start'  

### Start client:
> 2. Navigate to '/client/crowsoft_auth_client' and run 'npm run serve'  



## Dependencies:

### ExpressJs
> https://expressjs.com/

### body-parser
> https://www.npmjs.com/package/body-parser

### basic-auth
> https://www.npmjs.com/package/basic-auth

### cors
> https://www.npmjs.com/package/cors

### Joi
> https://www.npmjs.com/package/@hapi/joi

### cors
> https://www.npmjs.com/package/cors

### Sequelize
> https://sequelize.org/

### mysql2
> https://www.npmjs.com/package/mysql2

### Axios
> https://www.npmjs.com/package/axios

### Vue autosuggest component
> https://www.npmjs.com/package/vue-autosuggest