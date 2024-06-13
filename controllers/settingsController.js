const { getServerList, getTemplateList } = require('../services/apiServices');

const router = require('express').Router();

router.get('/',async(req,res) => {
    const serverList = await getServerList();
    const templateList = await getTemplateList();

    res.render('pages/settings',{
        pageName: 'Настройки',
        layout: 'default',
        serverList,
        templateList : templateList.templateList,
    })
})

module.exports = router;