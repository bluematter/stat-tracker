module.exports = {
    index: function(req, res) {
    	if(req.user) {
            res.redirect('/week/'+req.cookies.week+'/');
        } else {
        	res.redirect('/login');
        }
    }
};
