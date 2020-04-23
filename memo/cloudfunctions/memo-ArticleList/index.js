// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: "wx99155eb36a6a05c7-8oeqj"
})

const _ = cloud.database().command

// 云函数入口函数 
exports.main = async(event, context) => {
  const wxContext = cloud.getWXContext()
  if (event.fun == "add") {
    return await cloud.database().collection("memo-ArticleList").add({
      data: {
        ops: event.test,
        time: event.time
      },
    })
  } else if (event.fun == "get") {
    return await cloud.database().collection("memo-ArticleList").get()

    // let arr = []
    // for (let i = 1; i <= 12; i++) {
    //   (function(i) {
    //     cloud.database().collection("memo-ArticleList").where({
    //       time: {
    //         month: _.eq(i)
    //       }
    //     }).get((res) => {

    //       arr[i] = res.data
    //       if (i == 12) {
    //         return arr
    //       }
    //     })
    //   })(i)
    // }

  }
}