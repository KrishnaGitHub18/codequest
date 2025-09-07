import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: String,
  que: String,
  testcases: [
    {
      input: [mongoose.Schema.Types.Mixed], 
      output: mongoose.Schema.Types.Mixed
    }
  ]
});

const Question = mongoose.model("ques", questionSchema);
export default Question;
