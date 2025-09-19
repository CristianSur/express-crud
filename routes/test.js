var express = require('express');
var router = express.Router();
// In-memory data store (array of items)
let items = [];
let currentId = 1;

// Create (POST)
router.post('/', (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }
    const newItem = { id: currentId++, name };
    items.push(newItem);
    res.status(201).json(newItem);
});

// Read All (GET)
router.get('/', (req, res) => {
    res.json(items);
});

// // Read One (GET)
// router.get('/items/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const item = items.find(i => i.id === id);
//     if (!item) {
//         return res.status(404).json({ error: 'Item not found' });
//     }
//     res.json(item);
// });
//
// // Update (PUT)
// router.put('/items/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const { name } = req.body;
//
//     const itemIndex = items.findIndex(i => i.id === id);
//     if (itemIndex === -1) {
//         return res.status(404).json({ error: 'Item not found' });
//     }
//
//     if (!name) {
//         return res.status(400).json({ error: 'Name is required' });
//     }
//
//     items[itemIndex].name = name;
//     res.json(items[itemIndex]);
// });
//
// // Delete (DELETE)
// router.delete('/items/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const itemIndex = items.findIndex(i => i.id === id);
//
//     if (itemIndex === -1) {
//         return res.status(404).json({ error: 'Item not found' });
//     }
//
//     items.splice(itemIndex, 1);
//     res.status(204).send();
// });

module.exports = router;