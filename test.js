const mongoose = require("mongoose");

// connection
const connect = () => {
  return mongoose.connect("mongodb://localhost:27017/todos");
};

// schema
const student = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    faveFoods: [{ type: String }],
    info: {
      school: {
        type: String,
      },
      shoeSize: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);

// model
const Student = mongoose.model("student", student);

// db connection
connect()
  .then(async (conn) => {
    // insert
    const student = await Student.create({ firstName: "Mario" });
    console.log(student);
    // find
    const student = await Student.find({ firstName: "test" });
    const found = await Student.findById("xxxx");
    const deleted = await Student.findByIdAndDelete("xxxx");
    const updated = await Student.findByIdAndUpdate("xxxx", {});
  })
  .catch((ex) => {
    console.error(ex);
  });

// insert
