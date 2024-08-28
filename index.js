// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.js";

//creating async function
async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };

  //find users in the database using central
  const dataBaseName = await central(id);
  console.log(dataBaseName);
  //User's basic information
  const userInfo = await dbs[dataBaseName](id);
  console.log(userInfo);
  //access the vault to fetch the personal data about the user
  const personalData = await vault(id);
  console.log(personalData);
  return {
    ...userInfo,
    ...personalData,
  };
}

const user = await getUserData(9);
console.log(user);

//Invalid numbers
// const user1 = await getUserData(11);
// console.log(user1);

//Invalid Data Types
// const user2 = await getUserData(true);
// console.log(user2);
