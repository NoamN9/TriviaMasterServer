const updatePoints = (req,res,db)=>{
    const {id,addedpoint} = req.body;
   
    db('users')
    .where('id','=',id)
    .increment('points',addedpoint)
    .returning('points')
    .then(points => {
      res.json(points[0]);
    })
    .catch(err=>res.status(400).json('unable to get points')) 
  }
  module.exports = {
    updatePoints: updatePoints
}

// if i enter wrong id it will return nothing and not a error need to think about it.