/**
 * Load Express Module
*/
const express = require('express');

/**
 * Express server initialization
*/
const server = express();

/**
 * Create Item Array
*/
const itemList = [
    {id : 1, type : 'namo', usage: 20, amount:100},
    {id : 2, type : 'micro', usage: 21, amount:78},
];

/**
 * Base route
*/
server.get('/',(req,res)=>{
        res.send('Welcome back!');
});

/**
 * Application Route
 * Type: Get
 * Usage: Read all item
*/
server.get('/read', (req,res)=>{
    res.send(itemList)
});

/**
 * Application Route
 * Type: Get
 * Usage: Read specific item
*/
server.get('/read/:id', (req,res)=>{
    const item = itemList.find(i => i.id === parseInt(req.params.id));
    if(!item) res.status(404).send('The item was not found.');
    res.send(item);
});

/**
 * Application Route
 * Type: Post
 * Usage: Create item
*/
server.post('/create/:id/:type/:usage', (req,res)=>{
    const itemCheck = itemList.find(i => i.id === parseInt(req.params.id));
    if(!itemCheck) {
        const item = {
            id : req.params.id,
            type : req.params.type,
            usage : req.params.usage,
            amount : 3 * parseInt(req.params.usage)

        };
        itemList.push(item)
        res.send(itemList)    
    }
    else res.status(400).send('The item is already exist.')
    
});

/**
 * Application Route
 * Type: Put
 * Usage: update specific item
*/
server.put('/update/:id/:usage', (req,res)=>{
    const itemCheck = itemList.find(i => i.id === parseInt(req.params.id));
    if(!itemCheck) res.status(404).send('The item was not found.');
    else {
        itemCheck.usage = parseInt(req.params.usage);
        itemCheck.amount = 3 * parseInt(itemCheck.usage);
        res.send(itemList)
    }
});

/**
 * Application Route
 * Type: Delete
 * Usage: Delete specific item
*/
server.delete('/delete/:id', (req,res)=>{
    const itemCheck = itemList.find(i => i.id === parseInt(req.params.id));
    if(!itemCheck) res.status(404).send('The item was not found.');
    else {
        const index = itemList.indexOf(itemCheck);
        itemList.splice(index,1);
        res.send(itemList);
    }
    
});

/**
 * Starting server
 */
const PORT = process.env.PORT || 80;
server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});