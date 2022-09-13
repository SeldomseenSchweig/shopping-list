process.env.MODE_ENV = "test";

const request = require('supertest');

const app = require("../app");
let items = require('../fakeDb');



let pickles = { name:"pickles", price:1.45};

beforeEach(function(){

    items.push(pickles)
});

afterEach(function(){
    items = [];
});

describe("GET /items", ()=>{


    test("Get all items", async () =>{

        const res = await request(app).get('/items')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({items:[pickles]})

    })

})
describe("GET /items/:name", ()=>{


    test("Get item by name", async () =>{

        const res = await request(app).get(`/items/${pickles.name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(pickles)

    })

})


describe("POST /item", ()=>{


    test("Create new item", async () =>{

        const res = await request(app).post('/items').send({name:"cake", price:10.00})
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({added:{name:"cake", price: 10.00}})

    })

})


describe("/PATCH /items/:name", ()=>{


    test(" updates an item", async () =>{
        

        const res = await request(app).patch(`/items/${pickles.name}`).send({name:"apples", price: pickles.price})
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({item:{name:"apples", price:pickles.price}})

    })

})


describe("DELETE /items/:name", ()=>{


    test(" Deletes an item", async () =>{
        console.log(pickles.name)

        const res = await request(app).delete(`/items/${pickles.name}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: 'Item Deleted'})

        

    })

})