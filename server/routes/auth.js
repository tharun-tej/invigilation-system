const {
    login,
    // clearNotification
  } = require("../controllers/UserController");
  
  const router = require("express").Router();
  
  router.post("/login", login);
//   router.post('/clearNotification',clearNotification);
  module.exports = router;