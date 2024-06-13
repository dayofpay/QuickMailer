// exports.demoMiddleware = async(req,res,next) => {

//   try{
//     let objectId;

//     objectId = !req.params.id ? req.body.objectId : req.params.id;
//     const userId = req.user?.['user_id'];
  
//     const hasPermission = await Permission.findOne({where: {
//       user_id: userId,
//       object_id: objectId,
//     },raw:true});
  
//     if(hasPermission === null){
//      return res.render('admin/errors/noAccessOrInvalidObject',{
//         pageName: 'Грешка',
//         errorCode: '403 - Забранен достъп',
//         errorDescription: 'Нямате достъп до този обект или обектът не съществува',
//         objectId,
//      })
//     }
//   }catch(error){

//   }

//  return next();
// }