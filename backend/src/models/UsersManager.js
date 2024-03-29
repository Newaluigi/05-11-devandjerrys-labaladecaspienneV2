const AbstractManager = require('./AbstractManager')

class UsersManager extends AbstractManager {
  constructor() {
    super({ table: 'users' })
  }

  addOne(user) {
    const { email, password } = user
    return this.database
      .query(`insert into user ${this.table} (email, password) values (?,?)`, [
        email,
        password,
      ])
      .then(([result]) => {
        return { id: result.insertId, email }
      })
      .catch((error) => {
        console.error(error)
      })
  }

  findOne(email) {
    return this.database.query(`SELECT * FROM ${this.table} WHERE email = ?`, [
      email,
    ])
  }

  insert(user) {
    return this.database.query(
      `insert into ${this.table} (nickname, lastname, firstname, email, password, phone, number_delivery, adress_delivery, zip_delivery, town_delivery, country_delivery, number_bill, adress_bill, zip_bill, town_bill, country_bill, is_admin ) values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,? , ?, ?, ?, ?)`,
      [
        user.nickname,
        user.lastname,
        user.firstname,
        user.email,
        user.password,
        user.phone,
        user.number_delivery,
        user.adress_delivery,
        user.zip_delivery,
        user.town_delivery,
        user.country_delivery,
        user.number_bill,
        user.adress_bill,
        user.zip_bill,
        user.town_bill,
        user.country_bill,
        user.is_admin,
      ]
    )
  }

  update(user) {
    return this.database.query(
      `update ${this.table} set nickname = ? , lastname  = ? , firstname = ? , email = ? , password = ?  , phone = ? , number_delivery = ? , adress_delivery = ? , zip_delivery = ? , town_delivery = ? , country_delivery = ? , number_bill = ? , adress_bill = ? , zip_bill = ? , town_bill = ? , country_bill = ? , is_admin = ? where id = ? `,
      [
        user.nickname,
        user.lastname,
        user.firstname,
        user.email,
        user.password,
        user.phone,
        user.number_delivery,
        user.adress_delivery,
        user.zip_delivery,
        user.town_delivery,
        user.country_delivery,
        user.number_bill,
        user.adress_bill,
        user.zip_bill,
        user.town_bill,
        user.country_bill,
        user.is_admin,
        user.id,
      ]
    )
  }
}

module.exports = UsersManager
