const regions = [
  {
    title: "Tashkent",
    val: "toshkent",
    regions: [
      {
        title: "Bektemir",
        val: 'bektemir'
      },
      {
        title: "Mirabad",
        val: "mirobod"
      },
      {
        title: "Mirzo Ulugbek",
        val: "mirzo-ulug'bek"
      },
      {
        title: "Sergeli",
        val: "sirg'ali"
      },
      {
        title: "Almazar",
        val: "olmazor"
      },
      {
        title: "Uchtepa",
        val: "uchtepa"
      },
      {
        title: "Shaykhontohur",
        val: "shayxontohur"
      },
      {
        title: "Yashnabad",
        val: "yashnobod"
      },
      {
        title: "Chilanzar",
        val: "chilonzor"
      },
      {
        title: "Yunusabad",
        val: "yunusobod"
      },
      {
        title: "Yakkasaray",
        val: "yakkasaroy"
      },
      {
        title: "Yangihayat",
        val: "yangihayot"
      }
    ]
  },
  {
    title: "Tashkent region",
    val: "toshkent-viloyat",
    regions: [
      {
        title: "Angren city", // city in Tashkent province
        val: "angren"
      },
      {
        title: "Bekabad",
        val: "bekobod"
      },
      {
        title: "Bekabad city", // city in Tashkent province
        val: "bekobod-shahar"
      },
      {
        title: "Buka",
        val: "bo'ka"
      },
      {
        title: "Bustanlik",
        val: "bo'stonliq"
      },
      {
        title: "Chinaz",
        val: "chinoz"
      },
      {
        title: "Chirchik city", // city in Tashkent province
        val: "chirchiq"
      },
      {
        title: "Ohangaron",
        val: "ohangaron"
      },
      {
        title: "Olmalik city", // city in Tashkent province
        val: "olmaliq"
      },
      {
        title: "Akkurgan",
        val: "oqqo'rg'on"
      },
      {
        title: "Urta Chirchik",
        val: "o'rta-chirchiq"
      },
      {
        title: "Parkent",
        val: "parkent"
      },
      {
        title: "Piskent",
        val: "piskent"
      },
      {
        title: "Kibray",
        val: "qibray"
      },
      {
        title: "Kuyi Chirchik",
        val: "quyi-chirchiq"
      },
      {
        title: "Yangiyul",
        val: "yangiyo'l"
      },
      {
        title: "Yukori Chirchik",
        val: "yuqori-chirchiq"
      },
      {
        title: "Zangiota",
        val: "zangiota"
      },
      {
        title: "Nurafshon city", // city in Tashkent province
        val: "nurafshon"
      },
      {
        title: "Ohangaron city", // city in Tashkent province
        val: "ohangaron"
      },
      {
        title: "Tashkent",  // Toshkent tumani in Tashkent province
        val: "toshkent-rayon"
      },
      {
        title: "Yangiyul city", // city in Tashkent province
        val: "yangiyo'l-shahar"
      }
    ]
  },
  {
    title: "Andijan",
    val: "andijon",
    regions: [
      {
        title: "Xanabad city", // city in Andijan province
        val: "honobod"
      },
      {
        title: "Andijan city", // city in Andijan province
        val: "andijon-shahar"
      },
      {
        title: "Andijan", // district in Andijan province
        val: "andijon-rayon"
      },
      {
        title: "Asaka",
        val: "asaka"
      },
      {
        title: "Balikchi",
        val: "baliqchi"
      },
      {
        title: "Bostan",
        val: "bo'ston"
      },
      {
        title: "Bulokboshi",
        val: "buloqboshi"
      },
      {
        title: "Izboskan",
        val: "izboskan"
      },
      {
        title: "Jalakuduk", 
        val: "jalaquduq"
      },
      {
        title: "Khodjaobad",
        val: "xo'jaobod"
      },
      {
        title: "Kurgontepa",
        val: "qo'rg'ontepa"
      },
      {
        title: "Marhamat",
        val: "marhamat"
      },
      {
        title: "Altinkul",
        val: "oltinko'l"
      },
      {
        title: "Pakhtaabad",
        val: "paxtaobod"
      },
      {
        title: "Shakhrihan",
        val: "shahrixon"
      },
      {
        title: "Ulugnor",
        val: "ulug'nor"
      }
    ]
  },
  {
    title: "Fergana",
    val: "farg'ona",
    regions: [
      {
        title: "Ferghana city", // city in Fergana province
        val: "farg'ona-shahar"
      },
      {
        title: "Margilan city", // city in Fergana province
        val: "marg'ilon-shahar"
      },
      {
        title: "Quvasoy city", // city in Fergana province
        val: "quvasoy-shahar"
      },
      {
        title: "Kokand city", // city in Fergana province
        val: "qo'qon-shahar"
      },
      {
        title: "Fergana", // district in Fergana province
        val: "farg'ona-rayon"
      },
      {
        title: "Quva",
        val: "quva"
      },
      {
        title: "Toshloq",
        val: "toshloq"
      },
      {
        title: "Yozyovon",
        val: "yozyovon"
      },
      {
        title: "Qoshtepa", 
        val: "qo'shtepa"
      },
      {
        title: "Oltiariq",
        val: "oltiariq"
      },
      {
        title: "Rishton",
        val: "Rishton"
      },
      {
        title: "Bagdod",
        val: "bag'dod"
      },
      {
        title: "Buvayda",
        val: "buvayda"
      },
      {
        title: "Uchkuprik",
        val: "uchko'prik"
      },
      {
        title: "Dangara",
        val: "dang'ara"
      },
      {
        title: "Furqat",
        val: "furqat"
      },
      {
        title: "Uzbekistan",
        val: "o'zbekiston"
      },
      {
        title: "Beshariq",
        val: "beshariq"
      },
      {
        title: "Sox",
        val: "so'x"
      }
    ]
  },
  {
    title: "Namangan",
    val: "namangan",
    regions: [
      {
        title: "Namangan city", // city in Namangan province
        val: "namangan-shahar"
      },
      {
        title: "Davlatabad",
        val: "davlatobod"
      },
      {
        title: "Mingbulak", 
        val: "mingbuloq"
      },
      {
        title: "Kasansay", 
        val: "kosonsoy"
      },
      {
        title: "Namangan", // district in Namangan province
        val: "namangan-rayon"
      },
      {
        title: "Naryn", 
        val: "norin"
      },
      {
        title: "Pap",
        val: "quva"
      },
      {
        title: "Turakurgan",
        val: "to'raqo'rg'on"
      },
      {
        title: "Uychi",
        val: "uychi"
      },
      {
        title: "Uchkurgan", 
        val: "uchqo'rg'on"
      },
      {
        title: "Chartak",
        val: "chortoq"
      },
      {
        title: "Chust",
        val: "chust"
      },
      {
        title: "Yangikurgan",
        val: "yangiqo'rg'on"
      }
    ]
  },
  {
    title: "Surkhandarya",
    val: "surxondaryo",
    regions: [
      {
        title: "Angor", 
        val: "angor"
      },
      {
        title: "Boysun",
        val: "boysun"
      },
      {
        title: "Denov", 
        val: "denov"
      },
      {
        title: "Jarkurgan", 
        val: "jarqo'rg'on"
      },
      {
        title: "Kizirik", 
        val: "qiziriq"
      },
      {
        title: "Kumkurgan", 
        val: "qumqo'rg'on"
      },
      {
        title: "Muzrabot",
        val: "muzrabot"
      },
      {
        title: "Oltinsoy",
        val: "oltinsoy"
      },
      {
        title: "Sariosiyo",
        val: "sariosiyo"
      },
      {
        title: "Sherobod", 
        val: "sherobod"
      },
      {
        title: "Shurchi",
        val: "sho'rchi"
      },
      {
        title: "Termiz",
        val: "termiz"
      },
      {
        title: "Uzun",
        val: "uzun"
      },
      {
        title: "Bandixon",
        val: "bandixon"
      },
      {
        title: "Termiz city", // city in Surxondaryo province
        val: "termiz-shahar"
      }
    ]
  },
  {
    title: "Syrdarya",
    val: "sirdaryo",
    regions: [
      {
        title: "Bayaut", 
        val: "boyovut"
      },
      {
        title: "Gulistan city", // city in Sirdarya province
        val: "guliston-shahar"
      },
      {
        title: "Gulistan", 
        val: "guliston"
      },
      {
        title: "Mirzabad", 
        val: "mirzaobod"
      },
      {
        title: "Oqoltin", 
        val: "oqoltin"
      },
      {
        title: "Sardaba", 
        val: "sardoba"
      },
      {
        title: "Saykhonobod",
        val: "sayxunobod"
      },
      {
        title: "Sirdarya",
        val: "sirdaryo-tuman"
      },
      {
        title: "Shirin city",  // city in Sirdarya province
        val: "shirin"
      },
      {
        title: "Havas", 
        val: "xovos"
      },
      {
        title: "Yangier city",  // city in Sirdarya province
        val: "yangiyer"
      }	
    ]
  },
  {
    title: "Samarkand",
    val: "samarqand",
    regions: [
      {
        title: "Samarkand city",  // city in Samarqand province
        val: "samarqand-shahar"
      },
      {
        title: "Kattakurgan city", // city in Samarqand province
        val: "kattaqo'rg'on-shahar"
      },
      {
        title: "Bulungur", 
        val: "bulung'ur"
      },
      {
        title: "Jamboy", 
        val: "jomboy"
      },
      {
        title: "Ishtikhon", 
        val: "ishtixon"
      },
      {
        title: "Kattakurgan", 
        val: "kattaqo'rg'on"
      },
      {
        title: "Narpay",
        val: "narpay"
      },
      {
        title: "Nurabad",
        val: "nurobod"
      },
      {
        title: "Akdarya", 
        val: "oqdaryo"
      },
      {
        title: "Payariq", 
        val: "payariq"
      },
      {
        title: "Pastdargom",  
        val: "pastdarg'om"
      },
      {
        title: "Pakhtachi",
        val: "paxtachi"
      },
      {
        title: "Samarkand",
        val: "samarqand-tuman"
      },
      {
        title: "Taylak",
        val: "toyloq"
      },
      {
        title: "Urgut",
        val: "urgut"
      },
      {
        title: "Kushrabat",
        val: "qo'shrabot"
      }
    ]
  },
  {
    title: "Karakalpakstan",
    val: "karakalpakstan",
    regions: [
      {
        title: "Nukus city",  // city in Qoraqalpog'iston
        val: "nukus"
      },
      {
        title: "Amudarya", 
        val: "amudaryo"
      },
      {
        title: "Beruniy", 
        val: "beruniy"
      },
      {
        title: "Ellikala", 
        val: "ellikqala"
      },
      {
        title: "Kanlikol", 
        val: "qonliko'l"
      },
      {
        title: "Karaozek", 
        val: "qorao'zak"
      },
      {
        title: "Kegeyli",
        val: "kegeyli"
      },
      {
        title: "Kungrad",
        val: "qo'ng'irot"
      },
      {
        title: "Muynak", 
        val: "moynoq"
      },
      {
        title: "Nukus", // district in Qoraqalpog'iston
        val: "nukus-tuman"
      },
      {
        title: "Takhtakopir",  
        val: "taxtako'pir"
      },
      {
        title: "Tortkul",
        val: "to'rtko'l"
      },
      {
        title: "Khodjeyli",
        val: "xo'jayli"
      },
      {
        title: "Shimbay",
        val: "chimboy"
      },
      {
        title: "Shomanay",
        val: "shumanay"
      },
      {
        title: "Takhiatash",
        val: "taxiatosh"
      }
    ]
  },
  {
    title: "Qashqadaryo",
    val: "qashqadaryo",
    regions: [
      {
        title: "Karshi city",  // city in Qashqadaryo
        val: "qarshi"
      },
      {
        title: "Guzar", 
        val: "g'uzor"
      },
      {
        title: "Dehkanabad", 
        val: "dexqonobod"
      },
      {
        title: "Kamashi", 
        val: "qamashi"
      },
      {
        title: "Karshi", // district
        val: "qarshi-tuman"
      },
      {
        title: "Kasby", 
        val: "kasbi"
      },
      {
        title: "Kitob",
        val: "kitob"
      },
      {
        title: "Koson",
        val: "koson"
      },
      {
        title: "Myrishkor", 
        val: "mirishkor"
      },
      {
        title: "Muborak", 
        val: "muborak"
      },
      {
        title: "Nishon",  
        val: "nishon"
      },
      {
        title: "Shahrisabz city", // city in Qashqadaryo
        val: "shahrisabz"
      },
      {
        title: "Shahrisabz", // district
        val: "shahrisabz-tuman"
      },
      {
        title: "Chirakchi",
        val: "chiroqchi"
      },
      {
        title: "Yakkabog",
        val: "yakkabog'"
      }
    ]
  },
  {
    title: "Navoiy",
    val: "navoiy",
    regions: [
      {
        title: "Navoiy city",  // city in Navoiy 
        val: "navoiy"
      },
      {
        title: "Zarafshan city",  // city in Navoiy
        val: "zarafshon"
      },
      {
        title: "Karmana", 
        val: "karmana"
      },
      {
        title: "Navbahor", 
        val: "navbahor"
      },
      {
        title: "Kanimekh", 
        val: "konimex"
      },
      {
        title: "Qiziltepa", 
        val: "qiziltepa"
      },
      {
        title: "Nurata",
        val: "nurota"
      },
      {
        title: "Khatyrchi",
        val: "xatirchi"
      },
      {
        title: "Uchkuduk", 
        val: "uchquduq"
      },
      {
        title: "Tamdy", 
        val: "tomdi"
      }
    ]
  },
  {
    title: "Khorezm",
    val: "xorazm",
    regions: [
      {
        title: "Urgench city",  // city in Xorazm
        val: "urganch"
      },
      {
        title: "Khiva city",  // city in Xorazm
        val: "xiva"
      },
      {
        title: "Bagat", 
        val: "bog'ot"
      },
      {
        title: "Koshkopir", 
        val: "qo'shko'pir"
      },
      {
        title: "Hazarasp", 
        val: "hazorasp"
      },
      {
        title: "Khiva",  // district
        val: "xiva-tuman"
      },
      {
        title: "Xanka",
        val: "xonqa"
      },
      {
        title: "Urgench", // district
        val: "urganch-tuman"
      },
      {
        title: "Shavat", 
        val: "shovot"
      },
      {
        title: "Yangiarik", 
        val: "yangiariq"
      },
      {
        title: "Yangibazar",
        val: "yangibozor"
      },
      {
        title: "Gurlan",
        val: "gurlan"
      }
    ]
  },
  {
    title: "Jizzakh",
    val: "jizzax",
    regions: [
      {
        title: "Jizzakh city",  // city in Jizzax
        val: "jizzax"
      },
      {
        title: "Bakhmal",  
        val: "baxmal"
      },
      {
        title: "Dustlik", 
        val: "do'stlik"
      },
      {
        title: "Gallaorol",
        val: "g'allaorol"
      },
      {
        title: "Sharaf Rashidov", 
        val: "sharof-rashidov"
      },
      {
        title: "Zarbdar", 
        val: "zarbdor"
      },
      {
        title: "Zafarabad",  
        val: "zafarobod"
      },
      {
        title: "Zaamin",
        val: "zomin"
      },
      {
        title: "Pakhtakor", 
        val: "paxtakor"
      },
      {
        title: "Mirzachul", 
        val: "mirzacho'l"
      },
      {
        title: "Forish", 
        val: "forish"
      },
      {
        title: "Yangiabad",
        val: "yangiobod"
      }
    ]
  },
  {
    title: "Bukhara",
    val: "buxoro",
    regions: [
      {
        title: "Bukhara city",  // city in Buxoro
        val: "buxoro"
      },
      {
        title: "Bukhara",  // district
        val: "buxoro-tuman"
      },
      {
        title: "Romitan", 
        val: "romitan"
      },
      {
        title: "Jondor",
        val: "jondor"
      },
      {
        title: "Karakul", 
        val: "qorako'l"
      },
      {
        title: "Olot", 
        val: "olot"
      },
      {
        title: "Kogon city",  
        val: "kogon"
      },
      {
        title: "Kogon",
        val: "kogon-tuman"
      },
      {
        title: "Qorovulbozor", 
        val: "qorovulbozor"
      },
      {
        title: "Peshku", 
        val: "peshko'"
      },
      {
        title: "Vobkent", 
        val: "vobkent"
      },
      {
        title: "Shofirkon",
        val: "shofirkon"
      },
      {
        title: "Gijduvon",
        val: "g'ijduvon"
      }
    ]
  }
];

export default regions;