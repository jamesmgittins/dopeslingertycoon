angular.module('dopeslingerApp', [])
    .controller('DopeController', ['$scope', '$document', function ($scope, $document) {

        var maleFirstNames = ['Aidan', 'Alphonso', 'Anthony', 'Avon', 'Ben', 'Billy', 'Bobby', 'Bojack', 'Bret', 'Bruce', 'Cedric', 'Charles', 'Charlie', 'Chris', 'Clarence', 'Clark', 'Dave', 'David', 'Dexter', 'Drexyl', 'Eddie', 'Floyd', 'Frank', 'Freddie', 'Gerald', 'Gordon', 'Ilka', 'James', 'Jeff', 'Jethro', 'Jimmy', 'John', 'Ken', 'Kingston', 'Larry', 'Laurence', 'Leeroy', 'Lester', 'Malcolm', 'Marty', 'Maxwell', 'Michael', 'Mike', 'Paul', 'Pete', 'Randy', 'Ray', 'Reggie', 'Rick', 'Robert', 'Roland', 'Ron', 'Ronnie', 'Ross', 'Sean', 'Spencer', 'Spike', 'Steve', 'Stevie', 'Stringer', 'Stu', 'Stuart', 'Terry', 'Thomas', 'Tommy', 'Tony', 'William', 'Brian'];
        var femaleFirstNames = ['Alicia', 'Amanda', 'Ashley', 'Barbara', 'Becky', 'Beverly', 'Catriona', 'Charlotte', 'Debbie', 'Eve', 'Fiona', 'Francesca', 'Geraldine', 'Harriet', 'Jacki', 'Jane', 'Jenny', 'Jessica', 'Joanne', 'Jodie', 'Josie', 'Julia', 'June', 'Kate', 'Kim', 'Kimmy', 'Laura', 'Lisa', 'Liz', 'Louisa', 'Louise', 'Margaret', 'Martina', 'Mary', 'Muriel', 'Natasha', 'Nicki', 'Pam', 'Patricia', 'Rachel', 'Rebecca', 'Rebel', 'Rhonda', 'Riley', 'Rose', 'Ruby', 'Samantha', 'Sarah', 'Scarlet', 'Shannon', 'Sharon', 'Sophie', 'Stacy', 'Stephanie', 'Susie', 'Tabitha', 'Tanya', 'Toni', 'Tracy', 'Tricia', 'Trish', 'Vera', 'Victoria', 'Yolanda', 'Michelle', 'Felicity'];
        var lastNames = ['Adams', 'Barksdale', 'Baxter', 'Bell', 'Braxton', 'Bronson', 'Cray', 'Diamond', 'Edwards', 'Findus', 'Ford', 'Fox', 'Franklin', 'French', 'Gentworth', 'George', 'Gibson', 'Gittins', 'Grey', 'Grimes', 'Harrison', 'Hogan', 'Hopkins', 'Jackson', 'Jenkins', 'Jones', 'Lee', 'Lloyd', 'Long', 'Mackintosh', 'Manero', 'Marshall', 'Matrix', 'McGrath', 'McLaren', 'Mills', 'Moreno', 'Murphy', 'Page', 'Palmer', 'Perry', 'Plant', 'Potts', 'Reed', 'Rhoades', 'Rico', 'Roper', 'Savage', 'Scott', 'Smith', 'Somerville', 'Stevens', 'Stewart', 'Sulley', 'Templeton', 'Thompson', 'Tull', 'Washington', 'Willis', 'Wilson', 'Worley', 'Young', 'Merchant', 'Rodriguez', 'Gonzalez', 'King'];
        var nicknames = ['Ace', 'Babyface', 'Beefsteak', 'Big dog', 'Birdy', 'Blaster', 'Boffin', 'Bones', 'Brains', 'Brandy', 'Brick', 'Bubbles', 'Bug Eye', 'Butter', 'California', 'Cheese', 'Chips', 'Coffee', 'Corky', 'Crusher', 'Doc', 'Dolamite', 'Egg', 'Fingers', 'Fletch', 'Foxy', 'Frosty', 'G', 'Ghost', 'Goat', 'Grafter', 'Hollywood', 'Ice', 'Jellybean', 'Linebacker', 'Lucky', 'Maniac', 'Muscles', 'Papa', 'Psycho', 'Scarface', 'Shooter', 'Silencer', 'Slim', 'Snoop', 'Space Cadet', 'Spud', 'The Face', 'The Hat', 'The Kid', 'The Mouth', 'Unit', 'Upgrayedd', 'Vampire', 'Wheezy', 'Wonder'];

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
        Dealer.prototype.getActualVolume = function () {
            return this.volume * dealerConversion;
        }
        Dealer.prototype.getActualPrice = function () {
            return this.price * dealerMulti;
        }

        var interval;

        $scope.cash = 100;
        $scope.cashForDisplay = function () { return '$' + $scope.formatMoney(cash);}

        var totalCashEarned = 0;

        var weed = 0;
        $scope.weedForDisplay = function () { return $scope.formatDrugs(weed); }
        var totalWeedGrown = 0;

        var trees = 0;
        var treeBasePrice = 15;

        var baseWeedPerTree = 0.0001;

        var treeUpgrades = 0;

        var treePriceMulti = 1.1;

        var treeUpgradeBasePrice = 1000;

        var treeUpgradePriceMulti = 1.95;

        var treeUpgradeWeedMulti = 1.2;

        $scope.dealers = [];

        $scope.dealerUpgrades = 0;

        var dealerUpgradePriceMulti = 3.95;
        var dealerUpgradeBasePrice = 2000;
        var dealerConversion = 0.003;
        var dealerMulti = 4;

        var lastUpdate = 0;
        var lastSaved = 0;

        $scope.nsfw = true;
        $scope.toggleNsfw = function () {
            $scope.nsfw = !$scope.nsfw;
        }

        function readFromCookie() {
            console.log("reading from local storage");
            if (typeof (Storage) == "undefined") {
                console.log("no local storage!");
                return;
            }
            if (localStorage.getItem("cash") != null) $scope.cash = Number(localStorage.getItem("cash"));
            if (localStorage.getItem("totalCashEarned") != null) totalCashEarned = Number(localStorage.getItem("totalCashEarned"));
            if (localStorage.getItem("totalWeedGrown") != null) totalWeedGrown = Number(localStorage.getItem("totalWeedGrown"));
            if (localStorage.getItem("trees") != null) trees = Number(localStorage.getItem("trees"));
            if (localStorage.getItem("treeUpgrades") != null) treeUpgrades = Number(localStorage.getItem("treeUpgrades"));
            if (localStorage.getItem("dealerUpgrades") != null) dealerUpgrades = Number(localStorage.getItem("dealerUpgrades"));
            if (localStorage.getItem("dealers") != null) {
                var dealerSeeds = String(localStorage.getItem("dealers")).split(';');
                $scope.dealers = [];
                for (var index = 0; index < dealerSeeds.length; index++) {
                    $scope.dealers[index] = new Dealer(String(dealerSeeds[index]));
                }
            }
            if (localStorage.getItem("weed") != null) weed = Number(localStorage.getItem("weed"));
        }
        $scope.formatDrugs = function () {
            if (value > 1000)
                return (value / 1000).toFixed(2) + 'kg';

            return value.toFixed(2) + "g";
        }

        function writeToCookie() {
            console.log("writing to local storage")
            if (typeof (Storage) == "undefined") {
                console.log("no local storage!");
                return;
            }
            localStorage.setItem("cash", $scope.cash);
            localStorage.setItem("totalCashEarned", totalCashEarned);
            localStorage.setItem("totalWeedGrown", totalWeedGrown);
            localStorage.setItem("trees", trees);
            localStorage.setItem("treeUpgrades", treeUpgrades);
            var dealerString = "";
            for (var index = 0; index < $scope.dealers.length; index++) {
                dealerString = dealerString + ";" + $scope.dealers[index].seed;
            }
            console.log("saving: " + dealerString);
            localStorage.setItem("dealers", dealerString.substring(1));
            localStorage.setItem("dealerUpgrades", dealerUpgrades);
            localStorage.setItem("weed", weed);
        }

        $scope.resetGame = function() {
            localStorage.removeItem("cash");
            localStorage.removeItem("totalCashEarned");
            localStorage.removeItem("totalWeedGrown");
            localStorage.removeItem("trees");
            localStorage.removeItem("treeUpgrades");
            localStorage.removeItem("dealerUpgrades");
            localStorage.removeItem("dealers");
            localStorage.removeItem("weed");
            window.location.reload();
        }

        $scope.upgradeTrees = function() {

            var upgradeCost = treeUpgradeBasePrice * Math.pow(treeUpgradePriceMulti, treeUpgrades);
            if ($scope.cash > upgradeCost) {
                $scope.cash = $scope.cash - upgradeCost;
                treeUpgrades++;
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
            for (var i = 0; i < $scope.dealers.length; i++) {
                if ($scope.dealers[i].seed == dealerId)
                    return $scope.dealers[i];
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


        $scope.upgradeDealers = function() {
            var upgradeCost = dealerUpgradeBasePrice * Math.pow(dealerUpgradePriceMulti, dealerUpgrades);
            if ($scope.cash > upgradeCost) {
                $scope.cash = $scope.cash - upgradeCost;
                dealerUpgrades++;
                writeToCookie();
            }
        }

        $scope.buyTree = function () {
            console.log('buyTree');
            var treeCost = treeBasePrice * Math.pow(treePriceMulti, trees);
            if ($scope.cash > treeCost) {
                $scope.cash = $scope.cash - treeCost;
                trees++;
                writeToCookie();
            }
        }

        function update() {
            var updateTime = new Date().getTime();
            var timeDiff = (Math.min(1000, updateTime - lastUpdate));

            var cashEarned = 0;
            var cashSpent = 0;
            var weedGrown = trees * (baseWeedPerTree * Math.pow(treeUpgradeWeedMulti, treeUpgrades)) * (timeDiff);
            var weedSold = 0;

            for (var i = 0; i < $scope.dealers.length; i++) {
                if (weed + weedGrown - weedSold >= $scope.dealers[i].getActualVolume() * timeDiff) {
                    cashEarned += $scope.dealers[i].getActualPrice() * $scope.dealers[i].getActualVolume() * timeDiff;
                    weedSold += $scope.dealers[i].getActualVolume() * timeDiff;
                }
            }

            weed = weed + weedGrown - weedSold;
            $scope.cash = $scope.cash + cashEarned - cashSpent;

            totalWeedGrown += weedGrown;
            totalCashEarned += cashEarned;
            lastUpdate = updateTime;

            if (lastSaved < updateTime - 30000) {
                writeToCookie();
                lastSaved = updateTime;
            }
            $scope.$apply();
        }

        $document.ready(function () {
            readFromCookie();
            interval = setInterval(update, 90);
        });

    }]);