import React from 'react';


export const Admin = ()=>{

    return [
        {desc:'Genel Bilgiler',Icon:<i style={{marginRight:8}} className="fas fa-user-friends"></i>},
        // {desc:'Raporlar',Icon:<i style={{marginRight:8}} className="fas fa-sticky-note"></i>},
        {desc:'Yetkiler',Icon:<i style={{marginRight:8}} className="fas fa-unlock"></i>},
        // {desc:'Ödemeler',Icon:<i style={{marginRight:8}} className="fas fa-money-bill"></i>},
  ]

}

export const Bayi = ()=>{

    return [
        {desc:'Genel Bilgiler',Icon:<i style={{marginRight:8}} className="fas fa-user-friends"></i>},
        {desc:'Yetkiler',Icon:<i style={{marginRight:8}} className="fas fa-unlock"></i>}, 
        {desc:'Raporlar',Icon:<i style={{marginRight:8}} className="fas fa-sticky-note"></i>},
        // {desc:'Ödemeler',Icon:<i style={{marginRight:8}} className="fas fa-money-bill"></i>},
      ]

}

export const Temsilci = ()=>{

    return [
      
        {desc:'Genel Bilgiler',Icon:<i style={{marginRight:8}} className="fas fa-user-friends"></i>},
        {desc:'Yetkiler',Icon:<i style={{marginRight:8}} className="fas fa-unlock"></i>},
        {desc:'Bayiler',Icon:<i style={{marginRight:8}}  className="fas fa-code-branch"></i>},
        {desc:'Raporlar',Icon:<i style={{marginRight:8}} className="fas fa-sticky-note"></i>},  
        // {desc:'Ödemeler',Icon:<i style={{marginRight:8}} className="fas fa-money-bill"></i>},    
      ]

}