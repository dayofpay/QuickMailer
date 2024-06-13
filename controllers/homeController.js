const router = require('express').Router();

router.get('/', async (req, res) => {

    res.render('pages/dashboard',{
        pageName: 'Добре дошли',
        layout: 'default'
    })
});


module.exports = router;
