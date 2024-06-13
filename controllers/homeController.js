const router = require('express').Router();
const {getLatestMailHistory} = require('../services/mailServices');
router.get('/', async (req, res) => {
    const mailHistory = await getLatestMailHistory();
    res.render('pages/dashboard',{
        pageName: 'Добре дошли',
        layout: 'default',
        mailHistory : mailHistory.data,
    })
});


module.exports = router;
