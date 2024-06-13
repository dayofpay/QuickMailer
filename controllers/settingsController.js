const router = require('express').Router();

router.get('/',async(req,res) => {
    res.render('pages/settings',{
        pageName: 'Настройки',
        layout: 'default',
    })
})

module.exports = router;