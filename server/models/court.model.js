import {model,Schema} from "mongoose"
const CourtSchema = new Schema({
    name: {
        type: String,
        required:true
    },
   centerId:{
        type: Schema.Types.ObjectId,
        ref: "Center"
    },
    sportId:{
        type: Schema.Types.ObjectId,
        ref: "Sport"
    }
},{
    timestamps:true
})
const Court = model("Court",CourtSchema)
export default Court