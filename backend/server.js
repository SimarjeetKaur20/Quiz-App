const express = require('express');
const app = express();
const cors = require('cors');
const quizRoutes = require('./routes/quiz');

app.use(cors());
app.use('/api/quiz', quizRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
