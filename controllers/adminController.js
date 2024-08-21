const User = require("../models/clientModel");
const CardPaymant = require("../models/cardPaymantModel");
const Comment =require("../models/commentModel")
const { model } = require('mongoose');

const getAllCard=async (req,res,next)=>{
    try {
        const card = await CardPaymant.find();

        res.status(200).json({ card });
    } catch (error) {
        next(error);
    }
}

const createCardPymant=async (req,res,next)=>{
    try {
        const{type,OneMon,TwoMon,ThreeMon} = req.body
        const newCard = new CardPaymant({
            type,
            OneMon,
            TwoMon,
            ThreeMon
        });

        await newCard.save();
        res.status(201).json({ message: 'Card created successfully', Card: newCard });
    } catch (error) {
        next(error);
    }
}

const editeCardPymant=async (req,res,next)=>{
    try {
        const{OneMon,TwoMon,ThreeMon} = req.body
        const cardPymantId = req.params.cardPymantId;

        const updatedCard = await CardPaymant.findByIdAndUpdate(cardPymantId, { OneMon,TwoMon,ThreeMon }, { new: true });

        if (!updatedCard) {
            return res.status(404).json({ message: 'Card Paymant not found' });
        }

        res.status(200).json({ message: 'Card updated successfully', CardPymant: updatedCard });
    } catch (error) {
        next(error);
    }
}

const getAllUser=async (req,res,next)=>{
    try {
        const users = await User.find({role:"User"});
        res.status(200).json({ users });
    } catch (error) {
        next(error)
    }
}
const deleteUser=async (req,res,next)=>{
    try {
        const userId = req.params.UserID;

        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
}

const getAllStore=async (req,res,next)=>{
    try {
        const stores = await User.find({role:"Store"});
        res.status(200).json({ stores });
    } catch (error) {
        next(error)
    }
}

const accaptPermisson=async (req,res,next)=>{
    try {
        const StoreID  = req.params.StoreID 
        const permissions = 1

        const updatedpermissions = await User.findByIdAndUpdate(StoreID, { permissions }, { new: true });

        if (!updatedpermissions) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Accapt permissions successfully' });
    } catch (error) {
        next(error);
    }
}
const denyPermisson=async (req,res,next)=>{
    try {
        const StoreID  = req.params.StoreID 
        const permissions = 0

        const updatedpermissions = await User.findByIdAndUpdate(StoreID, { permissions }, { new: true });

        if (!updatedpermissions) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Deny permissions successfully' });
    } catch (error) {
        next(error);
    }
}

const getAllcomments=async (req,res,next)=>{
    try {
        const comment = await Comment.find();
        res.status(200).json({ comment });
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllCard,
    getAllUser,
    deleteUser,
    getAllStore,
    accaptPermisson,
    denyPermisson,
    getAllcomments,
    editeCardPymant,
    createCardPymant,
};