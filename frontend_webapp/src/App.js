import * as React from 'react';
import './App.css';
import { Box, Button, Card, CardContent, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';

function App() {
  const [language, setLanguage] = React.useState('');
  const [confidenceScores, setConfidenceScores] = React.useState('');
  const [sentiment, setSentiment] = React.useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const body = {
      inputText: data.get('text'),
      inputLanguage: language
    }

    sentimentAnalysis(body);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const sentimentAnalysis = (body) => {
    fetch('http://28b4fc65-bdba-45c0-a385-f562df625d7b.cloudapp.net/sentiment-analysis', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        setValues(data.documents);
        console.log(data.documents);
      })
      .catch(error => console.log(error))
  };

  const setValues = (response) => {
    if (response.length > 0) {
      setConfidenceScores(response[0].confidenceScores);
      setSentiment(response[0].sentiment);
    }
    else {
      setConfidenceScores(null);
      setSentiment('Analysis failed.');
    }
  }

  return (
    <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center" style={{ maxWidth: '100%' }}>
      <Grid item>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }} >
          <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
            <Grid item>
              <Typography variant="h5">
                Sentiment Analysis with Azure Cognitive Service
              </Typography>
            </Grid>
            <Grid item>
              <FormControl>
                <TextField
                  name="text"
                  required
                  id="text"
                  placeholder="Please enter your text here to analyse."
                  label="Text Area"
                  style={{ width: '500px' }}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel id="language-label">Language</InputLabel>
                <Select
                  labelId="language-label"
                  id="language"
                  value={language}
                  label="Language"
                  onChange={handleLanguageChange}
                  style={{ width: '200px' }}
                >
                  <MenuItem value={'en'}>English</MenuItem>
                  <MenuItem value={'tr'}>Turkish</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained">Run Sentiment Analysis</Button>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid container item spacing={2} direction="column" alignItems="center" justifyContent="center">
        <Grid item>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
                <SentimentVeryDissatisfiedIcon />
                <Typography variant="body2" style={{ marginLeft: '5px' }}>
                  Negative Score: {confidenceScores.negative}
                </Typography>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
                <SentimentNeutralIcon />
                <Typography variant="body2" style={{ marginLeft: '5px' }}>
                  Neutral Score: {confidenceScores.neutral}
                </Typography>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
                <SentimentVerySatisfiedIcon />
                <Typography variant="body2" style={{ marginLeft: '5px' }}>
                  Positive Score: {confidenceScores.positive}
                </Typography>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Box sx={{ width: '100%', maxWidth: 500 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
              <Typography variant="body2">
                Sentiment Result : 
              </Typography>
              {
                sentiment == 'positive' ?
                  <SentimentVerySatisfiedIcon />
                  : sentiment == 'negative' ? <SentimentVeryDissatisfiedIcon /> 
                  : sentiment == '' ? '' :
                  <SentimentNeutralIcon />
              }
            </div>
          </Box>
        </Grid>
      </Grid>
    </Grid >
  );
}

export default App;
