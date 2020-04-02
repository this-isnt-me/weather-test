let middlewareObj ={};

middlewareObj.isActive = (req, res, next) => {
	if (req.isAuthenticated() && req.user.accountlive === true){
		return next()
		}
	res.redirect('');
}


module.exports = middlewareObj;