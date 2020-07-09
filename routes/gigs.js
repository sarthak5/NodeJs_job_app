const express = require('express')
const router = express.Router()
const db = require('../config/database')
const Gig = require('../models/Gig')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

router.get('/', (req, res) => {
    Gig.findAll()
        .then(gigs => {
            res.render('gigs' , {
                gigs : gigs
            })
        })
        .catch(err => console.log(err))
})

router.get('/add' , (req,res)=>res.render('add'))
router.post('/add', (req, res) => {
    let { title , technologies , budget , description , contact_email} = req.body
    let errors = []

    if(!title)
    {
        errors.push({text : 'Please enter a title'})
    }
    if(!technologies)
    {
        errors.push({text : 'Please enter some technologies'})
    }
    if(!description)
    {
        errors.push({text : 'Please enter a description'})
    }
    if(!contact_email)
    {
        errors.push({text : 'Please enter a contact email'})
    }

    if(errors.length > 0)
    {
        res.render('add' , {
            errors,
            title,
            technologies,
            description,
            budget,
            contact_email
        })
    }
    else
    {
        if(!budget)
        {
            budget = "Unknown"
        }
        else
        {
            budget = `$${budget}`
        }

        technologies = technologies.toLowerCase().replace(/ , /g , ',')
        Gig.create({
            title : title,
            technologies : technologies,
            budget : budget,
            description : description,
            contact_email : contact_email
        })
            .then(gig => res.redirect('/gigs'))
            .catch(err => console.log(err))
    }

})

router.get('/search' , (req,res)=>{
    let {term} = req.query
    term = term.toLocaleLowerCase()
    Gig.findAll({where : {technologies : {[Op.like]: '%' + term + '%'}}})
        .then(gigs=>res.render('gigs' , {gigs}))
        .catch(err=>console.log(err))
})

module.exports = router