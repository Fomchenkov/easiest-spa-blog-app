const { Sequelize, Model, DataTypes } = require('sequelize')

const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: 'database.sqlite3'
})

class Post extends Model {}

Post.init({
	title: DataTypes.STRING,
	content: DataTypes.STRING
}, { sequelize, modelName: 'post' })

module.exports = {
    sequelize: sequelize,
    Post: Post
}
