
// dealer names
var maleFirstNames = ['Aidan', 'Alphonso', 'Anthony', 'Avon', 'Ben', 'Billy', 'Bobby', 'Bojack', 'Bret', 'Bruce', 'Cedric', 'Charles', 'Charlie', 'Chris', 'Clarence', 'Clark', 'Dave', 'David', 'Dexter', 'Drexyl', 'Eddie', 'Floyd', 'Frank', 'Freddie', 'Gerald', 'Gordon', 'Ilka', 'James', 'Jeff', 'Jethro', 'Jimmy', 'John', 'Ken', 'Kingston', 'Larry', 'Laurence', 'Leeroy', 'Lester', 'Malcolm', 'Marty', 'Maxwell', 'Michael', 'Mike', 'Paul', 'Pete', 'Randy', 'Ray', 'Reggie', 'Rick', 'Robert', 'Roland', 'Ron', 'Ronnie', 'Ross', 'Sean', 'Spencer', 'Spike', 'Steve', 'Stevie', 'Stringer', 'Stu', 'Stuart', 'Terry', 'Thomas', 'Tommy', 'Tony', 'William', 'Brian'];
var femaleFirstNames = ['Alicia', 'Amanda', 'Ashley', 'Barbara', 'Becky', 'Beverly', 'Catriona', 'Charlotte', 'Debbie', 'Eve', 'Fiona', 'Francesca', 'Geraldine', 'Harriet', 'Jacki', 'Jane', 'Jenny', 'Jessica', 'Joanne', 'Jodie', 'Josie', 'Julia', 'June', 'Kate', 'Kim', 'Kimmy', 'Laura', 'Lisa', 'Liz', 'Louisa', 'Louise', 'Margaret', 'Martina', 'Mary', 'Muriel', 'Natasha', 'Nicki', 'Pam', 'Patricia', 'Rachel', 'Rebecca', 'Rebel', 'Rhonda', 'Riley', 'Rose', 'Ruby', 'Samantha', 'Sarah', 'Scarlet', 'Shannon', 'Sharon', 'Sophie', 'Stacy', 'Stephanie', 'Susie', 'Tabitha', 'Tanya', 'Toni', 'Tracy', 'Tricia', 'Trish', 'Vera', 'Victoria', 'Yolanda', 'Michelle', 'Felicity'];
var lastNames = ['Adams', 'Barksdale', 'Baxter', 'Bell', 'Braxton', 'Bronson', 'Cray', 'Diamond', 'Edwards', 'Findus', 'Ford', 'Fox', 'Franklin', 'French', 'Gentworth', 'George', 'Gibson', 'Gittins', 'Grey', 'Grimes', 'Harrison', 'Hogan', 'Hopkins', 'Jackson', 'Jenkins', 'Jones', 'Lee', 'Lloyd', 'Long', 'Mackintosh', 'Manero', 'Marshall', 'Matrix', 'McGrath', 'McLaren', 'Mills', 'Moreno', 'Murphy', 'Page', 'Palmer', 'Perry', 'Plant', 'Potts', 'Reed', 'Rhoades', 'Rico', 'Roper', 'Savage', 'Scott', 'Smith', 'Somerville', 'Stevens', 'Stewart', 'Sulley', 'Templeton', 'Thompson', 'Tull', 'Washington', 'Willis', 'Wilson', 'Worley', 'Young', 'Merchant', 'Rodriguez', 'Gonzalez', 'King'];
var nicknames = ['Ace', 'Babyface', 'Beefsteak', 'Big dog', 'Birdy', 'Blaster', 'Boffin', 'Bones', 'Brains', 'Brandy', 'Brick', 'Bubbles', 'Bug Eye', 'Butter', 'California', 'Cheese', 'Chips', 'Coffee', 'Corky', 'Crusher', 'Doc', 'Dolamite', 'Egg', 'Fingers', 'Fletch', 'Foxy', 'Frosty', 'G', 'Ghost', 'Goat', 'Grafter', 'Hollywood', 'Ice', 'Jellybean', 'Linebacker', 'Lucky', 'Maniac', 'Muscles', 'Papa', 'Psycho', 'Scarface', 'Shooter', 'Silencer', 'Slim', 'Snoop', 'Space Cadet', 'Spud', 'The Face', 'The Hat', 'The Kid', 'The Mouth', 'Unit', 'Upgrayedd', 'Vampire', 'Wheezy', 'Wonder'];

