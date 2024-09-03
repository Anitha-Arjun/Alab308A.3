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

function getUserDataPromise(id) {
  // Define the database lookup map
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3,
  };
  let startTime = window.performance.now();

  // Find which database to use
  return central(id)
    .then((dataBaseName) => {
      console.log("Database Name:", dataBaseName);

      // Define the user info and personal data fetch promises
      const userInfoPromise = dbs[dataBaseName](id);
      const personalDataPromise = vault(id);

      // Use Promise.all to wait for both promises to resolve
      return Promise.all([userInfoPromise, personalDataPromise]).then(
        ([userInfo, personalData]) => {
          console.log("User Info:", userInfo);
          console.log("Personal Data:", personalData);

          // Combine user info and personal data into one object and return it
          return {
            ...userInfo,
            ...personalData,
          };
        }
      );
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      // Re-throw the error if you want the caller to handle it
      return Promise.reject(error);
    })
    .finally(() => {
      // End the timer and log the time taken
      let endTime = window.performance.now();
      let timeTaken = endTime - startTime;
      console.log("Time Taken Promise " + timeTaken);
    });
}

const user1 = await getUserDataPromise(6);
console.log(user1);
