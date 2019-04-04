const marked = require('marked')
const Comment = require('../lib/mongo').Comment

// 将comment的content 从 Markdown 转换成 html
Comment.plugin('contentToHtml', {
  afterFind(comments) {
    return comments.map((comment) => {
      comment.content = marked(comment.content)
      return comment
    })
  }
})

module.exports = {
  //创建一个留言
  create(comment) {
    return Comment.create(comment).exec()
  },
   // 通过留言 id 获取一个留言
  getCommentById(commentId) {
    return Comment.findOne({_id: commentId}).exec()
  },
  // 通过留言 id 删除一个留言
  delCommentById(commentId) {
    return Comment.deleteOne({ _id: commentId }).exec()
  },
  delCommentsByPostId(commentId) {
    return Comment.deleteMany({postId: postId}).exec()
  },
  // 通过文章id 获取该文章下所有留言， 按留言创建的时间升序
  getComments(postId) {
    return Comment
      .find({postId: postId})
      .populate({path: 'author', model: 'User'})
      .sort({_id: 1})
      .addCreatedAt()
      .contentToHtml()
      .exec()
  },

  // 通过文章 id 获取该文章下留言数
  getCommentsCount: function getCommentsCount (postId) {
    return Comment.count({ postId: postId }).exec()
  }

}
