var note = require("../db/notes")


const fs = require("fs");
const util = require("util");
const notes = require("../db/notes");
const writeFileAsync = util.promisify(fs.writeFile);

module.exports = function(app) {

    app.get("/api/notes", function(req, res) {
        res.json(notes);
    });

    app.post("/api/notes", function(req, res) {
    

        let newNote = req.body;

        let lastId = notes[notes.length - 1]["id"];
        let newId = lastId + 1;
        newNote["id"] = newId;
        
        console.log("Req.body:", req.body);
        notes.push(newNote);

        writeFileAsync("../db/db.json", JSON.stringify(notes)).then(function() {
            console.log("db.json has been edited");
        });

        res.json(newNote);
    });

    
    app.delete("/api/notes/:id", function(req, res) {
        

        console.log("Req.params:", req.params);
        let chosenId = parseInt(req.params.id);
        console.log(chosenId);


        for (let i = 0; i < notes.length; i++) {
            if (chosenId === notes[i].id) {
                note.splice(i,1);
                
                let noteJSON = JSON.stringify(notes, null, 2);

                writeFileAsync("../db/notes.js", noteJSON).then(function() {
                console.log ("Note had been deleted.");
            });                 
            }
        }
        res.json(notes);
       
    });
        
};
