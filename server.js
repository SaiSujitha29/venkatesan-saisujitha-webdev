var app = require('./express');

app.set('view engine', 'ejs');
require('./utilities/filelist');

app.use(app.express.static(__dirname + '/public'));

app.listen(process.env.PORT || 3000);
