const path = require('path')
const assert = require('assert')
const request = require('supertest')
const app = require('../index')
const User = require('../lib/mongo').User

const testName1 = 'testName1'
const testName2 = 'testName2'

describe('signup', function () {
  describe('POST / signup', function () {
    const agent = request.agent(app)
    beforeEach((done)=>{
      //创建一个用户
      User.create({
        name: testName1,
        password: '123456',
        avatar:'',
        gender:'x',
        bio:''
      })
        .exec()
          .then(()=>{
            done()
          })
          .catch(done)
      })


     afterEach((done)=>{
       //删除测试用户
       User.deleteMany({naem: {$in:[testName1, testName2]}})
        .exec()
        .then(()=>{
          done()
        })
        .catch(done)
     })
     after(function (done) {
      process.exit()
     })
  })
})
