import { app } from './index.js';
import connectDB from './db/index.js';
connectDB()
  .then(() => {
    app.on('error', (error) => {
      console.log('Error', error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(
        `Server running on port http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log('mongo db connection failed', err);
  });
