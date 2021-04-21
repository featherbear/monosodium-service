'use strict'

// TODO: Close the browser

//   client.api.listen((err, evt) => {
//     if (err) return console.error(err)

//     client.emit('data', evt)
//   })

//   return client
// }


import FBClient from 'facebook-messenger-puppeteer'
import { EventEmitter } from 'events'

export default class MessengerLink extends EventEmitter {
  api: FBClient

  constructor() {
    super()
    this.api = null
  }

  get currentUserID(): Number {
    if (this.api === null) throw Error('Bot not logged in')
    return Number(this.api.getCurrentUserID())
  }

  async getCurrentSession() {
    return await this.api.getSession()
  }

  async login(auth: {
    username?: String, password?: String, session?: any
  }) {

      let client = new FBClient({
        selfListen: true,
        session: auth?.session
      })

    await client.login(auth?.username, auth?.password)
    this.api = client

    return this
  }

  async close() {
    await this.api.close()
  }
}
