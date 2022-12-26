import { useState, useEffect } from 'react'
import 'react-datalist-input/dist/styles.css';
import './index.css'
import avail from './Data'
import DatalistInput from 'react-datalist-input';
import Myimg from './TranslateYoMama-logos_black.png'


function App() {
        const [search, setSearch] = useState('cryptic')
        const [translate, setTranslate] = useState('')
        const [synonym, setSynonym] = useState([])
        const [doSearch, setDoSearch] = useState('');
        const [lang, setLang] = useState('hi')
        // const [isTranslate, setIsTranslate] = useState(true)
        
        const langArray = Object.keys(avail.translation).map((key) => [avail.translation[key].name, key ]);
        const forList = langArray.map((item, key) => ({id: key, value: item[0]}))
        const convert = new Map(langArray)


        // console.log(convert)

        
        function handleChange(event){
                setSearch(event.target.value)
        }

        function sub(){
                setDoSearch(prevDoSearch=>{
                        return prevDoSearch == search ? prevDoSearch+' ' : search
                })
        }

        function handleLang(event){
                console.log(event.value)
                setLang(convert.get(event.value))
        }

        // function ChangeMode(){
        //         setIsTranslate(prevState=>!prevState)
        // }
        
        useEffect(()=>{
                const options = {
	        method: 'POST',
	        headers: {
		        'content-type': 'application/json',
		        'X-RapidAPI-Key': '6f741d35ebmshdc169c73d68259dp15dd75jsnda5de593560a',
		        'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
	        },
	        body: JSON.stringify([{text:search}])
        };

        const url = `https://microsoft-translator-text.p.rapidapi.com/translate?to%5B0%5D=${lang}&api-version=3.0&profanityAction=NoAction&textType=plain`

        fetch(url, options)
	        .then(response => response.json())
	        .then(response => setTranslate(response[0].translations[0].text))
	        .catch(err => console.error(err));
                console.log('1')
}, [doSearch])

// useEffect(()=>{

//         const options = {
// 	                method: 'POST',
// 	                headers: {
// 		                'content-type': 'application/json',
// 		                'X-RapidAPI-Key': '6f741d35ebmshdc169c73d68259dp15dd75jsnda5de593560a',
// 		                'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
// 	                },
// 	                body: JSON.stringify([{text:search}])
//                 };
//                 const url = `https://microsoft-translator-text.p.rapidapi.com/Dictionary/Lookup?to=hi&api-version=3.0&from=en`
//                 fetch(url, options)
// 	                .then(response => response.json())
// 	                .then(response => setSynonym(response))
// 	                .catch(err => console.error(err));

// },[doSearch])


console.log(synonym)

// let synContent

// if(synonym.length > 0) 
// {
//         synContent = synonym[0].translations[0].backTranslations.map((item)=>(item.displayText)).join(" ")
// }

// const synContent = synonym.length > 0 ? synonym[0].translations[0].backTranslations.map((item)=>(item.displayText)).join(" ") : "Error: Not Found"

// console.log(synContent)



  return (
    <div>
        <nav className='navbar'>
                {/* <button onClick={ChangeMode}> {isTranslate ? "Synonym":"Translate"} </button> */}
                <DatalistInput
                        placeholder="Select Language"
                        onSelect={handleLang}
                        items={forList}
                />
        </nav>
        <div className="parent">
                <img src={Myimg} className="logo"/>
        <div className='main'>
        <div className='main--input'>
                <input type="text" onChange={handleChange} value={search} placeholder="Enter Text Here"/>
        </div>
        <div className='main--input'>
                <input type="text" value={translate} readOnly placeholder='Translation'/>      
        </div>
        <div className='main--button'>
                <button className="button-74" role="button" onClick={sub}>Translate</button>
        </div>
        </div>
        </div>
    </div>
  )
}

export default App
