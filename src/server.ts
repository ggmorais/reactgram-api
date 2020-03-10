import dotenv from 'dotenv';
import app from './App';

dotenv.config();

app.listen(process.env.PORT || 5000);