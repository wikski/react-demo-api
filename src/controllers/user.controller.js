const { firestore } = require('firebase')

const db = require('./../firestore')

module.exports = {
    
    createUser: (req, res) => {
        
        // validate
        if(!req.body) return res.nope('empty post')
        
        let doc

        if(req.body.id){
            
            doc = db.collection('users').doc(req.body.id)

        } else {            

            doc = db.collection('users').doc()
            req.body.id = doc.id
        }        
        
        req.body.updatedAt = firestore.FieldValue.serverTimestamp()
        doc.set(req.body).then(() => {
            
            return res.yep('User updated')

        }).catch(err => res.nope(err))
    },
    
    getUsers: (req, res) => {
        
        db.collection('users').get().then(snapshot => {
            
            if(snapshot.empty) return res.yep([])
            
            snapshot = snapshot.docs.map(item => Object.assign(item.data(), { id: item.id }))

            return res.yep(snapshot)

        }).catch(err => console.error(err))        
    },    

    getUser: (req, res) => {
        
        db.collection('users').doc(req.params.userId).get().then(snapshot => {
            
            return res.yep(Object.assign({}, snapshot.data(), { id: snapshot.id }))
        
        }).catch(err => console.error(err))
    },
}