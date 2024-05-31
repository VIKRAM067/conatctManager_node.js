const asyncHandler = require("express-async-handler");

const Contact= require("../models/contactModel"); // This is from  ContactModel 


//@desc this gets all contacts
//@route /api/contacts
//@access private
const allContacts = asyncHandler( async (req,res)=>{

/* here we are gettings  the contacts through "userId" as each user diff userId and diff contacts. 
here the 'Contact.find({userId : req.user.id})' fetching by userId , 
where the req.user.id given by validation token phase.*/

    const fetchAllContacts = await Contact.find({userId : req.user.id}); 
    
    res.status(200).json({fetchAllContacts}  );
});



//@desc this gets specific contacts using id 
//@route /api/contact/id
//@access private
const getContact = asyncHandler( async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
        {
            res.status(404);
            throw new Error("contact not found");
        }
    res.status(200).json({contact});
});




//@desc this is creating a new contact
//@route /api/contact
//@access private
const postContact = asyncHandler(async (req,res)=>{
    console.log("the request body is:",req.body);
    const {name , phone , email}=req.body;
    if(!name || !phone || !email)
        {
            res.status(400);
            throw new Error("Fill all the fields");
        }

    const createContact = await Contact.create(
        {
            name,
            phone,
            email,
            userId:req.user.id,
        });
    res.status(201).json({createContact});
})




//@desc this is updating the contact using id
//@route /api/contacts/id
//@access private
const putContact =asyncHandler( async (req,res)=>{
    
    const contact = await Contact.findById(req.params.id);
    if(!contact)
        {
            res.status(404);
            throw new Error("contact not found");
        }
    if(contact.userId.toString() !== req.user.id) // this is for user not to change another users contacts
        {
            res.status(403)
            throw new Error("contact can't be changed, This is not your contact")
        }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    ); 
    res.status(200).json({updatedContact});
});




//@desc this gets deleting of the contact using id
//@route /api/contacts/id
//@access private
const deleteContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact)
        {
            res.status(404);
            throw new Error("contact not found");
        }

        if(contact.userId.toString() !== req.user.id) // this is for user not to delete another users contacts
        {
            res.status(403)
            throw new Error("contact can't deleted, This is not your contact")
        }    
        
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json({message:"deleted"} );
});

module.exports = {allContacts,getContact,postContact,putContact,deleteContact};
