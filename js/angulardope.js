
// dealer names
var maleFirstNames = ['Aidan', 'Alphonso', 'Anthony', 'Avon', 'Ben', 'Billy', 'Bobby', 'Bojack', 'Bret', 'Bruce', 'Cedric', 'Charles', 'Charlie', 'Chris', 'Clarence', 'Clark', 'Dave', 'David', 'Dexter', 'Drexyl', 'Eddie', 'Floyd', 'Frank', 'Freddie', 'Gerald', 'Gordon', 'Ilka', 'James', 'Jeff', 'Jethro', 'Jimmy', 'John', 'Ken', 'Kingston', 'Larry', 'Laurence', 'Leeroy', 'Lester', 'Malcolm', 'Marty', 'Maxwell', 'Michael', 'Mike', 'Paul', 'Pete', 'Randy', 'Ray', 'Reggie', 'Rick', 'Robert', 'Roland', 'Ron', 'Ronnie', 'Ross', 'Sean', 'Spencer', 'Spike', 'Steve', 'Stevie', 'Stringer', 'Stu', 'Stuart', 'Terry', 'Thomas', 'Tommy', 'Tony', 'William', 'Brian'];
var femaleFirstNames = ['Alicia', 'Amanda', 'Ashley', 'Barbara', 'Becky', 'Beverly', 'Catriona', 'Charlotte', 'Debbie', 'Eve', 'Fiona', 'Francesca', 'Geraldine', 'Harriet', 'Jacki', 'Jane', 'Jenny', 'Jessica', 'Joanne', 'Jodie', 'Josie', 'Julia', 'June', 'Kate', 'Kim', 'Kimmy', 'Laura', 'Lisa', 'Liz', 'Louisa', 'Louise', 'Margaret', 'Martina', 'Mary', 'Muriel', 'Natasha', 'Nicki', 'Pam', 'Patricia', 'Rachel', 'Rebecca', 'Rebel', 'Rhonda', 'Riley', 'Rose', 'Ruby', 'Samantha', 'Sarah', 'Scarlet', 'Shannon', 'Sharon', 'Sophie', 'Stacy', 'Stephanie', 'Susie', 'Tabitha', 'Tanya', 'Toni', 'Tracy', 'Tricia', 'Trish', 'Vera', 'Victoria', 'Yolanda', 'Michelle', 'Felicity'];
var lastNames = ['Adams', 'Barksdale', 'Baxter', 'Bell', 'Braxton', 'Bronson', 'Cray', 'Diamond', 'Edwards', 'Findus', 'Ford', 'Fox', 'Franklin', 'French', 'Gentworth', 'George', 'Gibson', 'Gittins', 'Grey', 'Grimes', 'Harrison', 'Hogan', 'Hopkins', 'Jackson', 'Jenkins', 'Jones', 'Lee', 'Lloyd', 'Long', 'Mackintosh', 'Manero', 'Marshall', 'Matrix', 'McGrath', 'McLaren', 'Mills', 'Moreno', 'Murphy', 'Page', 'Palmer', 'Perry', 'Plant', 'Potts', 'Reed', 'Rhoades', 'Rico', 'Roper', 'Savage', 'Scott', 'Smith', 'Somerville', 'Stevens', 'Stewart', 'Sulley', 'Templeton', 'Thompson', 'Tull', 'Washington', 'Willis', 'Wilson', 'Worley', 'Young', 'Merchant', 'Rodriguez', 'Gonzalez', 'King'];
var nicknames = ['Ace', 'Babyface', 'Beefsteak', 'Big dog', 'Birdy', 'Blaster', 'Boffin', 'Bones', 'Brains', 'Brandy', 'Brick', 'Bubbles', 'Bug Eye', 'Butter', 'California', 'Cheese', 'Chips', 'Coffee', 'Corky', 'Crusher', 'Doc', 'Dolamite', 'Egg', 'Fingers', 'Fletch', 'Foxy', 'Frosty', 'G', 'Ghost', 'Goat', 'Grafter', 'Hollywood', 'Ice', 'Jellybean', 'Linebacker', 'Lucky', 'Maniac', 'Muscles', 'Papa', 'Psycho', 'Scarface', 'Shooter', 'Silencer', 'Slim', 'Snoop', 'Space Cadet', 'Spud', 'The Face', 'The Hat', 'The Kid', 'The Mouth', 'Unit', 'Upgrayedd', 'Vampire', 'Wheezy', 'Wonder'];

// constants
var treeUpgradeBasePrice = 1000;
var treeUpgradePriceMulti = 1.95;
var treeUpgradeWeedMulti = 1.2;

var territoryUpgradePriceMulti = 3.95;
var territoryUpgradeBasePrice = 2000;

function ProductionUpgrade(name, tooltip, price, producer, upVal) {
    this.type = 'ProductionUpgrade';
    this.name = name;
    this.tooltip = tooltip;
    this.price = price;
    this.producer = producer;
    this.upVal = upVal;
}
function DrugUnlock (name,tooltip,price,drug) {
    this.type = 'DrugUnlock';
    this.name = name;
    this.tooltip = tooltip;
    this.price = price;
    this.drug = drug;
}