// constants
var treeUpgradeBasePrice = 1000;
var treeUpgradePriceMulti = 1.95;
var treeUpgradeWeedMulti = 1.2;

var territoryUpgradePriceMulti = 3.1;
var territoryUpgradeBasePrice = 2000;

function DealerUpgrade(name, tooltip, price, volumeMod, priceMod, secondaryMod) {
    this.name = name;
    this.tooltip = tooltip;
    this.price = price;
    this.volumeMod = volumeMod;
    this.priceMod = priceMod;
    this.secondaryMod = secondaryMod;
}

var dealerUpgrades = [
    new DealerUpgrade('Baseball bat', 'Handy in a street fight and helps to scare away the competition. Allows the dealer to sell drugs for 10% more money', 150, 1, 1.1, 0),
    new DealerUpgrade('Bicycle', 'The cheapest and most basic form of personal transportation. Allows the dealer to sell an extra 10% volume', 600, 1.1, 1, 0),
    new DealerUpgrade('iPhone 6 Plus', 'A state of the art smartphone. Allows the dealer to sell a small amount of other drugs on the side', 900, 1, 1, 0.1),
    new DealerUpgrade('Superbike', 'One of the fastest ways to get around the urban jungle. Allows the dealer to sell an extra 20% volume', 25000, 1.2, 1, 0),
    new DealerUpgrade('Glock 17 9mm', 'A small but deadly firearm, nobody will mess with you if you have this. Allows the dealer to sell drugs for 20% more money', 5000, 1, 1.2, 0),
    new DealerUpgrade('Personal Assistant', 'A personal assistant to take your calls. Allows the dealer to sell even more drugs on the side', 85000, 1, 1, 0.2),
    new DealerUpgrade('Armed Gang', 'A gang of tooled up homies to help eliminate the competition. Allows the dealer to sell drugs for 20% more money', 150000, 1, 1.2, 0),
    new DealerUpgrade('Ferrari 458 Italia', 'A fine Italian supercar. Allows the dealer to sell an extra 30% volume', 575000, 1.3, 1, 0),
    new DealerUpgrade('AW119 Ke Koala', 'A personal helicopter for transporting you and your homies! Allows the dealer to sell an extra 60% volume', 1890000, 1.6, 1, 0)
];

function ProductionUpgrade(name, tooltip, price, producer, upVal, drug) {
    this.type = 'ProductionUpgrade';
    this.name = name;
    this.tooltip = tooltip;
    this.price = price;
    this.producer = producer;
    this.upVal = upVal;
    this.drug = drug;
}
function DrugUnlock (name,tooltip,price,drug) {
    this.type = 'DrugUnlock';
    this.name = name;
    this.tooltip = tooltip;
    this.price = price;
    this.drug = drug;
}

