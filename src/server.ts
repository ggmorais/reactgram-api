import dotenv from 'dotenv';

dotenv.config();

import app from './App';

app.listen(process.env.PORT || 5000);