import React from "react"
import "./style.css"


export default function OwerService () {
  const data = [
    {
      cover: <i class="fa-solid fa-truck fa-2x my-5 ms-5 text-dark"  ></i>,
      title: "Worldwide Delivery",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
    {
      cover: <i class="fa-solid fa-headset fa-2x my-5 ms-5 text-dark"></i>,
      title: "24/7 Support ",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
   
    {
      cover: <i class="fa-solid fa-shield fa-2x my-5 ms-5 text-dark"></i>,
      title: "Shop Confidence ",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
  
    {
      cover: <i class="fa-solid fa-credit-card fa-2x my-5 ms-5 text-dark"></i>,
      title: "Safe Payment",
      decs: "We offer competitive prices on our 100 million plus product any range.",
    },
  ]
  return (
    <>
      <div className="container">
        <div className='card-group'>
          {data.map((val, index) => {
            return (
              <div className='card p-4' key={index}>
                <div className='card-img-top text-center '>
                  <i className="card-title ">{val.cover}</i>
                </div>
                <h4 className="card-title text-center ">{val.title}</h4>
                <p className="card-title text-center ">{val.decs}</p>
              </div>
            )
          })}
        </div>
        </div>
    </>
  )
}

