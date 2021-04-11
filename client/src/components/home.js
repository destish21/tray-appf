import React, { useEffect } from 'react'
import axios from "axios";


const Home = () => {
    useEffect(() => {
        fetchFood();
      }, []);
    
      const fetchFood = () => {
        const APP_ID = 'a7e4cdd9';
        const API_KEY = 'efd018e424ec85db972aafa8104f3600';	
    
        axios
          .get(
            `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${API_KEY}`
          )
          .then(res => {
            console.log(res.data.hits);
            const food = res.data.hits.map((hit) => ( hit ));
            console.log("food=> ", food);
           
          });
      };

    const imageStyle = {
        width: 400
    }
    return (
        <div>
            <p>It's good to be home</p>
            <img style={imageStyle} src="https://i.ytimg.com/vi/N1icEHtgb3g/maxresdefault.jpg" alt="myImage" />
            <h4> monoxieto </h4>
        </div>
    )

}


export default Home
