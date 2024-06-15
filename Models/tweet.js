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
  const tweet2 = new Tweet({ text: "balala text", likes: 1239 })
  user = await User.findOne({ username: "chickenfan99" }, function (err, data) {
    if (!data) {
      ;(async () => {
        user = new User({
          username: "chickenfan99",
          age: 61,
        })
        tweet2.user = user
        await user.save()
      })()
    }
  })
  if (user) {
    tweet2.user = user
    await user.save()
  }
  await tweet2.save()
}

const findTweet = async () => {
  const t = await Tweet.find().populate("user")
  console.log(t)
}

;(async () => {
  await makeTweets()
  await findTweet()
})()
