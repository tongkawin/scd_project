let express = require("express");
let app = express();
let PORT = process.env.PORT || 3000

app.use(express.static("./static"));

app.listen(PORT, function() {
    console.log(`Listening at http://localhost:${PORT}`);
});
