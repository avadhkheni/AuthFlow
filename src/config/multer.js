const multer = require("multer");
const path = require("path");

// const upload = multer()
// const upload = multer({ dest: "public/products" })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cd(null, path.json(__dirname, "..", "..", "public", "products"));
  },

  filename: () => {

    const preFix = Date.now() + "-" + Math.ceil(Math.random() * 10000000);

    cd(null, preFix + "-" + file.originalname);
  }
});

const uplode = multer({ storage: storage });

module.exports = uplode;
