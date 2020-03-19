import dotenv from 'dotenv';

dotenv.config();

import app from './App';

const { PORT } = process.env;

app.listen(PORT || 5000, () => console.log(`Server running on port ${PORT}`));