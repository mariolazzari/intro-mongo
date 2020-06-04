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
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },
  },

  { timestamps: true }
);

const school = new mongoose.Schema({
  name: String,
  eopenSince: Number,
  students: Number,
  isGreat: true,
});

// model
const School = mongoose.model("School", school);
const Student = mongoose.model("Student", student);

// db connection
connect()
  .then(async (conn) => {
    // insert
    //let student = await Student.create({ firstName: "Mario" });
    //console.log(student);
    // find
    //let student = await Student.find({ firstName: "test" });
    //const found = await Student.findById("xxxx");
    //const deleted = await Student.findByIdAndDelete("xxxx");
    //const updated = await Student.findByIdAndUpdate("xxxx", {});

    // populaet
    const school = await School.create({ name: "My school" });
    const student = await Student.create({
      firstName: "Gino",
      school: school._id,
    });
    const match = await Student.findById(student._id).populate("school").exec();
    console.log(match);
  })
  .catch((ex) => {
    console.error(ex);
  });
