const { getTemplateList, getServerList } = require('../services/apiServices');

const router = require('express').Router();

router.get('/', async(req, res) => {
    const templateList = await getTemplateList();
    const serverList = await getServerList();
    res.render('pages/compose', {
        pageName: 'Compose',
        layout: 'default',
        templateList: templateList.templateList,
        serverList,
    });
});
module.exports = router;