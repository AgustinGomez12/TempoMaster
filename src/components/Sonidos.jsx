import React from 'react'

const Sonidos = ({handleCheked,chekedd}) => {
  

  return (
    <div className='container-songs'>
        <div className='songs'>
             <div className='song'>
                <input
                checked = {chekedd === "option1"}
                onChange={() => handleCheked("option1")} type="checkbox" name="" id="" />
                <h3>
                    Alarma
                </h3>
             </div>
             <div className='song'>
                <input
                checked = {chekedd === "option2"}
                onChange={() => handleCheked("option2")} type="checkbox" name="" id="" />
                <h3>
                    Campana
                </h3>
             </div>
             <div className='song'>
                <input
                checked = {chekedd === "option3"}
                onChange={() => handleCheked("option3")} type="checkbox" name="" id="" />
                <h3>
                    Melodia 1
                </h3>
             </div>
        </div>
    </div>
  )
}

export default Sonidos