var productionUpgradesMaster = [
    new ProductionUpgrade('Fertilizer', 'Nutrient rich fertilizer, increases the amount of weed produced by your cannabis plants by 30%!', 500, 'Cannabis Plant', 1.3, 'Weed'),
    new ProductionUpgrade('Hydroponics', 'High tech agriculture system, increases the amount of weed produced by your cannabis plants by 50%!', 25000, 'Cannabis Plant', 1.5, 'Weed'),
    new ProductionUpgrade('Auto Hygrometer', 'An automatically controlled humidity system, increases the amount of shrooms produced by your mushroom farms by 50%!', 5000, 'Mushroom Farm', 1.5, 'Magic Mushrooms'),
    new ProductionUpgrade('Irrigation system', 'An computer controlled irrigation system, increases the amount of shrooms produced by your mushroom farms by 50%!', 55000, 'Mushroom Farm', 1.5, 'Magic Mushrooms'),
    new ProductionUpgrade('Recreational Vehicle', 'Increases the amount of meth made by your cooks by 50%!', 60000, 'Meth Cook', 1.5, 'Meth'),
    new ProductionUpgrade('Underground Lab', 'Increases the amount of meth made by your cooks by 50%!', 230000, 'Meth Cook', 1.5, 'Meth'),
    new ProductionUpgrade('College education', 'Increases the amount of acid made by your lab technicians by 50%!', 120000, 'Lab Technician', 1.5, 'Acid'),
    new ProductionUpgrade('Digital Distillation', 'Increases the amount of acid made by your lab technicians by 50%!', 250000, 'Lab Technician', 1.5, 'Acid'),
    new ProductionUpgrade('Mass Spectrometer', 'Increases the amount of PCP made by your chemical labs by 70%!', 950000, 'Chemical Lab', 1.7, 'PCP'),
    new ProductionUpgrade('Haber process research', 'Increases the amount of PCP made by your chemical labs by 50%!', 190000, 'Chemical Lab', 1.5, 'PCP'),
    new ProductionUpgrade('Polytunnel complex', 'Increases the amount of heroin made by your opium farms by 50%!', 210000, 'Opium Farm', 1.5, 'Heroin'),
    new ProductionUpgrade('Cropdusting', 'Increases the amount of heroin made by your opium farms by 50%!', 750000, 'Opium Farm', 1.5, 'Heroin'),
    new ProductionUpgrade('Research Facility', 'Increases the amount of MDMA made by your chemistry professors by 40%!', 1000000, 'Chemistry Professor', 1.4, 'MDMA'),
    new ProductionUpgrade('PhD Students', 'A small army of PhD students to assist the professors in their important work. Increases the amount of MDMA made by your chemistry professors by 60%!', 250000, 'Chemistry Professor', 1.6, 'MDMA'),
    new ProductionUpgrade('Plastic surgery disguise', 'Increases the amount of cocaine smuggled by your drug mules by 30%!', 350000, 'Drug Mule', 1.3, 'Cocaine'),
    new ProductionUpgrade('Cartel deal', 'Increases the amount of cocaine smuggled by your drug mules by 80%!', 1500000, 'Drug Mule', 1.8, 'Cocaine')];

function Drug(name, pricePerGram, costToUnlock) {
    this.name = name;
    this.pricePerGram = pricePerGram;
    this.qty = 0;
    this.total = 0;
    this.selected = false;
    this.costToUnlock = costToUnlock;
    this.totalCash = 0;
}

var drugsMaster = [
    new Drug('Weed', 4.2, 0),
    new Drug('Magic Mushrooms', 6, 1500),
    new Drug('Meth', 10, 6000),
    new Drug('Acid', 20, 20000),
    new Drug('PCP', 30, 60000),
    new Drug('Heroin', 40, 100000),
    new Drug('MDMA', 50, 180000),
    new Drug('Cocaine', 60, 250000)];

function Producer(name, basePrice, drug, priceMulti, prodPerUnit) {
    this.name = name;
    this.basePrice = basePrice;
    this.qty = 0;
    this.drug = drug;
    this.priceMulti = priceMulti;
    this.prodPerUnit = prodPerUnit;
}

