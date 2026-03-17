import express from 'express';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Crypto-X API is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
