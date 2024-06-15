const mongoose = require('mongoose');
const Product = require('./Models/product');
const Farm = require('./Models/farm');

mongoose.connect('mongodb://localhost:27017/farmStandTake2', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })
// p.save()
//     .then(p => {
//         console.log(p)
//     })
//     .catch(e => {
//         console.log(e)
//     })

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    },
]

const seedFarms = [
    {
        name: 'Farm Fresh',
        city: 'New York',
        email: 'farmfresh@example.com',
        products: []
    },
    {
        name: 'Green Thumb',
        city: 'Los Angeles',
        email: 'greenthumb@example.com',
        products: []
    },
    {
        name: 'Sunny Side Up',
        city: 'Chicago',
        email: 'sunnysideup@example.com',
        products: []
    },
    {
        name: 'Harvest Home',
        city: 'Houston',
        email: 'harvesthome@example.com',
        products: []
    },
    {
        name: 'Rustic Roots',
        city: 'Philadelphia',
        email: 'rusticroots@example.com',
        products: []
    },
]


Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
        return Farm.insertMany(seedFarms)
    })
    .catch(e => {
        console.log(e)
    })