var productionMaster = [
    new Producer('Cannabis Plant', 15, 'Weed', 1.1, 0.1),
    new Producer('Mushroom Farm', 150, 'Magic Mushrooms', 1.15, 0.25),
    new Producer('Meth Cook', 1000, 'Meth', 1.2, 0.5),
    new Producer('Lab Technician', 3000, 'Acid', 1.22, 0.5),
    new Producer('Chemical Lab', 8000, 'PCP', 1.24, 0.4),
    new Producer('Opium Farm', 12000, 'Heroin', 1.26, 0.5),
    new Producer('Chemistry Professor', 15000, 'MDMA', 1.28, 0.4),
    new Producer('Drug Mule', 18000, 'Cocaine', 1.3, 0.3)];

function Dealer(seed) {
    this.seed = seed;
    Math.seedrandom(seed);
    this.volume = Math.random() + 0.5;
    this.price = Math.random() + 0.5;
    this.sideVolume = 0;

    this.male = true;
    this.name = maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)];
    if (Math.random() > 0.7) {
        this.male = false;
        this.name = femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)];
    }
    if (Math.random() > 0.9) {
        this.name = this.name + ' "' + nicknames[Math.floor(Math.random() * nicknames.length)] + '"';
    }
    this.name = this.name + ' ' + lastNames[Math.floor(Math.random() * lastNames.length)];
    this.cashEarned = 0;
    this.selected = false;
    this.drug = "Weed";
    this.upgrades = [];
    this.cashOneSecondAgo = 0;
    this.cashPerSecond = 0;
}

function getActualDealerPrice(dealer, drug) { return dealer.price * drug.pricePerGram; }
function getActualDealerVolume(dealer, drug) {
    if (drug == dealer.drug || drug.name == dealer.drug)
        return dealer.volume * 3;
    else
        return dealer.sideVolume * dealer.volume * 3;
}

function GameModel() {
    this.drugs = [drugsMaster[0]];
    this.upgrades = [];
    this.currencyCode = '$';
    this.cash = 100;
    this.totalCashEarned = 0;
    this.treeUpgrades = 0;
    this.dealers = [];
    this.production = productionMaster
    this.territoryUpgrades = 0;
    this.workMode = false;
}

