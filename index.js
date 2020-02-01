const express = require('express')
const server = express()

const porta  = 6363
const projects = []

let requestCount =0
server.use(express.json());

server.use((req, res, next) => {

  requestCount++

  console.time('Request')
  console.log(`Quantidade de requisições recebidas: ${requestCount}; Método: ${req.method}; URL: ${req.url};`)
  
  next();

  console.timeEnd('Request')
});

function checkProjectInArray (req, res, next){
  let i

  for(i = 0; i < projects.length;i++){      
      
    if(projects[i].id == req.params.id){
      
      return next()     
    }

  }    
    return res.status(400).json({error: 'Project does not exists'})  
}
  
server.get('/', (req, res) =>{
  res.status(200).send('Hello')
})

server.post('/projects', (req, res) =>{
  
  console.log(req.body)

  const {id} = req.body
  const {title} = req.body
  const tasks = []

  const novoProjeto= {
    id, 
    title,
    tasks
  }

  projects.push(novoProjeto)  

  res.status(200).json(novoProjeto)

})

server.put('/projects/:id', checkProjectInArray,(req, res) => {
  let i 
  const {title} = req.body
  
  for(i = 0; i < projects.length;i++){      
      
    if(projects[i].id == req.params.id){
      projects[i].title = title        
      return res.status(200).json(projects[i].title)     
    }
  }  
})

server.post('/projects/:id/tasks',checkProjectInArray, (req, res) => {
  let i 
  const {title} = req.body
  
  let aux = []
  
  for(i = 0; i < projects.length;i++){      
      
    if(projects[i].id == req.params.id){

      aux = projects[i].tasks
      aux.push(title)
      projects[i].tasks=aux

      return res.status(200).json(projects[i])     
    }
  }  
})

server.delete('/projects/:id', checkProjectInArray, (req, res) => {
  let i 
    
  for(i = 0; i < projects.length;i++){      
      
    if(projects[i].id == req.params.id){
      projects.splice(i, 1)       
      return res.status(200).send()     
    }
  }
})

server.get('/projects', (req, res) =>{
  res.status(200).send(projects)
})

  
server.listen(porta, ()=>{
  console.log(`Ouivindo na porta ${porta}`)
})


  

  
