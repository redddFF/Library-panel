import mongoose from "mongoose" ; 
import mongoosePaginate from "mongoose-paginate" ;

let bookSchema=new mongoose.Schema({
    title:String,
    author:String,
}) ; 
bookSchema.plugin(mongoosePaginate);
const Book=mongoose.model("Book",bookSchema);
export default Book ; 