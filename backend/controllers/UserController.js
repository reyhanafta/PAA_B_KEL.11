import { where } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

export const getUsers = async(req, res) => {
    try {
        const response = await User.findAll({
            attributes:['id', 'name','email']
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}


export const register = async(req, res) => {
    const {name, email, password, confPassword} = req.body;
    if(password !== confPassword) {return res.status(400).json({msg:"Password dan Konfirmasi Password tidak cocok"});}
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Registrasi Berhasil"});
    } catch (error) {
        console.log(error.message);
    }
}

export const login = async(req, res) => {
    try {
        const user = await User.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Password Salah"});

        const id = user[0].id;
        const name = user[0].name;
        const email = user[0].email;

        const accessToken = jwt.sign({id, name, email}, process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: '20s'
        });

        const refreshToken = jwt.sign({id, name, email}, process.env.REFRESH_TOKEN_SECRET,{
            expiresIn: '1d'
        });

        await User.update({refresh_token: refreshToken},{
            where:{
                id: id
            }
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly:true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ accessToken });
    } catch (error) {
        res.status(404).json({msg:"Email tidak ditemukan"});
    }
}

export const logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await User.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const id = user[0].id;
    await User.update({refresh_token: null},{
        where:{
            id: id
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}

export const getUsersById = async(req, res) => {
    try {
        const response = await User.findOne({
            where: {
                id: req.params.id
            }
    });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getTiketById = async(req, res) => {
    try {
        const response = await bus.findOne({
            where: {
                id: req.params.id
            }
    });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}


export const updateUser = async(req, res) => {
    try {
        await User.update(req.body, {
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Akun sudah diperbarui"});
    } catch (error) {
        console.log(error.message);
    }
}


export const deleteUser = async(req, res) => {
    try {
        await User.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Akun sudah dihapus"});
    } catch (error) {
        console.log(error.message);
    }
}
export const deleteTiket = async(req, res) => {
    try {
        await User.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Tiket sudah hangus"});
    } catch (error) {
        console.log(error.message);
    }
}