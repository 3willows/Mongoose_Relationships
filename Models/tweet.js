const mongoose = require("mongoose")
const { Schema } = mongoose

mongoose
  .connect("mongodb://localhost:27017/relationshipDemo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO CONNECTION OPEN!!!")
  })
  .catch((err) => {
    console.log("OH NO MONGO CONNECTION ERROR!!!!")
    console.log(err)
  })

const userSchema = new Schema({
  username: String,
  age: Number,
})

const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" },
})

const User = mongoose.model("User", userSchema)
const Tweet = mongoose.model("Tweet", tweetSchema)

const makeTweets = async () => {
  let user
  user = await User.findOne({ username: "chickenfan99" }, function (err, data) {
    if (!data) {
      ;(async () => {
        user = new User({
          username: "chickenfan99",
          age: 61,
        })
        user.save()
      })()
    }
  })
  if (user) {
    user.save()
  }
  const tweet2 = new Tweet({ text: "balala text", likes: 1239 })
  tweet2.user = user
  tweet2.save()
}

makeTweets()

const findTweet = async () => {
  const t = await Tweet.find().populate("user")
  console.log(t)
}

;(async () => {
  findTweet()
})()
