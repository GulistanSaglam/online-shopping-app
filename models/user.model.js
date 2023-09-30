const db = require('../data/database');
const mongodb = require('mongodb');
const bcrypt = require('bcryptjs');

class User {
    constructor (email, password, fullname, address, city) {
       this.email = email,
       this.password = password,
       this.fullname = fullname,
       this.address = address,
       this.city = city
    }
 

   static findUserById(userId) {
     const uid = new mongodb.ObjectId(userId);
    return db.getDb().collection('users').findOne({_id: uid}, {projection: {password: 0}});
   }


    getUserSameEmail() {
       return db.getDb().collection('users').findOne({email: this.email});
    }


    


    async existsAlready() {
         const existedAlreadyUser = await this.getUserSameEmail();
         if(existedAlreadyUser) {
                return true;
            }
             return false;
    }






    async signup() {
        const hashedPassword = await bcrypt.hash(this.password, 15);
        await db.getDb().collection('users').insertOne({
            email: this.email,
            password: hashedPassword,
            fullname: this.fullname,
            address: this.address,
            city: this.city
        });
    }






    IsCorrectPassword(hashedPassword) {
     return bcrypt.compare(this.password, hashedPassword);
    }
}


module.exports = User;