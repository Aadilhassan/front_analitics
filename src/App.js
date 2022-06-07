import {Line_ch} from './components/Line';
import axios from 'axios';
import React from 'react';
import {Web} from './components/Web'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, NavDropdown, Nav , Form, Col, Row} from 'react-bootstrap';
function App() {
const [res, SetRes] = React.useState([]);
const [intensity, SetIntensity] = React.useState([])
const [end_year , SetYear] = React.useState([])
const [relevance, Setrelevance] = React.useState([])
const [likelihood, SetLikelihood] = React.useState([])
const [filt, SetFilt] = React.useState(res.data)
const [cont, SetCont] = React.useState('')
const [pest, SetPest] = React.useState('')
const [countries, SetCountries] = React.useState([])
const [pestles, SetPestles] = React.useState([])
const [real, SetReal] = React.useState([])
const [base, SetBase] = React.useState('')
//api call 
React.useEffect(() => {
axios.get(`https://api.aadilhassan.repl.co/`).then(real => {
  let l_country = real.data.filter(el => el.country).map(val => val.country);
  let country = [...new Set(l_country)];
  SetCountries(country)

  let l_pestles = real.data.filter(el => el.pestle).map(val => val.pestle);
  let pestles = [...new Set(l_pestles)];
  SetPestles(pestles)

})
}, []); 


React.useEffect(() => {

  axios.get(`https://api.aadilhassan.repl.co/count?${cont}&${pest}`).then( res=> {
  //use res to update current state
  SetRes(res.data)

  console.log(filt)
SetFilt(res.data)
  let intensity = res.data.filter(el => el.intensity && el.end_year).map(val => val.intensity);
  // console.log('intnt'+intensity)
  let  end_year = res.data.filter(el => el.intensity && el.end_year).map(val => val.end_year);
  // console.log('years'+ end_year)
  let relevance = res.data.filter(el => el.relevance && el.end_year).map(val => val.relevance);
  let likelihood = res.data.filter(el => el.likelihood && el.end_year).map(val => val.likelihood);
// console.log(intensity)
 //data shorting------------------------------

//1) combine the arrays:
var lists = [];
for (var j = 0; j < end_year.length; j++) 
  lists.push({'end_year': end_year[j], 'intensity': intensity[j], 'relevance': relevance[j], 'likelihood': likelihood[j]});

//2) sort:
lists.sort(function(a, b) {
return ((a.end_year < b.end_year) ? -1 : ((a.end_year == b.end_year) ? 0 : 1));
//Sort could be modified to, for example, sort on the age 
// if the name is the same.
});


//3) separate them back out:
for (var k = 0; k < lists.length; k++) {
end_year[k] = lists[k].end_year;
intensity[k] = lists[k].intensity;
relevance[k] = lists[k].relevance;
likelihood[k] = lists[k].likelihood;
}

SetYear(end_year)
SetIntensity(intensity)
Setrelevance(relevance)
SetLikelihood(likelihood)
//console.log('end-year'+end_year)
//console.log('intensity'+ intensity)
// --------------end------------------------




 
})

}, [cont,pest]); 

const style = {
 width: '40%',
  // Adding media query..
  '@media (max-width: 500px)': {
  width : '100%'
  },
};

  return (
    <div className="App">

<Navbar bg="light" style={{backgroundColor: "#071740", position: "sticky"}} expand="lg" fixed='top'>
  <Container style={{ float: 'right'}}>
    <Navbar.Brand href="#home">Analitics</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link style={{marginLeft: 40, verticalAlign: 'centre'}} href="#home">Home</Nav.Link>

     
        <Container className="justify-content-end">
 Select Country:
     <Form.Select   onChange={(e)=> SetCont(`country=${e.target.value}`)}>
      <option></option>
        {countries.map(option => <option key={option} value={option}>{option}</option>)}
</Form.Select></Container><Container>
  Select pestle:
    <Form.Select  onChange={(e) => SetPest(`pestle=${e.target.value}`)}>
      <option></option>
        {pestles.map(option => <option key={option} value={option}>{option}</option>)}
</Form.Select>
      
  </Container>
      

      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>


<Container style={{width: `100vw`}}>
<Container style={{width: `100vw`}}><Line_ch res={res} intensity={intensity} relevance={relevance} end_year={end_year} likelihood={likelihood}/>
</Container>
    <Container style={style}><Web res={res} intensity={intensity} relevance={relevance} end_year={end_year} likelihood={likelihood}/>
 </Container>


   
 </Container>
   </div>
  );
}

export default App;
