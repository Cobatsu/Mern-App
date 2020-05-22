export const Admin = ()=>{
    return [
        {type:'Öğrenci',props: ['Öğrenciler','Ön Kayıt','Fiyatlandırma','Genel Bilgiler']},
        {type:'Personel',props:['Personel Listesi','Ödemeler','Personel Ekle']},
        {type:'Muhasebe',props:['Ön Kayıt','Öğrenciler','Fiyatlandırma','Genel Bilgiler']},
        {type:'Rapor',props:['Raporlar']},
    ]
}

export const Bayi = ()=>{
    return [
        {type:'Rapor',props:['Rapor Ekle','Raporlar']},
        {type:'Öğrenciler',props:['Öğrenci Listesi']},
        {type:'Okul',props:['Okullarım']},
    ]
}

export const Temsilci = ()=>{
    return [
        {type:'Rapor',props:['Rapor Ekle','Raporlar']},
        {type:'Personel',props:['Personel Ekle']},
        {type:'Öğrenci',props:['Ön Kayıt','Öğrenciler','Fiyatlandırma']},
        {type:'Bayi',props:['Bayi Listesi','Ödemeler']},
    ]
}