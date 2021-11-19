const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

const server = app.listen(PORT, () => {
  console.log(`Server is runnig on port ${PORT}`);
});
