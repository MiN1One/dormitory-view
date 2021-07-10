const regions = [
  {
    title: "Ташкент",
    val: "toshkent",
    regions: [
      {
        title: "Бектемирский",
        val: "bektemir"
      },
      {
        title: "Мирзабадский",
        val: "mirobod"
      },
      {
        title: "Мирзо-Улугбекский",
        val: "mirzo-ulug'bek"
      },
      {
        title: "Сергелийский",
        val: "sirg'ali"
      },
      {
        title: "Алмазарский",
        val: "olmazor"
      },
      {
        title: "Учтепинский",
        val: "uchtepa"
      },
      {
        title: "Шайхантахурский",
        val: "shayxontohur"
      },
      {
        title: "Яшнабадский",
        val: "yashnobod"
      },
      {
        title: "Чиланзарский",
        val: "chilonzor"
      },
      {
        title: "Юнусабадский",
        val: "yunusobod"
      },
      {
        title: "Яккасарайский",
        val: "yakkasaroy"
      },
      {
        title: "Янгихаетский",
        val: "yangihayot"
      }
    ]
  },
  {
    title: "Ташкентская область",
    val: "toshkent-viloyat",
    regions: [
      {
        title: "город Ангрен", // city in Tashkent province
        val: "angren"
      },
      {
        title: "Бекабадский",
        val: "bekobod"
      },
      {
        title: "город Бекабад", // city in Tashkent province
        val: "bekobod-shahar"
      },
      {
        title: "Букинский",
        val: "bo'ka"
      },
      {
        title: "Бостанлыкский",
        val: "bo'stonliq"
      },
      {
        title: "Чиназский",
        val: "chinoz"
      },
      {
        title: "город Чирчик", // city in Tashkent province
        val: "chirchiq"
      },
      {
        title: "Ахангаранский",
        val: "ohangaron"
      },
      {
        title: "город Алмалык", // city in Tashkent province
        val: "olmaliq"
      },
      {
        title: "Аккурганский",
        val: "oqqo'rg'on"
      },
      {
        title: "Уртачирчикский",
        val: "o'rta-chirchiq"
      },
      {
        title: "Паркентский",
        val: "parkent"
      },
      {
        title: "Пскентский",
        val: "piskent"
      },
      {
        title: "Кибрайский",
        val: "qibray"
      },
      {
        title: "Куйичирчикский",
        val: "quyi-chirchiq"
      },
      {
        title: "Янгиюльский",
        val: "yangiyo'l"
      },
      {
        title: "Юкарычирчикский",
        val: "yuqori-chirchiq"
      },
      {
        title: "Зангиатинский",
        val: "zangiota"
      },
      {
        title: "город Нурафшан", // city in Tashkent province
        val: "nurafshon"
      },
      {
        title: "город Ахангаран", // city in Tashkent province
        val: "ohangaron"
      },
      {
        title: "Ташкентский",  // Toshkent tumani in Tashkent province
        val: "toshkent-rayon"
      },
      {
        title: "город Янгиюль", // city in Tashkent province
        val: "yangiyo'l-shahar"
      }
    ]
  },
  {
    title: "Андижан",
    val: "andijon",
    regions: [
      {
        title: "город Ханабад", // city in Andijan province
        val: "honobod"
      },
      {
        title: "город Андижан", // city in Andijan province
        val: "andijon-shahar"
      },
      {
        title: "Андижанский", // district in Andijan province
        val: "andijon-rayon"
      },
      {
        title: "Асакинский",
        val: "asaka"
      },
      {
        title: "Балыкчинский",
        val: "baliqchi"
      },
      {
        title: "Бустанский",
        val: "bo'ston"
      },
      {
        title: "Булакбашинский",
        val: "buloqboshi"
      },
      {
        title: "Избасканский",
        val: "izboskan"
      },
      {
        title: "Джалакудукский", 
        val: "jalaquduq"
      },
      {
        title: "Ходжаабадский",
        val: "xo'jaobod"
      },
      {
        title: "Кургантепинский",
        val: "qo'rg'ontepa"
      },
      {
        title: "Мархаматский",
        val: "marhamat"
      },
      {
        title: "Алтынкульский",
        val: "oltinko'l"
      },
      {
        title: "Пахтаабадский",
        val: "paxtaobod"
      },
      {
        title: "Шахриханский",
        val: "shahrixon"
      },
      {
        title: "Улугнорский",
        val: "ulug'nor"
      }
    ]
  },
  {
    title: "Фергана",
    val: "farg'ona",
    regions: [
      {
        title: "город Фергана", // city in Fergana province
        val: "farg'ona-shahar"
      },
      {
        title: "город Маргилан", // city in Fergana province
        val: "marg'ilon-shahar"
      },
      {
        title: "город Кувасай", // city in Fergana province
        val: "quvasoy-shahar"
      },
      {
        title: "город Коканд", // city in Fergana province
        val: "qo'qon-shahar"
      },
      {
        title: "Ферганский", // district in Fergana province
        val: "farg'ona-rayon"
      },
      {
        title: "Кувинский",
        val: "quva"
      },
      {
        title: "Ташлакский",
        val: "toshloq"
      },
      {
        title: "Язяванский",
        val: "yozyovon"
      },
      {
        title: "Куштепенский", 
        val: "qo'shtepa"
      },
      {
        title: "Олтиарикский",
        val: "oltiariq"
      },
      {
        title: "Риштанский",
        val: "Rishton"
      },
      {
        title: "Багдадский",
        val: "bag'dod"
      },
      {
        title: "Бувайденский",
        val: "buvayda"
      },
      {
        title: "Учкуприкский",
        val: "uchko'prik"
      },
      {
        title: "Дангаринский",
        val: "dang'ara"
      },
      {
        title: "Фуркатский",
        val: "furqat"
      },
      {
        title: "Узбекистанский",
        val: "o'zbekiston"
      },
      {
        title: "Бешарикский",
        val: "beshariq"
      },
      {
        title: "Сохский",
        val: "so'x"
      }
    ]
  },
  {
    title: "Наманган",
    val: "namangan",
    regions: [
      {
        title: "город Наманган", // city in Namangan province
        val: "namangan-shahar"
      },
      {
        title: "Давлатабадский",
        val: "davlatobod"
      },
      {
        title: "Мингбулакский", 
        val: "mingbuloq"
      },
      {
        title: "Касансайский", 
        val: "kosonsoy"
      },
      {
        title: "Наманганский", // district in Namangan province
        val: "namangan-rayon"
      },
      {
        title: "Нарынский", 
        val: "norin"
      },
      {
        title: "Папский",
        val: "quva"
      },
      {
        title: "Туракурганский",
        val: "to'raqo'rg'on"
      },
      {
        title: "Уйчинский",
        val: "uychi"
      },
      {
        title: "Учкурганский", 
        val: "uchqo'rg'on"
      },
      {
        title: "Чартакский",
        val: "chortoq"
      },
      {
        title: "Чустский",
        val: "chust"
      },
      {
        title: "Янгикурганский",
        val: "yangiqo'rg'on"
      }
    ]
  },
  {
    title: "Сурхандарья",
    val: "surxondaryo",
    regions: [
      {
        title: "Ангорский", 
        val: "angor"
      },
      {
        title: "Байсунский",
        val: "boysun"
      },
      {
        title: "Денауский", 
        val: "denov"
      },
      {
        title: "Джаркурганский", 
        val: "jarqo'rg'on"
      },
      {
        title: "Кизирикский", 
        val: "qiziriq"
      },
      {
        title: "Кумкурганский", 
        val: "qumqo'rg'on"
      },
      {
        title: "Музработский",
        val: "muzrabot"
      },
      {
        title: "Алтынсайский",
        val: "oltinsoy"
      },
      {
        title: "Сариосийский",
        val: "sariosiyo"
      },
      {
        title: "Шерабадский", 
        val: "sherobod"
      },
      {
        title: "Шурчинский",
        val: "sho'rchi"
      },
      {
        title: "Термезский",
        val: "termiz"
      },
      {
        title: "Узунский",
        val: "uzun"
      },
      {
        title: "Бандиханский",
        val: "bandixon"
      },
      {
        title: "город Термез", // city in Surxondaryo province
        val: "termiz-shahar"
      }
    ]
  },
  {
    title: "Сырдарья",
    val: "sirdaryo",
    regions: [
      {
        title: "Баявутский", 
        val: "boyovut"
      },
      {
        title: "город Гулистан", // city in Sirdarya province
        val: "guliston-shahar"
      },
      {
        title: "гулистанский", 
        val: "guliston"
      },
      {
        title: "Мирзаабадский", 
        val: "mirzaobod"
      },
      {
        title: "Акалтынский", 
        val: "oqoltin"
      },
      {
        title: "Сардобинский", 
        val: "sardoba"
      },
      {
        title: "Сайхунободский",
        val: "sayxunobod"
      },
      {
        title: "Сырдарьинский",
        val: "sirdaryo-tuman"
      },
      {
        title: "город Ширин",  // city in Sirdarya province
        val: "shirin"
      },
      {
        title: "Хавастский", 
        val: "xovos"
      },
      {
        title: "город Янгиер",  // city in Sirdarya province
        val: "yangiyer"
      }	
    ]
  },
  {
    title: "Самарканд",
    val: "samarqand",
    regions: [
      {
        title: "город Самарканд",  // city in Samarqand province
        val: "samarqand-shahar"
      },
      {
        title: "город Каттакурган", // city in Samarqand province
        val: "kattaqo'rg'on-shahar"
      },
      {
        title: "Булунгурский", 
        val: "bulung'ur"
      },
      {
        title: "Джамбайский", 
        val: "jomboy"
      },
      {
        title: "Иштыханский", 
        val: "ishtixon"
      },
      {
        title: "Каттакурганский", 
        val: "kattaqo'rg'on"
      },
      {
        title: "Нарпайский",
        val: "narpay"
      },
      {
        title: "Нурабадский",
        val: "nurobod"
      },
      {
        title: "Акдарьинский", 
        val: "oqdaryo"
      },
      {
        title: "Паярикский", 
        val: "payariq"
      },
      {
        title: "Пастдаргомский",  
        val: "pastdarg'om"
      },
      {
        title: "Пахтачинский",
        val: "paxtachi"
      },
      {
        title: "Самаркандский",
        val: "samarqand-tuman"
      },
      {
        title: "Тайлякский",
        val: "toyloq"
      },
      {
        title: "Ургутский",
        val: "urgut"
      },
      {
        title: "Кошрабатский",
        val: "qo'shrabot"
      }
    ]
  },
  {
    title: "Каракалпакстан",
    val: "qoraqalpog'iston",
    regions: [
      {
        title: "город Нукус",  // city in Qoraqalpog'iston
        val: "nukus"
      },
      {
        title: "Амударьинский", 
        val: "amudaryo"
      },
      {
        title: "Берунийский", 
        val: "beruniy"
      },
      {
        title: "Элликкалинский", 
        val: "ellikqala"
      },
      {
        title: "Канлыкульский", 
        val: "qonliko'l"
      },
      {
        title: "Караузякский", 
        val: "qorao'zak"
      },
      {
        title: "Кегейлийский",
        val: "kegeyli"
      },
      {
        title: "Кунградский",
        val: "qo'ng'irot"
      },
      {
        title: "Муйнакский", 
        val: "moynoq"
      },
      {
        title: "Нукусский", // district in Qoraqalpog'iston
        val: "nukus-tuman"
      },
      {
        title: "Тахтакупырский",  
        val: "taxtako'pir"
      },
      {
        title: "Турткульский",
        val: "to'rtko'l"
      },
      {
        title: "Ходжалинский",
        val: "xo'jayli"
      },
      {
        title: "Чимбайский",
        val: "chimboy"
      },
      {
        title: "Шуманайский",
        val: "shumanay"
      },
      {
        title: "Тахиаташский",
        val: "taxiatosh"
      }
    ]
  },
  {
    title: "Кашкадарья",
    val: "qashqadaryo",
    regions: [
      {
        title: "город Карши",  // city in Qashqadaryo
        val: "qarshi"
      },
      {
        title: "Гузарский", 
        val: "g'uzor"
      },
      {
        title: "Дехканабадский", 
        val: "dexqonobod"
      },
      {
        title: "Камашинский", 
        val: "qamashi"
      },
      {
        title: "Каршинский", // district
        val: "qarshi-tuman"
      },
      {
        title: "Касбийский", 
        val: "kasbi"
      },
      {
        title: "Китабский",
        val: "kitob"
      },
      {
        title: "Касанский",
        val: "koson"
      },
      {
        title: "Миришкорский", 
        val: "mirishkor"
      },
      {
        title: "Мубарекский", 
        val: "muborak"
      },
      {
        title: "Нишанский",  
        val: "nishon"
      },
      {
        title: "город Шахрисабз", // city in Qashqadaryo
        val: "shahrisabz"
      },
      {
        title: "Шахрисабзский", // district
        val: "shahrisabz-tuman"
      },
      {
        title: "Чиракчинский",
        val: "chiroqchi"
      },
      {
        title: "Яккабагский",
        val: "yakkabog'"
      }
    ]
  },
  {
    title: "Навои",
    val: "navoiy",
    regions: [
      {
        title: "город Навои",  // city in Navoiy 
        val: "qarshi"
      },
      {
        title: "город Зарафшан",  
        val: "zarafshon"
      },
      {
        title: "Карманинский", 
        val: "karmana"
      },
      {
        title: "Навбахорский", 
        val: "navbahor"
      },
      {
        title: "Канимехский", 
        val: "konimex"
      },
      {
        title: "Кызылтепинский", 
        val: "qiziltepa"
      },
      {
        title: "Нуратинский",
        val: "nurota"
      },
      {
        title: "Хатырчинский",
        val: "xatirchi"
      },
      {
        title: "Учкудукский", 
        val: "uchquduq"
      },
      {
        title: "Тамдынский", 
        val: "tomdi"
      }
    ]
  },
  {
    title: "Хорезм",
    val: "xorazm",
    regions: [
      {
        title: "город Ургенч",  // city in Xorazm
        val: "urganch"
      },
      {
        title: "город Хива",  // city in Xorazm
        val: "xiva"
      },
      {
        title: "Багатский", 
        val: "bog'ot"
      },
      {
        title: "Кошкупырский", 
        val: "qo'shko'pir"
      },
      {
        title: "Хазараспский", 
        val: "hazorasp"
      },
      {
        title: "Хивинский",  // district
        val: "xiva-tuman"
      },
      {
        title: "Ханкинский",
        val: "xonqa"
      },
      {
        title: "Ургенчский", // district
        val: "urganch-tuman"
      },
      {
        title: "Шаватский", 
        val: "shovot"
      },
      {
        title: "Янгиарыкский", 
        val: "yangiariq"
      },
      {
        title: "Янгибазарский",
        val: "yangibozor"
      },
      {
        title: "Гурленский",
        val: "gurlan"
      }
    ]
  },
  {
    title: "Джизак",
    val: "jizzax",
    regions: [
      {
        title: "город Джизак",  // city in Jizzax
        val: "jizzax"
      },
      {
        title: "Бахмальский",  
        val: "baxmal"
      },
      {
        title: "Дустликский", 
        val: "do'stlik"
      },
      {
        title: "Галляаральский",
        val: "g'allaorol"
      },
      {
        title: "Шараф-Рашидовский", 
        val: "sharof-rashidov"
      },
      {
        title: "Зарбдарский", 
        val: "zarbdor"
      },
      {
        title: "Зафарабадский",  
        val: "zafarobod"
      },
      {
        title: "Зааминский",
        val: "zomin"
      },
      {
        title: "Пахтакорский", 
        val: "paxtakor"
      },
      {
        title: "Мирзачульский", 
        val: "mirzacho'l"
      },
      {
        title: "Фаришский", 
        val: "forish"
      },
      {
        title: "Янгиабадский",
        val: "yangiobod"
      }
    ]
  },
  {
    title: "Бухара",
    val: "buxoro",
    regions: [
      {
        title: "город Бухара",  // city in Buxoro
        val: "buxoro"
      },
      {
        title: "Бухарский",  // district
        val: "buxoro-tuman"
      },
      {
        title: "Ромитанский", 
        val: "romitan"
      },
      {
        title: "Жондорский",
        val: "jondor"
      },
      {
        title: "Каракульский", 
        val: "qorako'l"
      },
      {
        title: "Алатский", 
        val: "olot"
      },
      {
        title: "город Каган",  
        val: "kogon"
      },
      {
        title: "Каганский",
        val: "kogon-tuman"
      },
      {
        title: "Караулбазарский", 
        val: "qorovulbozor"
      },
      {
        title: "Пешкунский", 
        val: "peshko'"
      },
      {
        title: "Вабкентский", 
        val: "vobkent"
      },
      {
        title: "Шафирканский",
        val: "shofirkon"
      },
      {
        title: "Гиждуванский",
        val: "g'ijduvon"
      }
    ]
  }
];

export default regions;