export const Admin = ()=>{
    return [
        {type:'Personel',props:['Personel Listesi','Personel Ekle']},
        {type:'Rapor',props:['Raporlar'] },
        {type:'Öğrenci',props:['Ön Kayıt Liste','Ön Kayıt Ekle']},
    ]

}

export const Bayi = ()=>{
    return [
        {type:'Rapor',props:['Rapor Ekle','Raporlar'] },
        {type:'Öğrenci',props:['Ön Kayıt Liste','Ön Kayıt Ekle']},
    ]
}

export const Temsilci = ()=>{
    return [
        {type:'Rapor',props:['Rapor Ekle','Raporlar']},
        {type:'Personel',props:['Personel Ekle' , 'Bayi Listesi']},
        {type:'Öğrenci',props:[ 'Ön Kayıt Liste','Ön Kayıt Ekle']},
    ]
}