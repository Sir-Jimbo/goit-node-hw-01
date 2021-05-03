const fs = require('fs')
const path = require('path')
const shortid = require('shortid')



const contactsPath = path.join(__dirname, './db/contacts.json')

function listContacts() {
   fs.readFile(
      contactsPath,
      (err, data) => {
         if (err) {
            console.log(err);
            return;
         }
         console.table(JSON.parse(data));
      })
}

function getContactById(contactId) {
   fs.readFile(contactsPath, (err, data) => {
      if (err) {
         console.log(err);
         return;
      }
      const users = JSON.parse(data);
      const user = users.find(user => user.id === contactId);
      console.table(user);
   });
}

function removeContact(contactId) {
   fs.readFile(
      contactsPath,
      (err, data) => {
         if (err) {
            console.log(err);
            return;
         }
         const users = JSON.parse(data)
         const userRemove = users.filter(user => user.id !== contactId);

         fs.writeFile(
            contactsPath,
            JSON.stringify(userRemove, null, '\t'),
            (err) => {
               if (err) {
                  console.log(err);
                  return;
               }
               console.table(`contact ${contactId} remove`);
            }
         )
      }
   )
}

function addContact(name, email, phone) {
   fs.readFile(
      contactsPath,
      (err, data) => {
         if (err) {
            console.log(err);
            return;
         }

         const users = JSON.parse(data);
         const id = shortid.generate();

         users.push({
            'id': id,
            'name': name,
            'email': email,
            'phone': phone
         })

         fs.writeFile(
            contactsPath,
            JSON.stringify(users, null, '\t'),
            (err) => {
               if (err) {
                  console.log(err);
                  return;
               }
               console.log(`Contact ${name} added`);
            }
         )
      }
   )
}

module.exports = {
   listContacts,
   getContactById,
   removeContact,
   addContact
}