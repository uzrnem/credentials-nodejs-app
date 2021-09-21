module.exports = (app) => {
    const credentials = require('./credential.controller.js');

    // Create a new Note
    app.post('/credentials', credentials.create);

    // Retrieve all Notes
    app.get('/credentials', credentials.findAll);

    // Retrieve a single Note with noteId
    app.get('/credentials/:credentialId', credentials.findOne);

    // Update a Note with noteId
    app.put('/credentials/:credentialId', credentials.update);

    // Delete a Note with noteId
    app.delete('/credentials/:credentialId', credentials.delete);
}
