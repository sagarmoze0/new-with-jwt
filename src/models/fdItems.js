const mongoose=require('mongoose')
const fdItemSchema=new mongoose.Schema(
    {
        rating: { type: Number, min: 1, max: 10},
        text: {type: String, required: ''}
    },
    {
        timestamps: true
    }
)
const FDItemModel=mongoose.model('fditem',fdItemSchema)
module.exports=FDItemModel