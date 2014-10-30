
// dealer names
var maleFirstNames = ['Aidan', 'Alphonso', 'Anthony', 'Avon', 'Ben', 'Billy', 'Bobby', 'Bojack', 'Bret', 'Bruce', 'Cedric', 'Charles', 'Charlie', 'Chris', 'Clarence', 'Clark', 'Dave', 'David', 'Dexter', 'Drexyl', 'Eddie', 'Floyd', 'Frank', 'Freddie', 'Gerald', 'Gordon', 'Ilka', 'James', 'Jeff', 'Jethro', 'Jimmy', 'John', 'Ken', 'Kingston', 'Larry', 'Laurence', 'Leeroy', 'Lester', 'Malcolm', 'Marty', 'Maxwell', 'Michael', 'Mike', 'Paul', 'Pete', 'Randy', 'Ray', 'Reggie', 'Rick', 'Robert', 'Roland', 'Ron', 'Ronnie', 'Ross', 'Sean', 'Spencer', 'Spike', 'Steve', 'Stevie', 'Stringer', 'Stu', 'Stuart', 'Terry', 'Thomas', 'Tommy', 'Tony', 'William', 'Brian'];
var femaleFirstNames = ['Alicia', 'Amanda', 'Ashley', 'Barbara', 'Becky', 'Beverly', 'Catriona', 'Charlotte', 'Debbie', 'Eve', 'Fiona', 'Francesca', 'Geraldine', 'Harriet', 'Jacki', 'Jane', 'Jenny', 'Jessica', 'Joanne', 'Jodie', 'Josie', 'Julia', 'June', 'Kate', 'Kim', 'Kimmy', 'Laura', 'Lisa', 'Liz', 'Louisa', 'Louise', 'Margaret', 'Martina', 'Mary', 'Muriel', 'Natasha', 'Nicki', 'Pam', 'Patricia', 'Rachel', 'Rebecca', 'Rebel', 'Rhonda', 'Riley', 'Rose', 'Ruby', 'Samantha', 'Sarah', 'Scarlet', 'Shannon', 'Sharon', 'Sophie', 'Stacy', 'Stephanie', 'Susie', 'Tabitha', 'Tanya', 'Toni', 'Tracy', 'Tricia', 'Trish', 'Vera', 'Victoria', 'Yolanda', 'Michelle', 'Felicity'];
var lastNames = ['Adams', 'Barksdale', 'Baxter', 'Bell', 'Braxton', 'Bronson', 'Cray', 'Diamond', 'Edwards', 'Findus', 'Ford', 'Fox', 'Franklin', 'French', 'Gentworth', 'George', 'Gibson', 'Gittins', 'Grey', 'Grimes', 'Harrison', 'Hogan', 'Hopkins', 'Jackson', 'Jenkins', 'Jones', 'Lee', 'Lloyd', 'Long', 'Mackintosh', 'Manero', 'Marshall', 'Matrix', 'McGrath', 'McLaren', 'Mills', 'Moreno', 'Murphy', 'Page', 'Palmer', 'Perry', 'Plant', 'Potts', 'Reed', 'Rhoades', 'Rico', 'Roper', 'Savage', 'Scott', 'Smith', 'Somerville', 'Stevens', 'Stewart', 'Sulley', 'Templeton', 'Thompson', 'Tull', 'Washington', 'Willis', 'Wilson', 'Worley', 'Young', 'Merchant', 'Rodriguez', 'Gonzalez', 'King'];
var nicknames = ['Ace', 'Babyface', 'Beefsteak', 'Big dog', 'Birdy', 'Blaster', 'Boffin', 'Bones', 'Brains', 'Brandy', 'Brick', 'Bubbles', 'Bug Eye', 'Butter', 'California', 'Cheese', 'Chips', 'Coffee', 'Corky', 'Crusher', 'Doc', 'Dolamite', 'Egg', 'Fingers', 'Fletch', 'Foxy', 'Frosty', 'G', 'Ghost', 'Goat', 'Grafter', 'Hollywood', 'Ice', 'Jellybean', 'Linebacker', 'Lucky', 'Maniac', 'Muscles', 'Papa', 'Psycho', 'Scarface', 'Shooter', 'Silencer', 'Slim', 'Snoop', 'Space Cadet', 'Spud', 'The Face', 'The Hat', 'The Kid', 'The Mouth', 'Unit', 'Upgrayedd', 'Vampire', 'Wheezy', 'Wonder'];

