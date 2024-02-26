const { MongoClient } = require('mongodb');
const express = require('express');
const cors = require('cors');

const app = express();
const FIRST = 'mongodb://localhost:27017';
const PORT = process.env.PORT || 3000;
const second = 'SEC';

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log('Listening on http://localhost:${PORT}...');
});

app.get('/app/profile',(req, res)=> paps(req, res));
app.get('/app/profile/Extracting',(req, res)=> paya(req, res));
app.get('/app/profile/Retrival',(req, res)=> pap(req, res));
app.get('/app/profile/Sorting',(req, res)=> papa(req, res));

function paps(req, res) {
    MongoClient.connect(FIRST)
    .then((client) => {
        const db = client.db(second);
        const star = db.collection('course');

        star.find({})
            .toArray()
            .then((result) => {
                res.json(result);
        })
        .catch((err) => {
            console.error('Error has occured');
        })
        .finally(() => {
            client.close();
        });
    })
    .catch((err) => {
        console.error('Error cannot connect to Database',err);
        res.status(500).send('Internal Server Error');
    });
}

function paya(req, res) {
    MongoClient.connect(FIRST)
    .then((client) => {
        const db = client.db(second);
        const orange = db.collection('course');

        orange.find({})
            .toArray()
            .then((result) => {
                
                const courses = [];
                result.forEach(year => {
                    Object.keys(year).forEach(semester => {
                        if (Array.isArray(year[semester])) {
                            year[semester].forEach(course => {
                                courses.push({
                                    name: course.description,
                                    specialization: course.tags[1] 
                                });
                            });
                        }
                    });
                });
                res.json(courses);
            })
        .catch((err) => {
            console.error('Error has occured', err);
            res.status(500).send('Internal Server Error');
        })
        .finally(() => {
            client.close();
        });
    })
    .catch((err) => {
        console.error('Error cannot connect to Database', err);
        res.status(500).send('Internal Server Error');
    });
}

function pap(req, res) {
    MongoClient.connect(FIRST)
    .then((client) => {
        const db = client.db(second);
        const apple = db.collection('course');

        apple.find({})
            .toArray()
            .then((result) => {
                
                const courses = [];
                result.forEach(year => {
                    Object.keys(year).forEach(semester => {
                        if (Array.isArray(year[semester])) {
                            year[semester].forEach(course => {
                                
                                if (course.tags.includes("BSIS") || course.tags.includes("BSIT")) {
                                    courses.push({
                                        name: course.description,
                                        specialization: course.tags.includes("BSIS") ? "BSIS" : "BSIT"
                                    });
                                }
                            });
                        }
                    });
                });
                res.json(courses);
            })
        .catch((err) => {
            console.error('Error has occured', err);
            res.status(500).send('Internal Server Error');
        })
        .finally(() => {
            client.close();
        });
    })
    .catch((err) => {
        console.error('Error cannot connect to Database', err);
        res.status(500).send('Internal Server Error');
    });
}

function papa(req, res) {
    MongoClient.connect(FIRST)
    .then((client) => {
        const db = client.db(second);
        const alien = db.collection('course');

        alien.find({})
            .toArray()
            .then((result) => {
                const allCourses = result.reduce((acc, yearObj) => {
                    Object.values(yearObj).forEach(courses => {
                        acc = acc.concat(courses);
                    });
                    return acc;
                }, []);

                const sortedCourses = allCourses.sort((a, b) => {
                    const descriptionA = a.description || ''; 
                    const descriptionB = b.description || ''; 
                    return descriptionA.localeCompare(descriptionB);
                });
                

                res.json(sortedCourses);
            })
            .catch((err) => {
                console.error('Error has occurred', err);
                res.status(500).send('Internal Server Error');
            })
            .finally(() => {
                client.close();
            });
    })
    .catch((err) => {
        console.error('Error cannot connect to Database', err);
        res.status(500).send('Internal Server Error');
    });
}