var upgradesMaster = [
    new ProductionUpgrade('Fertilizer', 'Increases the amount of weed produced by your cannabis plants by 30%!', 2000, 'Cannabis Plant', 1.3),
    new ProductionUpgrade('Hydroponics', 'Increases the amount of weed produced by your cannabis plants by 50%!', 25000, 'Cannabis Plant', 1.5),
    new ProductionUpgrade('Recreational Vehicle', 'Increases the amount of meth made by your cooks by 50%!', 80000, 'Meth Cook', 1.5),
    new ProductionUpgrade('Underground Lab', 'Increases the amount of meth made by your cooks by 50%!', 800000, 'Meth Cook', 1.5) ];

function Drug(name, pricePerGram, costToUnlock) {
    this.name = name;
    this.pricePerGram = pricePerGram;
    this.qty = 0;
    this.total = 0;
    this.selected = false;
    this.costToUnlock = costToUnlock;
}

var drugsMaster = [new Drug('Weed', 4, 0), new Drug('Cocaine', 60, 150000), new Drug('Meth', 10, 10000), new Drug('PCP', 30, 50000)];

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
    new Producer('Drug Mule', 10000, 'Cocaine', 1.4, 0.3),
    new Producer('Meth Cook', 5000, 'Meth', 1.25, 0.5),
    new Producer('Chemical Lab', 80000, 'PCP', 1.2, 0.4)];

function Dealer(seed) {
    this.seed = seed;
    Math.seedrandom(seed);
    this.volume = Math.random() + 0.5;
    this.price = Math.random() + 0.5;

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
}

function getActualDealerPrice(dealer, drug) { return dealer.price * drug.pricePerGram; }
function getActualDealerVolume(dealer) { return dealer.volume * 3; }

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

        $scope.actualDealerVolume = function (dealer) { return getActualDealerVolume(dealer); }
        $scope.actualDealerPrice = function (dealer) { return getActualDealerPrice(dealer, $scope.getDrugByName(dealer.drug));}

        $scope.calculateAvailableUpgrades = function () {
            $scope.availableUpgrades = [];
            for (var i = 0; i < drugsMaster.length; i++) {
                var drugUnlocked = false;

                if ($scope.getDrugByName(drugsMaster[i].name) != null)
                    drugUnlocked = true;

                if (!drugUnlocked) {
                    $scope.availableUpgrades.push(new DrugUnlock('Research ' + drugsMaster[i].name, 'Spend money to research production of a new drug; ' + drugsMaster[i].name + '. Your customers will love it!', drugsMaster[i].costToUnlock, drugsMaster[i].name));
                }
            }
            for (var i = 0; i < upgradesMaster.length; i++) {
                var upgradeUnlocked = false;
                for (var j = 0; j < $scope.gameModel.upgrades.length; j++) {
                    if ($scope.gameModel.upgrades[j].name == upgradesMaster[i].name)
                        upgradeUnlocked = true;
                }
                if (!upgradeUnlocked) {
                    $scope.availableUpgrades.push(upgradesMaster[i]);
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
            $scope.writeToCookie();
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
                if ($scope.gameModel.dealers[j].drug == drug.name)
                    qty += getActualDealerVolume($scope.gameModel.dealers[j]);
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

        $scope.hireDealerModal = function () {
            var seed = (new Date().getTime() / 60000).toFixed();
            $scope.hireDealers = [new Dealer(seed), new Dealer(seed + 25), new Dealer(seed + 2001)];
            $('#hireDealerModal').modal('show');
        }

        $scope.hireDealer = function (seed) {
            $('#hireDealerModal').modal('hide');
            if ($scope.gameModel.dealers.length < 1 + $scope.gameModel.territoryUpgrades && !$scope.dealerHired(seed)) {
                $scope.gameModel.dealers.push(new Dealer(seed));
            } else {
                $timeout(function () {
                    $window.alert('You already have the maximum number of dealers working for you. Either fire a dealer or expand your territory to hire another.');
                });
            }
        }

        $scope.fireDealer = function (seed) {
            var newDealerArray = [];
            for (var i = 0; i < $scope.gameModel.dealers.length; i++) {
                if ($scope.gameModel.dealers[i].seed != seed) {
                    newDealerArray.push($scope.gameModel.dealers[i]);
                }
            }
            $scope.gameModel.dealers = newDealerArray;
            writeToCookie();
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
                    if ($scope.gameModel.dealers[j].drug == drug.name && drug.qty >= getActualDealerVolume($scope.gameModel.dealers[j]) * timeDiff) {
                        cashEarned += getActualDealerPrice($scope.gameModel.dealers[j], drug) * getActualDealerVolume($scope.gameModel.dealers[j]) * timeDiff;
                        drug.qty -= getActualDealerVolume($scope.gameModel.dealers[j]) * timeDiff;
                        $scope.gameModel.dealers[j].cashEarned += getActualDealerPrice($scope.gameModel.dealers[j], drug) * getActualDealerVolume($scope.gameModel.dealers[j]) * timeDiff;
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
            }

            if (lastSaved < updateTime - 30000) {
                writeToCookie();
                lastSaved = updateTime;
            }
        }

        $document.ready(function () {
            readFromCookie();
            $scope.calculateAvailableUpgrades();
            $interval(update, 99);
        });

    }]);