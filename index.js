//setting express
const express = require('express');
//this is a path module which we will be using for deciding the path for view/template
const path = require('path');
//port to mandatory hai url ke liye
const port = 8000;
//mongoose ek odm hai jo ki ek layer hai mongodb per jisse hume mongodb ki language seekhni ki jarurat nahi hai isse hum js likhkar database use kar sakte hai
const db = require('./config/mongoose');
//isme schema hai
const Contact = require('./models/contact');
//firing the express
const app = express();
//setting the template engine ejs
app.set('view engine', 'ejs');
//setting the path for views
app.set('views', path.join(__dirname, 'views'));
//this is a middle ware
app.use(express.urlencoded());
//assets is a folder in which we have some static files which we can use any where like css or js
app.use(express.static('assets'));
app.get('/home', function (req, res) {
                    return res.render('home' , {title : "Home"});
})
app.get('/profile', function (req, res) {
                    return res.render('profile' , {title: "My Profile"});
})
app.get('/contact', function (req, res) {
                    // fetching the data from the database using mongodb
                    Contact.find({}, function (err, contacts) {
                                        if (err) {
                                                            console.log('Error in fetching contacts from db');
                                                            return;
                                        }
                                        return res.render('contact', {
                                                            title: "My Contacts",
                                                            contact_list: contacts
                                        });
                    });
                    // return res.render('contact', {
                    //                     title: "My Contacts",
                    //                     contact_list : contactList
                    // });
});
app.get('/delete-contact/:id', function (req, res) {
                    let id = req.params.id;
                    Contact.findByIdAndDelete(id, function (err) {
                                        if (err) {
                                                            console.log('error in deleting an object from database');
                                                            return;
                                        }
                                        return res.redirect('back');
                    });
                    // console.log(req.params);
                    // let phone = req.params.phone;
                    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);
                    // if (contactIndex != -1) {
                    //                     contactList.splice(contactIndex, 1);
                    // }
                    // return res.redirect('back');
});
app.post('/create-contact', function (req, res) {
                    // contactList.push(req.body)
                    // using database
                    Contact.create({
                                        name: req.body.name,
                                        phone: req.body.phone
                    }, function (err, newContact) {
                                        if (err) { console.log('error in creating a contact!'); return; }
                                        console.log('*******', newContact);
                                        return res.redirect('back');
                    });

                    
})


app.listen(port, function (err) {
                    if (err) {
                    console.log("Error is running in the server", err);
                    }
                    console.log("Yup! Server is running on port ", port);
});




// faltu code
// var contactList = [
//                     {
//                     name: "Bhavya Tiwari",
//                     phone: "1111111111"
//                     },
//                     {
//                     name: "Harsh Tiwari",
//                     phone: "3333333333"
//                     },
//                     {
//                     name: "Vandana Tiwari",
//                     phone: "8989898989"
//                     }
// ]
