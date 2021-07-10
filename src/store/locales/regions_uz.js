const regions = [ 
  {
    title: "Toshkent",
    val: "toshkent",
    regions: [
      {
        title: "Bektemir",
        val: "bektemir"
      },
      {
        title: "Mirobod",
        val: "mirobod"
      },
      {
        title: "Mirzo Ulug'bek",
        val: "mirzo-ulug'bek"
      },
      {
        title: "Sirg'ali",
        val: "sirg'ali"
      },
      {
        title: "Olmazor",
        val: "olmazor"
      },
      {
        title: "Uchtepa",
        val: "uchtepa"
      },
      {
        title: "Shayxontohur",
        val: "shayxontohur"
      },
      {
        title: "Yashnobod",
        val: "yashnobod"
      },
      {
        title: "Chilonzor",
        val: "chilonzor"
      },
      {
        title: "Yunusobod",
        val: "yunusobod"
      },
      {
        title: "Yakkasaroy",
        val: "yakkasaroy"
      },
      {
        title: "Yangihayot",
        val: "yangihayot"
      }
    ]
  },
  {
    title: "Toshkent viloyati",
    val: "toshkent-viloyat",
    regions: [
      {
        title: "Angren shahar", // city in Tashkent province
        val: "angren"
      },
      {
        title: "Bekobod",
        val: "bekobod"
      },
      {
        title: "Bekobod shahar", // city in Tashkent province
        val: "bekobod-shahar"
      },
      {
        title: "Bo'ka",
        val: "bo'ka"
      },
      {
        title: "Bo'stonliq",
        val: "bo'stonliq"
      },
      {
        title: "Chinoz",
        val: "chinoz"
      },
      {
        title: "Chirchiq shahar", // city in Tashkent province
        val: "chirchiq"
      },
      {
        title: "Ohangaron",
        val: "ohangaron"
      },
      {
        title: "Olmaliq shahar", // city in Tashkent province
        val: "olmaliq"
      },
      {
        title: "Oqqo'rg'on",
        val: "oqqo'rg'on"
      },
      {
        title: "O'rta Chirchiq",
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
        title: "Qibray",
        val: "qibray"
      },
      {
        title: "Quyi Chirchiq",
        val: "quyi-chirchiq"
      },
      {
        title: "Yangiyo'l",
        val: "yangiyo'l"
      },
      {
        title: "Yuqori Chirchiq",
        val: "yuqori-chirchiq"
      },
      {
        title: "Zangiota",
        val: "zangiota"
      },
      {
        title: "Nurafshon shahar", // city in Tashkent province
        val: "nurafshon"
      },
      {
        title: "Ohangaron shahar", // city in Tashkent province
        val: "ohangaron"
      },
      {
        title: "Toshkent",  // Toshkent tumani in Tashkent province
        val: "toshkent-rayon"
      },
      {
        title: "Yangiyo'l shahar", // city in Tashkent province
        val: "yangiyo'l-shahar"
      }
    ]
  },
  {
    title: "Andijon",
    val: "andijon",
    regions: [
      {
        title: "Xonobod shahar", // city in Andijan province
        val: "honobod"
      },
      {
        title: "Andijon shahar", // city in Andijan province
        val: "andijon-shahar"
      },
      {
        title: "Andijon", // district in Andijan province
        val: "andijon-rayon"
      },
      {
        title: "Asaka",
        val: "asaka"
      },
      {
        title: "Baliqchi",
        val: "baliqchi"
      },
      {
        title: "Bo'ston",
        val: "bo'ston"
      },
      {
        title: "Buloqboshi",
        val: "buloqboshi"
      },
      {
        title: "Izboskan",
        val: "izboskan"
      },
      {
        title: "Jalaquduq", 
        val: "jalaquduq"
      },
      {
        title: "Xo'jaobod",
        val: "xo'jaobod"
      },
      {
        title: "Qo'rg'ontepa",
        val: "qo'rg'ontepa"
      },
      {
        title: "Marhamat",
        val: "marhamat"
      },
      {
        title: "Oltinko'l",
        val: "oltinko'l"
      },
      {
        title: "Paxtaobod",
        val: "paxtaobod"
      },
      {
        title: "Shahrixon",
        val: "shahrixon"
      },
      {
        title: "Ulug'nor",
        val: "ulug'nor"
      }
    ]
  },
  {
    title: "Farg'ona",
    val: "farg'ona",
    regions: [
      {
        title: "Farg'ona shahar", // city in Fergana province
        val: "farg'ona-shahar"
      },
      {
        title: "Marg'ilon shahar", // city in Fergana province
        val: "marg'ilon-shahar"
      },
      {
        title: "Quvasoy shahar", // city in Fergana province
        val: "quvasoy-shahar"
      },
      {
        title: "Qo'qon shahar", // city in Fergana province
        val: "qo'qon-shahar"
      },
      {
        title: "Farg'ona", // district in Fergana province
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
        title: "Qo'shtepa", 
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
        title: "Bag'dod",
        val: "bag'dod"
      },
      {
        title: "Buvayda",
        val: "buvayda"
      },
      {
        title: "Uchko'prik",
        val: "uchko'prik"
      },
      {
        title: "Dang'ara",
        val: "dang'ara"
      },
      {
        title: "Furqat",
        val: "furqat"
      },
      {
        title: "O'zbekiston",
        val: "o'zbekiston"
      },
      {
        title: "Beshariq",
        val: "beshariq"
      },
      {
        title: "So'x",
        val: "so'x"
      }
    ]
  },
  {
    title: "Namangan",
    val: "namangan",
    regions: [
      {
        title: "Namangan shahar", // city in Namangan province
        val: "namangan-shahar"
      },
      {
        title: "Davlatobod",
        val: "davlatobod"
      },
      {
        title: "Mingbuloq", 
        val: "mingbuloq"
      },
      {
        title: "Kosonsoy", 
        val: "kosonsoy"
      },
      {
        title: "Namangan", // district in Namangan province
        val: "namangan-rayon"
      },
      {
        title: "Norin", 
        val: "norin"
      },
      {
        title: "Pop",
        val: "quva"
      },
      {
        title: "To'raqo'rg'on",
        val: "to'raqo'rg'on"
      },
      {
        title: "Uychi",
        val: "uychi"
      },
      {
        title: "Uchqo'rg'on", 
        val: "uchqo'rg'on"
      },
      {
        title: "Chortoq",
        val: "chortoq"
      },
      {
        title: "Chust",
        val: "chust"
      },
      {
        title: "Yangiqo'rg'on",
        val: "yangiqo'rg'on"
      }
    ]
  },
  {
    title: "Surxondaryo",
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
        title: "Jarqo'rg'on", 
        val: "jarqo'rg'on"
      },
      {
        title: "Qiziriq", 
        val: "qiziriq"
      },
      {
        title: "Qumqo'rg'on", 
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
        title: "Sho'rchi",
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
        title: "Termiz shahar", // city in Surxondaryo province
        val: "termiz-shahar"
      }
    ]
  },
  {
    title: "Sirdaryo",
    val: "sirdaryo",
    regions: [
      {
        title: "Boyovut", 
        val: "boyovut"
      },
      {
        title: "Guliston shahar", // city in Sirdarya province
        val: "guliston-shahar"
      },
      {
        title: "Guliston", 
        val: "guliston"
      },
      {
        title: "Mirzaobod", 
        val: "mirzaobod"
      },
      {
        title: "Oqoltin", 
        val: "oqoltin"
      },
      {
        title: "Sardoba", 
        val: "sardoba"
      },
      {
        title: "Sayxunobod",
        val: "sayxunobod"
      },
      {
        title: "Sirdaryo",
        val: "sirdaryo-tuman"
      },
      {
        title: "Shirin shahar",  // city in Sirdarya province
        val: "shirin"
      },
      {
        title: "Xovos", 
        val: "xovos"
      },
      {
        title: "Yangiyer shahar",  // city in Sirdarya province
        val: "yangiyer"
      }	
    ]
  },
  {
    title: "Samarqand",
    val: "samarqand",
    regions: [
      {
        title: "Samarqand shahar",  // city in Samarqand province
        val: "samarqand-shahar"
      },
      {
        title: "Kattaqo'rg'on shahar", // city in Samarqand province
        val: "kattaqo'rg'on-shahar"
      },
      {
        title: "Bulung'ur", 
        val: "bulung'ur"
      },
      {
        title: "Jomboy", 
        val: "jomboy"
      },
      {
        title: "Ishtixon", 
        val: "ishtixon"
      },
      {
        title: "Kattaqo'rg'on", 
        val: "kattaqo'rg'on"
      },
      {
        title: "Narpay",
        val: "narpay"
      },
      {
        title: "Nurobod",
        val: "nurobod"
      },
      {
        title: "Oqdaryo", 
        val: "oqdaryo"
      },
      {
        title: "Payariq", 
        val: "payariq"
      },
      {
        title: "Pastdarg'om",  
        val: "pastdarg'om"
      },
      {
        title: "Paxtachi",
        val: "paxtachi"
      },
      {
        title: "Samarqand",
        val: "samarqand-tuman"
      },
      {
        title: "Toyloq",
        val: "toyloq"
      },
      {
        title: "Urgut",
        val: "urgut"
      },
      {
        title: "Qo'shrabot",
        val: "qo'shrabot"
      }
    ]
  },
  {
    title: "Qoraqalpog'iston",
    val: "qoraqalpog'iston",
    regions: [
      {
        title: "Nukus shahar",  // city in Qoraqalpog'iston
        val: "nukus"
      },
      {
        title: "Amudaryo", 
        val: "amudaryo"
      },
      {
        title: "Beruniy", 
        val: "beruniy"
      },
      {
        title: "Ellikqal'fa", 
        val: "ellikqala"
      },
      {
        title: "Qonliko'l", 
        val: "qonliko'l"
      },
      {
        title: "Qorao'zak", 
        val: "qorao'zak"
      },
      {
        title: "Kegeyli",
        val: "kegeyli"
      },
      {
        title: "Qo'ng'irot",
        val: "qo'ng'irot"
      },
      {
        title: "Mo'ynoq", 
        val: "moynoq"
      },
      {
        title: "Nukus", // district in Qoraqalpog'iston
        val: "nukus-tuman"
      },
      {
        title: "Taxtako'pir",  
        val: "taxtako'pir"
      },
      {
        title: "To'rtko'l",
        val: "to'rtko'l"
      },
      {
        title: "Xo'jayli",
        val: "xo'jayli"
      },
      {
        title: "Chimboy",
        val: "chimboy"
      },
      {
        title: "Shumanay",
        val: "shumanay"
      },
      {
        title: "Taxiatosh",
        val: "taxiatosh"
      }
    ]
  },
  {
    title: "Qashqadaryo",
    val: "qashqadaryo",
    regions: [
      {
        title: "Qarshi shahar",  // city in Qashqadaryo
        val: "qarshi"
      },
      {
        title: "G'uzor", 
        val: "g'uzor"
      },
      {
        title: "Dexqonobod", 
        val: "dexqonobod"
      },
      {
        title: "Qamashi", 
        val: "qamashi"
      },
      {
        title: "Qarshi", // district
        val: "qarshi-tuman"
      },
      {
        title: "Kasbi", 
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
        title: "Mirishkor", 
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
        title: "Shahrisabz shahar", // city in Qashqadaryo
        val: "shahrisabz"
      },
      {
        title: "Shahrisabz", // district
        val: "shahrisabz-tuman"
      },
      {
        title: "Chiroqchi",
        val: "chiroqchi"
      },
      {
        title: "Yakkabog'",
        val: "yakkabog'"
      }
    ]
  },
  {
    title: "Navoiy",
    val: "navoiy",
    regions: [
      {
        title: "Navoiy shahar",  // city in Navoiy 
        val: "navoiy"
      },
      {
        title: "Zarafshon shahar", // city in Navoiy
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
        title: "Konimex", 
        val: "konimex"
      },
      {
        title: "Qiziltepa", 
        val: "qiziltepa"
      },
      {
        title: "Nurota",
        val: "nurota"
      },
      {
        title: "Xatirchi",
        val: "xatirchi"
      },
      {
        title: "Uchquduq", 
        val: "uchquduq"
      },
      {
        title: "Tomdi", 
        val: "tomdi"
      }
    ]
  },
  {
    title: "Xorazm",
    val: "xorazm",
    regions: [
      {
        title: "Urganch shahar",  // city in Xorazm
        val: "urganch"
      },
      {
        title: "Xiva shahar",  // city in Xorazm
        val: "xiva"
      },
      {
        title: "Bog'ot", 
        val: "bog'ot"
      },
      {
        title: "Qo'shko'pir", 
        val: "qo'shko'pir"
      },
      {
        title: "Hazorasp", 
        val: "hazorasp"
      },
      {
        title: "Xiva",  // district
        val: "xiva-tuman"
      },
      {
        title: "Xonqa",
        val: "xonqa"
      },
      {
        title: "Urganch", // district
        val: "urganch-tuman"
      },
      {
        title: "Shovot", 
        val: "shovot"
      },
      {
        title: "Yangiariq", 
        val: "yangiariq"
      },
      {
        title: "Yangibozor",
        val: "yangibozor"
      },
      {
        title: "Gurlan",
        val: "gurlan"
      }
    ]
  },
  {
    title: "Jizzax",
    val: "jizzax",
    regions: [
      {
        title: "Jizzax shahar",  // city in Jizzax
        val: "jizzax"
      },
      {
        title: "Baxmal",  
        val: "baxmal"
      },
      {
        title: "Do'stlik", 
        val: "do'stlik"
      },
      {
        title: "G'allaorol",
        val: "g'allaorol"
      },
      {
        title: "Sharof Rashidov", 
        val: "sharof-rashidov"
      },
      {
        title: "Zarbdor", 
        val: "zarbdor"
      },
      {
        title: "Zafarobod",  
        val: "zafarobod"
      },
      {
        title: "Zomin",
        val: "zomin"
      },
      {
        title: "Paxtakor", 
        val: "paxtakor"
      },
      {
        title: "Mirzacho'l", 
        val: "mirzacho'l"
      },
      {
        title: "Forish", 
        val: "forish"
      },
      {
        title: "Yangiobod",
        val: "yangiobod"
      }
    ]
  },
  {
    title: "Buxoro",
    val: "buxoro",
    regions: [
      {
        title: "Buxoro shahar",  // city in Buxoro
        val: "buxoro"
      },
      {
        title: "Buxoro",  // district
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
        title: "Qorako'l", 
        val: "qorako'l"
      },
      {
        title: "Olot", 
        val: "olot"
      },
      {
        title: "Kogon shahar",  
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
        title: "Peshko'", 
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
        title: "G'ijduvon",
        val: "g'ijduvon"
      }
    ]
  }
]

export default regions;