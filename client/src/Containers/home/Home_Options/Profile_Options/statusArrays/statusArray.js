import React from 'react';


export const Admin = ()=>{
    return [
        {desc:'Genel Bilgiler',Icon:<i style={{marginRight:8}} className="fas fa-user-friends"></i>},
        {desc:'Şifre Değiştir',Icon:<i style={{marginRight:8}}  className="fas fa-key"></i>},
  ]
}

export const Bayi = ()=>{
    return [
        {desc:'Genel Bilgiler',Icon:<i style={{marginRight:8}} className="fas fa-user-friends"></i>},
        {desc:'Şifre Değiştir',Icon:<i style={{marginRight:8}}  className="fas fa-key"></i>},
      ]
}

export const Temsilci = ()=>{
    return [
        {desc:'Genel Bilgiler',Icon:<i style={{marginRight:8}} className="fas fa-user-friends"></i>},
        {desc:'Bayiler',Icon:<i style={{marginRight:8}}  className="fas fa-code-branch"></i> , query:'?pageNumber=1'},
        {desc:'Şifre Değiştir',Icon:<i style={{marginRight:8}}  className="fas fa-key"></i> },  
        {desc:'Raporlar',Icon:<i style={{marginRight:8}} className="fas fa-sticky-note"></i> , query:'?pageNumber=1'},        
      ]
}