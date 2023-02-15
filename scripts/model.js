const Model = {
    main: {
        currency: 0,
        currencyPerClick: 1,
        currencyPerSecond: 0,
    },
    upgrades: {
        developer:{
            cost: 10,
            amount: 0,
            currencyPerSecond: 1,
            costMultiplier: 1.15,
        },
        lukesmith: {
            cost: 100,
            amount: 0,
            currencyPerSecond: 5,
            costMultiplier: 1.15,
        },
        joeblackburn: {
            cost: 1000,
            amount: 0,
            currencyPerSecond: 25,
            costMultiplier: 1.15,
        },        
        dmg04: {
            cost: 10000,
            amount: 0,
            currencyPerSecond: 125,
            costMultiplier: 1.15,
        },
        player1: {
            cost: 100000,
            amount: 0,
            currencyPerSecond: -625,
            costMultiplier: 0.01,
        },
    }
}