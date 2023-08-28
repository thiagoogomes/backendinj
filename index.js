import express from 'express';
import cors from 'cors'
import rotaIntegrante from "./Routes/rotaIntegrante.js";
import rotaEvento from "./Routes/rotaEvento.js";
import rotaMusica from './Routes/rotaMusica.js';
import rotaMaterial from './Routes/rotaMaterial.js';
import rotaFuncao from './Routes/rotaFuncao.js';

const app = express();
app.use(cors({origin:"*"}));
app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.use('/', function(req,res){
    res.send('Teste')
})

const port=4041;  
const hostname = '0.0.0.0';

app.listen(port, hostname, ()=>{
    console.log("Backend ouvindo:"  + hostname + ':' + port);
});

//app.listen(3040, 'localhost', ()=>{
//    console.log('backend ouvindo em http://localhost:3040');
//});

