1. `npx sequelize init`
2. `npx sequelize model:create --name User --attributes username:string,email:string,password:string,favoritePokemon:string,avatar:string`
3. `npx sequelize db:migrate`
4. `npx sequelize db:migrate:undo` reverts all migrations
5. `npx sequelize seed:create --name users`
6. `npx sequelize db:seed:all`
7. `npx sequelize db:seed:undo`
