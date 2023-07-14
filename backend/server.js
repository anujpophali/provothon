const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const app = express();

const port = 5000;

const API_KEY = "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";

const config = new Configuration({
    apiKey: API_KEY,
})
  
const openai = new OpenAIApi(config);
const cors = require("cors")
app.use(cors("*"))

app.use(express.json());
app.get("/",(req,res)=>{
  try{
    // console.log(res)
    res.send("hi")
  }
  catch(error){
    console.log(error)
  }
  
})

app.post('/analyze', async (req, res) => {

  const code = req.body.code;
  console.log(code)
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt:`You are a software architect, as a software architect for implementing high quality python program, your goal is to analyze the code and provide detailed code review with positive points and improvement areas for this code: ${code}`,
    temperature: 0,
    max_tokens: 182,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["###"],
  })
    .then((response) => {
      // Extract feedback from OpenAI response
      const feedback = response.choices[0].text;

      // Send feedback back to the client
      res.json({ feedback });
    })
    .catch((error) => {
      console.error('Error analyzing code:', error);
      res.status(500).json({ error: 'An error occurred while analyzing the code.' });
    });
});



app.listen(5000,()=> {
    console.log(`server is listening at port ${port}`)
})
