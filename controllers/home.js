module.exports = {
    index: function(req, res) {
    	if(req.user) {
    		console.log(req.cookies)
            res.redirect('/week/7');
        } else {
        	res.redirect('/login');
        }
    }
};
