const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const items = require("../fakeDb")

router.get("/", function(req,res){
    // GET /items - this should render a list of shopping items.
// Here is what a response looks like:

// [{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]
    res.json({items})
  })
  

// POST /items - this route should accept JSON data and add it to the shopping list.
router.post("/", function (req, res) {
    // {“name”:”popsicle”, “price”: 1.45} => {“added”: {“name”: “popsicle”, “price”: 1.45}}
    const newItem = { name: req.body.name, price:req.body.price, }
    items.push(newItem)
    res.status(201).json({ added: newItem })
  })

  



// GET /items/:name - this route should display a single item’s name and price.
// Here is what a sample response looks like:

router.get("/:name", function (req, res) {
    const foundItem = items.find(item => item.name === req.params.name)
    if(foundItem === undefined){
      throw new ExpressError("Item not found", 404)
    }
    res.json(foundItem)
  })
  

// {“name”: “popsicle”, “price”: 1.45}

// PATCH /items/:name, this route should modify a single item’s name and/or price.
// Here is what a sample request/response looks like:

// {“name”:”new popsicle”, “price”: 2.45} => {“updated”: {“name”: “new popsicle”, “price”: 2.45}}

router.patch("/:name", function (req, res) {
    const foundItem = items.find(item => item.name === req.params.name)
    if (foundItem === undefined) {
      throw new ExpressError("Item not found", 404)
    }
    foundItem.name = req.body.name
    foundItem.price = req.body.price

    res.json({ item: foundItem })
  })
  

  router.delete("/:name", function (req, res) {
    const foundItem = items.findIndex(item => item.name === req.params.name)
    if (foundItem === -1) {
      throw new ExpressError("Item not found", 404)
    }
    items.splice(foundItem, 1)
    res.json({ message: "Item Deleted" })
  })
  
  module.exports = router;