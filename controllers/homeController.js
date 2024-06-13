const router = require('express').Router();

router.get('/', async (req, res) => {
    return res.json({ message: 'Welcome to the home page' });
});


module.exports = router;