// constants
var treeBasePrice = 15;
var baseWeedPerTree = 0.0001;
var treePriceMulti = 1.1;
var treeUpgradeBasePrice = 1000;
var treeUpgradePriceMulti = 1.95;
var treeUpgradeWeedMulti = 1.2;

var territoryUpgradePriceMulti = 3.95;
var territoryUpgradeBasePrice = 2000;

function Producer(name, basePrice, drug) {
    this.name = name;
    this.basePrice = basePrice;
    this.qty = 0;
    this.drug = drug;
}

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
}

function getActualDealerPrice(dealer) { return dealer.price * 4; }
function getActualDealerVolume(dealer) { return dealer.volume * 0.003; }

function GameModel() {
    this.currencyCode = '$';
    this.cash = 100;
    this.totalCashEarned = 0;
    this.trees = 0;
    this.treeUpgrades = 0;
    this.weed = 0;
    this.totalWeedGrown = 0;
    this.dealers = [];
    this.territoryUpgrades = 0;
    this.workMode = true;
}

angular.module('dopeslingerApp', ['ngSanitize'])
    .controller('DopeController', ['$scope', '$document', '$window', '$sce', '$interval', '$timeout', function ($scope, $document, $window, $sce, $interval, $timeout) {

        var lastUpdate = 0;
        var lastSaved = 0;
        var interval;

        $scope.gameModel = new GameModel();

        $scope.hireDealers = [];

        $scope.cashForDisplay = function () { return $scope.gameModel.currencyCode + $scope.formatMoney($scope.gameModel.cash); }
        $scope.weedForDisplay = function () { return $scope.formatDrugs($scope.gameModel.weed); }
        $scope.toggleWorkMode = function () { $scope.gameModel.workMode = !$scope.gameModel.workMode; }
        $scope.weedPerSecond = function () { return  $scope.gameModel.trees * (baseWeedPerTree * Math.pow(treeUpgradeWeedMulti, $scope.gameModel.treeUpgrades)) * 1000 };
        $scope.treePrice = function () { return $scope.gameModel.currencyCode + $scope.formatMoney(treeBasePrice * Math.pow(treePriceMulti, $scope.gameModel.trees)); }
        $scope.treeProgressStyle = function() {return Math.min(100,($scope.gameModel.cash / (treeBasePrice * Math.pow(treePriceMulti, $scope.gameModel.trees)) * 100)) + '%'; }

        function readFromCookie() {
            console.log("reading from local storage");
            if (typeof (Storage) == "undefined") {
                alert("no local storage! game cannot not be saved");
                return;
            }
            if (localStorage.getItem("gameModel") != null) $scope.gameModel = JSON.parse(localStorage.getItem("gameModel"));
        }
        $scope.formatDrugs = function () {
            if (value > 1000)
                return (value / 1000).toFixed(2) + 'kg';

            return value.toFixed(2) + "g";
        }

        function writeToCookie() {
            console.log("writing to local storage")
            if (typeof (Storage) == "undefined") {
                alert("no local storage! game cannotWas there not be saved");
                return;
            }
            localStorage.setItem("gameModel", JSON.stringify($scope.gameModel));
        }

        $scope.resetGame = function() {
            localStorage.clear();
            window.location.reload();
        }

        $scope.upgradeTrees = function() {

            var upgradeCost = treeUpgradeBasePrice * Math.pow(treeUpgradePriceMulti, $scope.gameModel.treeUpgrades);
            if ($scope.cash > upgradeCost) {
                $scope.cash = $scope.cash - upgradeCost;
                $scope.gameModel.treeUpgrades++;
                writeToCookie();
            }
        }

        $scope.selectDealer = function (seed) {

            $('div.dealer.open > span.glyphicon').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
            var selected = $('div.dealer-ui[data-dealer-seed="' + seed + '"]');
            if (selected.find('div.dealer').hasClass('open')) {
                selected.find('div.dealer-content').slideUp(function () {
                    selected.find('div.dealer').removeClass('open');
                    selected.removeClass('open');
                });
            } else {
                $('div.dealer-content.open').slideUp(function () {
                    $('div.dealer.open').removeClass('open');
                });
                selected.find('div.dealer, div.dealer-content').addClass('open');
                $('div.dealer.open > span.glyphicon').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
                selected.find('div.dealer-content').slideDown();
            }
        }

        $scope.getStars = function(number, max) {
            var stars = "<span class='glyphicon glyphicon-star'></span>";
            for (var i = 0; i < Math.round((number - 0.5) * (max - 1)) ; i++) {
                stars = stars + "<span class='glyphicon glyphicon-star'></span>";
            }
            return stars;
        }

        function getDealerById(dealerId) {
            for (var i = 0; i < $scope.gameModel.dealers.length; i++) {
                if ($scope.gameModel.dealers[i].seed == dealerId)
                    return $scope.gameModel.dealers[i];
            }
            return null;
        }

        $scope.formatMoney = function(value) {
            if (value > 1000000000000)
                return (value / 1000000000000).toFixed(2) + 'T';
            if (value > 1000000000)
                return (value / 1000000000).toFixed(2) + 'B';
            if (value > 1000000)
                return (value / 1000000).toFixed(2) + 'M';
            if (value > 1000)
                return (value / 1000).toFixed(2) + 'K';

            return value.toFixed(2);
        }

        $scope.formatDrugs = function(value) {
            if (value > 1000)
                return (value / 1000).toFixed(2) + 'kg';

            return value.toFixed(2) + "g";
        }

        $scope.hireDealerModal = function () {
            var seed = (new Date().getTime() / 120000).toFixed();
            $scope.hireDealers = [new Dealer(seed), new Dealer(seed + 25), new Dealer(seed + 2001)];
            $('#hireDealerModal').modal('show');
        }

        $scope.hireDealer = function (seed) {
            $('#hireDealerModal').modal('hide');
            if ($scope.gameModel.dealers.length < 1 + $scope.gameModel.territoryUpgrades) {
                $scope.gameModel.dealers.push(new Dealer(seed));
            } else {
                $timeout(function () {
                    $window.alert('You already have the maximum number of dealers working for you. Either fire a dealer or expand your territory to hire another.');
                });
            }
        }

        $scope.fireDealer = function(seed) {
            var newDealerArray = [];
            for (var i = 0; i < $scope.gameModel.dealers.length; i++) {
                if ($scope.gameModel.dealers[i].seed != seed) {
                    newDealerArray.push($scope.gameModel.dealers[i]);
                }
            }
            $scope.gameModel.dealers = newDealerArray;
            writeToCookie();
        }


        $scope.upgradeDealers = function() {
            var upgradeCost = territoryUpgradeBasePrice * Math.pow(territoryUpgradePriceMulti, $scope.gameModel.territoryUpgrades);
            if ($scope.gameModel.cash > upgradeCost) {
                $scope.gameModel.cash = $scope.gameModel.cash - upgradeCost;
                $scope.gameModel.territoryUpgrades++;
                writeToCookie();
            }
        }

        $scope.buyTree = function () {
            console.log('buyTree');
            var treeCost = treeBasePrice * Math.pow(treePriceMulti, $scope.gameModel.trees);
            if ($scope.gameModel.cash > treeCost) {
                $scope.gameModel.cash = $scope.gameModel.cash - treeCost;
                $scope.gameModel.trees++;
                writeToCookie();
            }
        }

        function update() {
            var updateTime = new Date().getTime();
            var timeDiff = (Math.min(1000, updateTime - lastUpdate));

            var cashEarned = 0;
            var cashSpent = 0;
            var weedGrown = $scope.gameModel.trees * (baseWeedPerTree * Math.pow(treeUpgradeWeedMulti, $scope.gameModel.treeUpgrades)) * (timeDiff);
            var weedSold = 0;

            for (var i = 0; i < $scope.gameModel.dealers.length; i++) {
                if ($scope.gameModel.weed + weedGrown - weedSold >= getActualDealerVolume($scope.gameModel.dealers[i]) * timeDiff) {
                    cashEarned += getActualDealerPrice($scope.gameModel.dealers[i]) * getActualDealerVolume($scope.gameModel.dealers[i]) * timeDiff;
                    weedSold += getActualDealerVolume($scope.gameModel.dealers[i]) * timeDiff;
                }
            }

            $scope.gameModel.weed = $scope.gameModel.weed + weedGrown - weedSold;
            $scope.gameModel.cash = $scope.gameModel.cash + cashEarned - cashSpent;

            $scope.gameModel.totalWeedGrown += weedGrown;
            $scope.gameModel.totalCashEarned += cashEarned;
            lastUpdate = updateTime;

            if (lastSaved < updateTime - 30000) {
                writeToCookie();
                lastSaved = updateTime;
            }
        }

        $document.ready(function () {
            readFromCookie();
            $interval(update, 90);
        });

    }]);