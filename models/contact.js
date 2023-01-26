const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
                    name:{
                                        type:String,
                                        required:true
                    },
                    phone:{
                                        type:String,
                                        required:true
                    }
})
//we need to define in Model what would be name of a collection for this Schema!!
const Contact = mongoose.model('Contact' , contactSchema);
module.exports = Contact;