angular.module('dopeslingerApp', ['ngSanitize', 'ui.bootstrap'])
    .filter('weight', function () {
        return function (input) {
            if (input > 1000)
                return (input / 1000).toFixed(2) + 'kg';

            return input.toFixed(2) + "g";
        }
    })
    .filter('money', function () {
        return function (input) {
            var symbol = '$';
            if (input > 1000000000000)
                return symbol + (input / 1000000000000).toFixed(2) + 'T';
            if (input > 1000000000)
                return symbol + (input / 1000000000).toFixed(2) + 'B';
            if (input > 1000000)
                return symbol + (input / 1000000).toFixed(2) + 'M';
            if (input > 1000)
                return symbol + (input / 1000).toFixed(2) + 'K';

            return symbol + input.toFixed(2);
        }
    })
    .controller('DopeController', ['$scope', '$document', '$window', '$sce', '$interval', '$timeout', function ($scope, $document, $window, $sce, $interval, $timeout) {

        var lastUpdate = 0;
        var lastSaved = 0;
        var interval;
        var cashOneSecond = 0;
        var timeOneSecond = 0;

        $scope.log = [];

        $scope.gameModel = new GameModel();
        $scope.cashPerSecond = 0;
        $scope.hireDealers = [];
        $scope.toggleWorkMode = function () { $scope.gameModel.workMode = !$scope.gameModel.workMode; }
        $scope.priceOfTerritory = function () { return territoryUpgradeBasePrice * Math.pow(territoryUpgradePriceMulti, $scope.gameModel.territoryUpgrades); }
        $scope.cashPercentage = function (value) { return Math.min(100, $scope.gameModel.cash / value * 100); }
        $scope.productionPrice = function (production) { return production.basePrice * Math.pow(production.priceMulti, production.qty); }
        $scope.availableUpgrades = [];

        $scope.getDrugByName = function (name) {
            for (var i = 0; i < $scope.gameModel.drugs.length; i++) {
                if ($scope.gameModel.drugs[i].name == name)
                    return $scope.gameModel.drugs[i];
            }
            return null;
        }

        $scope.actualDealerVolume = function (dealer, drug) { return getActualDealerVolume(dealer, drug); }
        $scope.actualDealerPrice = function (dealer) { return getActualDealerPrice(dealer, $scope.getDrugByName(dealer.drug)); }
        $scope.drugStreetPrice = function (drug) { return drug.pricePerGram; }

        $scope.calculateAvailableUpgrades = function () {
            $scope.availableUpgrades = [];
            for (var i = 0; i < drugsMaster.length; i++) {
                var drugUnlocked = false;

                if ($scope.getDrugByName(drugsMaster[i].name) != null)
                    drugUnlocked = true;

                if (!drugUnlocked && (i > 0 && $scope.getDrugByName(drugsMaster[i - 1].name) != null) && $scope.gameModel.totalCashEarned > drugsMaster[i].costToUnlock) {
                    $scope.availableUpgrades.push(new DrugUnlock('Research ' + drugsMaster[i].name, 'Spend money to research production of a new drug, ' + drugsMaster[i].name + '. Your customers will love it!', drugsMaster[i].costToUnlock, drugsMaster[i].name));
                }
            }
            for (var i = 0; i < productionUpgradesMaster.length; i++) {
                var upgradeUnlocked = false;
                for (var j = 0; j < $scope.gameModel.upgrades.length; j++) {
                    if ($scope.gameModel.upgrades[j].name == productionUpgradesMaster[i].name)
                        upgradeUnlocked = true;
                }
                if (!upgradeUnlocked && $scope.getDrugByName(productionUpgradesMaster[i].drug) != null && $scope.gameModel.totalCashEarned > productionUpgradesMaster[i].price) {
                    $scope.availableUpgrades.push(productionUpgradesMaster[i]);
                }
            }
        }

        $scope.purchaseUpgrade = function (upgrade) {
            if ($scope.gameModel.cash < upgrade.price)
                return;

            switch (upgrade.type) {
                case 'DrugUnlock':
                    for (var i = 0; i < drugsMaster.length; i++) {
                        if (drugsMaster[i].name == upgrade.drug) {
                            $scope.gameModel.drugs.push(drugsMaster[i]);
                        }
                    }
                    break;
                case 'ProductionUpgrade':
                    for (var i = 0; i < $scope.gameModel.production.length; i++) {
                        if ($scope.gameModel.production[i].name == upgrade.producer) {
                            $scope.gameModel.production[i].prodPerUnit *= upgrade.upVal;
                            $scope.gameModel.upgrades.push(upgrade);
                        }
                    }
                    break;
            }
            $scope.gameModel.cash -= upgrade.price;
            $scope.calculateAvailableUpgrades();
            writeToCookie();
        }

        $scope.increaseProduction = function (production) {
            if ($scope.gameModel.cash > $scope.productionPrice(production)) {
                $scope.gameModel.cash = $scope.gameModel.cash - $scope.productionPrice(production);
                production.qty++;
                writeToCookie();
            }
        }

        $scope.producersForDrug = function (drug) {
            var producers = [];
            for (var i = 0; i < $scope.gameModel.production.length; i++) {
                if ($scope.gameModel.production[i].drug == drug.name)
                    producers.push($scope.gameModel.production[i]);
            }
            return producers;
        }

        function readFromCookie() {
            if (typeof (Storage) == "undefined") {
                alert("no local storage! game cannot not be saved");
                return;
            }
            if (localStorage.getItem("gameModel") != null) $scope.gameModel = JSON.parse(localStorage.getItem("gameModel"));
        }

        function writeToCookie() {
            if (typeof (Storage) == "undefined") {
                alert("no local storage! game cannotWas there not be saved");
                return;
            }
            localStorage.setItem("gameModel", JSON.stringify($scope.gameModel));
        }

        $scope.drugMadePerSecond = function(drug) {
            var producers = $scope.producersForDrug(drug);
            var qty = 0;
            for (var j = 0; j < producers.length; j++) {
                qty += producers[j].qty * producers[j].prodPerUnit;
            }
            return qty;
        }

        $scope.drugSoldPerSecond = function (drug) {
            var qty = 0;
            for (var j = 0; j < $scope.gameModel.dealers.length; j++) {
                qty += getActualDealerVolume($scope.gameModel.dealers[j], drug);
            }
            return qty;
        }

        $scope.resetGame = function () {
            localStorage.clear();
            window.location.reload();
        }

        $scope.selectDrug = function (drug) {
            drug.selected = !drug.selected;                
        }

        $scope.selectDealer = function (dealer) {
            dealer.selected = !dealer.selected;
        }

        $scope.getStars = function (number, max) {
            var stars = "<span class='glyphicon glyphicon-star'></span>";
            for (var i = 0; i < Math.round((number - 0.5) * (max - 1)) ; i++) {
                stars = stars + "<span class='glyphicon glyphicon-star'></span>";
            }
            return stars;
        }

        $scope.dealerHired = function (dealerId) {
            for (var i = 0; i < $scope.gameModel.dealers.length; i++) {
                if ($scope.gameModel.dealers[i].seed == dealerId)
                    return true;
            }
            return false;
        }

        $scope.availableDealerUpgrades = [];
        var upgradeDealer;

        $scope.dealerUpgradeModal = function (dealer) {
            
            $scope.calculateAvailableDealerUpgrades(dealer);
            $('#upgradeDealerModal').modal('show');
        }

        $scope.calculateAvailableDealerUpgrades = function(dealer) {
            upgradeDealer = dealer;
            $scope.availableDealerUpgrades = [];

            for (var i = 0; i < dealerUpgrades.length; i++) {
                var alreadyBought = false;
                for (var j = 0; j < dealer.upgrades.length; j++) {
                    if (dealer.upgrades[j].name == dealerUpgrades[i].name)
                        alreadyBought = true;
                }
                if (!alreadyBought && $scope.gameModel.totalCashEarned > dealerUpgrades[i].price - 200)
                    $scope.availableDealerUpgrades.push(dealerUpgrades[i]);
            }
        }

        $scope.purchaseDealerUpgrade = function (upgrade) {
            if ($scope.gameModel.cash < upgrade.price)
                return;
            
            $scope.gameModel.cash -= upgrade.price;
            upgradeDealer.upgrades.push(upgrade);
            upgradeDealer.volume *= upgrade.volumeMod;
            upgradeDealer.price *= upgrade.priceMod;
            upgradeDealer.sideVolume += upgrade.secondaryMod;
            $scope.calculateAvailableDealerUpgrades(upgradeDealer);
            writeToCookie();
        }

        $scope.hireDealerModal = function () {
            var seed = (new Date().getTime() / 60000).toFixed();
            $scope.hireDealers = [new Dealer(seed), new Dealer(seed + 25), new Dealer(seed + 2001)];
            $('#hireDealerModal').modal('show');
        }

        $scope.hireDealer = function (seed) {
            $('#hireDealerModal').modal('hide');
            if ($scope.gameModel.dealers.length < 1 + $scope.gameModel.territoryUpgrades && !$scope.dealerHired(seed)) {
                $scope.gameModel.dealers.push(new Dealer(seed));
                writeToCookie();
            } else {
                $timeout(function () {
                    $window.alert('You already have the maximum number of dealers working for you. Either fire a dealer or expand your territory to hire another.');
                });
            }
        }

        $scope.fireDealer = function (seed) {
            if ($window.confirm("Are you sure you want to fire this dealer?")) {
                var newDealerArray = [];
                for (var i = 0; i < $scope.gameModel.dealers.length; i++) {
                    if ($scope.gameModel.dealers[i].seed != seed) {
                        newDealerArray.push($scope.gameModel.dealers[i]);
                    }
                }
                $scope.gameModel.dealers = newDealerArray;
                writeToCookie();
            }   
        }


        $scope.expandTerritory = function () {
            var upgradeCost = territoryUpgradeBasePrice * Math.pow(territoryUpgradePriceMulti, $scope.gameModel.territoryUpgrades);
            if ($scope.gameModel.cash > upgradeCost) {
                $scope.gameModel.cash = $scope.gameModel.cash - upgradeCost;
                $scope.gameModel.territoryUpgrades++;
                writeToCookie();
            }
        }

        function update() {
            var updateTime = new Date().getTime();
            var timeDiff = (Math.min(1000, updateTime - lastUpdate)) / 1000;

            var cashEarned = 0;

            for (var i = 0; i < $scope.gameModel.drugs.length; i++) {
                var drug = $scope.gameModel.drugs[i];
                var producers = $scope.producersForDrug(drug);
                for (var j = 0; j < producers.length; j++) {
                    drug.qty += producers[j].qty * producers[j].prodPerUnit * timeDiff;
                    drug.total += producers[j].qty * producers[j].prodPerUnit * timeDiff;
                }

                for (var j = 0; j < $scope.gameModel.dealers.length; j++) {
                    if ($scope.gameModel.dealers[j].drug == drug.name && drug.qty >= getActualDealerVolume($scope.gameModel.dealers[j], drug) * timeDiff) {
                        cashEarned += getActualDealerPrice($scope.gameModel.dealers[j], drug) * getActualDealerVolume($scope.gameModel.dealers[j], drug) * timeDiff;
                        drug.qty -= getActualDealerVolume($scope.gameModel.dealers[j], drug) * timeDiff;
                        $scope.gameModel.dealers[j].cashEarned += getActualDealerPrice($scope.gameModel.dealers[j], drug) * getActualDealerVolume($scope.gameModel.dealers[j], drug) * timeDiff;
                    }
                }

                for (var j = 0; j < $scope.gameModel.dealers.length; j++) {
                    if ($scope.gameModel.dealers[j].drug != drug.name && drug.qty >= getActualDealerVolume($scope.gameModel.dealers[j], drug) * timeDiff) {
                        cashEarned += getActualDealerPrice($scope.gameModel.dealers[j], drug) * getActualDealerVolume($scope.gameModel.dealers[j], drug) * timeDiff;
                        drug.qty -= getActualDealerVolume($scope.gameModel.dealers[j], drug) * timeDiff;
                        $scope.gameModel.dealers[j].cashEarned += getActualDealerPrice($scope.gameModel.dealers[j], drug) * getActualDealerVolume($scope.gameModel.dealers[j], drug) * timeDiff;
                    }
                }
            }

            $scope.gameModel.cash = $scope.gameModel.cash + cashEarned;
            $scope.gameModel.totalCashEarned += cashEarned;

            lastUpdate = updateTime;
            if (updateTime - timeOneSecond >= 1000) {
                timeOneSecond = updateTime;
                $scope.cashPerSecond = $scope.gameModel.cash - cashOneSecond;
                cashOneSecond = $scope.gameModel.cash;

                for (var i = 0; i < $scope.gameModel.dealers.length; i++) {
                    $scope.gameModel.dealers[i].cashPerSecond = $scope.gameModel.dealers[i].cashEarned - $scope.gameModel.dealers[i].cashOneSecondAgo;
                    $scope.gameModel.dealers[i].cashOneSecondAgo = $scope.gameModel.dealers[i].cashEarned;
                }
            }

            if (lastSaved < updateTime - 30000) {
                writeToCookie();
                lastSaved = updateTime;
                $scope.calculateAvailableUpgrades();
            }
        }

        $document.ready(function () {
            readFromCookie();
            $scope.calculateAvailableUpgrades();
            $interval(update, 99);
        });

    }]);