## Projuect Introduction
This is an Anime e-commerce platform project. At present, some functions include home page search, beautiful picture show, commodity-centered purchase, add, search, delete, shopping cart, collection, detailed introduction and other functions.
When users are not logged in, they can only watch the products, but cannot collect them and add them to the shopping cart. At the same time, shopping carts and favorites are associated with users. Different users can add and collect their own goods

### Project Start

#### Manual Start
**Run in the project root directory**

1.
```Bash
yarn install 
```
2.
Run the following commands in three different terminals
```Bash
yarn serve
```
```Bash
npx json-server --watch db.json --middlewares ./middleware/index.js 
```
```Bash
node server/server.js
```

> 

#### Quick Start
```Bash
yarn install 
```
- Then run start.bat from CMD (in the root directory)
```Bash
./start.bat
```

### Dependencies

- vue2.x
- yarn
- json-server
- nodemon

### technology stack

Vue2 + VueRouter + Vuex + Axios + Less + NodeJs + express(Only JWT generation and verification function) + Json-Server(Implementation of various other functions)

### Page

/home
/banner(including search)
/rsegister 
/login 
/cart 
/favorites
/commdity
/magnifer 
/profile 
/* -- 404 

### Component

Header
Footer
NoData
Preview
Loading
Toast
