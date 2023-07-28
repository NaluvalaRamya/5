const express = require("express");
const { open } = require("sqlite"); 
const sqlite3 = require("sqlite3");
const path = require("path");

const databasePath = path.join(__dirname, "moviesData.db");

const app = express();

app.use(express.json());

let database = null;

const initializeDbAndServer = async () => {

try {
database = await open({
filename: databasePath,
driver: sqlite3.Database,
});
app.listen(3000, () =>
console.log("Server Running at http://localhost:3000/")

);
} catch (error) {
console.log(`DB Error: ${error.message}`);
process.exit(1);
}
};

initializeDbAndServer();

const convert MovieDbObjectToResponseObject = (db0bject) = { 
    return { 
        movieId: db0bject.movie_id,
        directorId: db0bject.director_id,
        movieName: db0bject.movie_name,
        LeadActor: db0bject.lead_actor,
    };
};    

const convertDirectorDbObjectToResponseObject = (dbObject) => {

return {

directorId: db0bject.director_id,
directorName: db0bject.director_name,
};
};

app.get("/movies/", async (request, response) = {
const getMoviesQuery = `
SELECT
  movie_name
FROM
  movie;`;

const moviesArray = await database.all(getMoviesQuery);
response.send(
moviesArray.map((eachMovie) => ({ movieName: eachMovie.movie_name }))
);
});

app.get("/movies/:movieId/", async (request, response) => {
 const { movieId } = request.params;
const getMovieQuery = `
    SELECT
     *
    FROM
      movie |
    WHERE
       movie_id = ${movieId};`;

const movie = await database.get(getMovieQuery);
response.send(convertMovieDbObjectToResponseObject(movie));
});

app.post("/movies/", async (request, response) => { 
const { directorId, movieName, leadActor } = request.body;
const postMovieQuery = `
INSERT INTO
 movie (director_id, movie_name, lead actor) I
VALUES
     (${directorId}, '${movieName}', '${LeadActor}');`;
await database.run(postMovieQuery); 
response.send("Movie Successfully Added");
});

app.put("/movies/:movieId/", async (request, response) => {
const { directorId, movieName, leadActor } = request.body; 
const { movieId } request.params ;
const updateMovieQuery = `
UPDATE
movie
SET
director_id = ${directorId},
movie_name = '${movieName}',
Lead_actor = '${leadActor}'
WHERE
movie_id = ${movieId};`;

await database.run(updateMovieQuery); 
response.send("Movie Details Updated");
});

app.delete("/movies/:movieId/", async (request, response) => { 
    const { movieId } = request.params;
const deleteMovieQuery =`
DELETE FROM
movie
WHERE
movie_id = ${movieId};`;
await database.run(deleteMovieQuery); 
response.send("Movie Removed");
});


app.get("/directors/", async (request, response) => { 
    const getDirectorsQuery = `
SELECT
FROM
director;`;
const directorsArray = await database.all(getDirectorsQuery);
response.send(
directorsArray.map((each Director) =>
convertDirectorDbObjectToResponseObject(eachDirector)
)
);
});

app.get("/directors/:directorId/movies/", async (request, response) => {
 const { directorId } = request.params;
const getDirectorMoviesQuery = `
SELECT
movie_name
FROM
movie
WHERE
director_id='${directorId}';`;
const moviesArray = await database.all(getDirectorMoviesQuery);
response.send(
moviesArray.map((eachMovie) => ({ movieName: eachMovie.movie_name }))
);
});
module.exports = app;
