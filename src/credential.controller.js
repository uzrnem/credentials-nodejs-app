const mongoose = require('mongoose');

var keywordSchema = new mongoose.Schema({
    key: String,
    value: String
});

const CredentialSchema = mongoose.Schema({
    name: String,
    username: String,
    website: String,
    email: String,
    password: String,
    keywords: [ keywordSchema ]
}, {
    timestamps: true
});

// Create and Save a new Credential
exports.create = (req, res) => {
    var Credential = mongoose.model(req.params.model, CredentialSchema);

    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Credential data can not be empty"
        });
    }

    // Create a Credential
    const credential = new Credential(req.body);

    // Save Credential in the database
    credential.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Credential."
        });
    });
};

// Retrieve and return all Credentials from the database.
exports.findAll = (req, res) => {
    var Credential = mongoose.model(req.params.model, CredentialSchema);
    Credential.find().collation({locale: "en" }).sort({name: 1})
    .then(credentials => {
        res.send(credentials);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Credentials."
        });
    });
};

// Find a single Credential with a credentialId
exports.findOne = (req, res) => {
    var Credential = mongoose.model(req.params.model, CredentialSchema);
    Credential.findById(req.params.credentialId)
    .then(credential => {
        if(!credential) {
            return res.status(404).send({
                message: "Credential not found with id " + req.params.credentialId
            });
        }
        res.send(credential);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Credential not found with id " + req.params.credentialId
            });
        }
        return res.status(500).send({
            message: "Error retrieving credential with id " + req.params.credentialId
        });
    });
};

// Update a credential identified by the credentialId in the request
exports.update = (req, res) => {
    var Credential = mongoose.model(req.params.model, CredentialSchema);
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "credential data can not be empty"
        });
    }

    // Find credential and update it with the request body
    Credential.findByIdAndUpdate(req.params.credentialId, req.body, {new: true})
    .then(credential => {
        if(!credential) {
            return res.status(404).send({
                message: "credential not found with id " + req.params.credentialId
            });
        }
        res.send(credential);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "credential not found with id " + req.params.credentialId
            });
        }
        return res.status(500).send({
            message: "Error updating credential with id " + req.params.credentialId
        });
    });
};

// Delete a credential with the specified credentialId in the request
exports.delete = (req, res) => {
    var Credential = mongoose.model(req.params.model, CredentialSchema);
    Credential.findByIdAndRemove(req.params.credentialId)
    .then(credential => {
        if(!credential) {
            return res.status(404).send({
                message: "credential not found with id " + req.params.credentialId
            });
        }
        res.send({message: "credential deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "credential not found with id " + req.params.credentialId
            });
        }
        return res.status(500).send({
            message: "Could not delete credential with id " + req.params.credentialId
        });
    });
};
