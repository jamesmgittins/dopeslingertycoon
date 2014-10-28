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

var autoMode = false;
var cash = 100;
var totalCashEarned = 0;

var weed = 0;
var totalWeedGrown = 0;

var trees = 0;
var treeBasePrice = 15;

var baseWeedPerTree = 0.0001;

var treeUpgrades = 0;

var treePriceMulti = 1.1;

var treeUpgradeBasePrice = 1000;

var treeUpgradePriceMulti = 1.95;

var treeUpgradeWeedMulti = 1.2;

var dealers = [];

var dealerUpgrades = 0;

var dealerUpgradePriceMulti = 3.95;
var dealerUpgradeBasePrice = 2000;
var dealerConversion = 0.003;
var dealerMulti = 4;

var interval;
var lastUpdate = 0;
var lastSaved = 0;

function readFromCookie() {
    console.log("reading from local storage");
    if (typeof (Storage) == "undefined") {
        console.log("no local storage!");
        return;
    }
    if (localStorage.getItem("cash") != null) cash = Number(localStorage.getItem("cash"));
    if (localStorage.getItem("totalCashEarned") != null) totalCashEarned = Number(localStorage.getItem("totalCashEarned"));
    if (localStorage.getItem("totalWeedGrown") != null) totalWeedGrown = Number(localStorage.getItem("totalWeedGrown"));
    if (localStorage.getItem("trees") != null) trees = Number(localStorage.getItem("trees"));
    if (localStorage.getItem("treeUpgrades") != null) treeUpgrades = Number(localStorage.getItem("treeUpgrades"));
    if (localStorage.getItem("dealerUpgrades") != null) dealerUpgrades = Number(localStorage.getItem("dealerUpgrades"));
    if (localStorage.getItem("dealers") != null) {
        var dealerSeeds = String(localStorage.getItem("dealers")).split(';');
        dealers = [];
        for (var index = 0; index < dealerSeeds.length; index++) {
            dealers[index] = new Dealer(String(dealerSeeds[index]));
        }
    }
    if (localStorage.getItem("weed") != null) weed = Number(localStorage.getItem("weed"));
}

function writeToCookie() {
    console.log("writing to local storage")
    if (typeof (Storage) == "undefined") {
        console.log("no local storage!");
        return;
    }
    localStorage.setItem("cash", cash);
    localStorage.setItem("totalCashEarned", totalCashEarned);
    localStorage.setItem("totalWeedGrown", totalWeedGrown);
    localStorage.setItem("trees", trees);
    localStorage.setItem("treeUpgrades", treeUpgrades);
    var dealerString = "";
    for (var index = 0; index < dealers.length; index++) {
        dealerString = dealerString + ";" + dealers[index].seed;
    }
    console.log("saving: " + dealerString);
    localStorage.setItem("dealers", dealerString.substring(1));
    localStorage.setItem("dealerUpgrades", dealerUpgrades);
    localStorage.setItem("weed", weed);
}

function updateToolTipText(target, text) {
    if ($(target).data('bs.tooltip') && $(target).data('bs.tooltip').$tip) {
        $(target).attr('title', text).tooltip('fixTitle').data('bs.tooltip').$tip.find('.tooltip-inner').text(text);
    } else {
        $(target).tooltip({ title: text });
    }

}

function updateUI() {

    var treePrice = treeBasePrice * Math.pow(treePriceMulti, trees);

    var upgradePrice = treeUpgradeBasePrice * Math.pow(treeUpgradePriceMulti, treeUpgrades);

    var dealerUpgradePrice = dealerUpgradeBasePrice * Math.pow(dealerUpgradePriceMulti, dealerUpgrades);

    $('#cash').html(formatMoneyHtml(cash));
    updateToolTipText($('#cash'), 'Total cash earned $' + formatMoney(totalCashEarned));
    $('#weed').html(formatDrugs(weed));
    updateToolTipText($('#weed'), 'Total weed grown ' + formatDrugs(totalWeedGrown));

    $('#upgrade-dealer span.price').html(formatMoneyHtml(dealerUpgradePrice));


    if (dealerUpgradePrice > cash) {
        $('#upgrade-dealer').tooltip('hide');
        $('#upgrade-dealer').attr('disabled', 'disabled');
        $('#upgrade-dealer-progress').removeClass('progress-bar-success').addClass('active progress-bar-striped');
    } else {
        $('#upgrade-dealer').removeAttr('disabled');
        $('#upgrade-dealer-progress').addClass('progress-bar-success').removeClass('active progress-bar-striped');
    }

    $('.tree-price').each(function () {
        $(this).html(formatMoneyHtml(treePrice));
        if (treePrice > cash) {
	    $(this).closest('button').tooltip('hide');
            $(this).closest('button').attr('disabled', 'disabled');
            $('#tree-progress').removeClass('progress-bar-success').addClass('active progress-bar-striped');
        } else {
            $(this).closest('button').removeAttr('disabled');
            $('#tree-progress').addClass('progress-bar-success').removeClass('active progress-bar-striped');
        }
    });

    $('.upgrade-price').each(function () {
        $(this).html(formatMoneyHtml(upgradePrice));
        if (upgradePrice > cash) {
	    $(this).closest('button').tooltip('hide');
            $(this).closest('button').attr('disabled', 'disabled');
            $('#upgrade-progress').removeClass('progress-bar-success').addClass('active progress-bar-striped');
        } else {
            $(this).closest('button').removeAttr('disabled');
            $('#upgrade-progress').addClass('progress-bar-success').removeClass('active progress-bar-striped');
        }
    });
    $('#generating').html(formatDrugs(trees * baseWeedPerTree * Math.pow(treeUpgradeWeedMulti, treeUpgrades) * 1000));
    $('#generate_per_tree').html(formatDrugs(baseWeedPerTree * Math.pow(treeUpgradeWeedMulti, treeUpgrades) * 1000));
    $('#tree-progress').css('width', Math.min(100, (cash / (treeBasePrice * Math.pow(treePriceMulti, trees)) * 100)).toFixed(0) + '%');
    $('#upgrade-progress').css('width', Math.min(100, (cash / (treeUpgradeBasePrice * Math.pow(treeUpgradePriceMulti, treeUpgrades)) * 100)).toFixed(2) + '%');
    $('#upgrade-dealer-progress').css('width', Math.min(100, (cash / (dealerUpgradeBasePrice * Math.pow(dealerUpgradePriceMulti, dealerUpgrades)) * 100)).toFixed(2) + '%');
    $('#upgrades').html(treeUpgrades);
    $('#dealers').html(dealers.length);
    $('#hire-dealer-button span.dealer-count').html(dealers.length + '/' + (1 + dealerUpgrades));
    var weedSold = 0;
    var totalEarned = 0;
    for (var i = 0; i < dealers.length; i++) {
        weedSold += dealers[i].getActualVolume() * 1000;
        totalEarned += dealers[i].getActualVolume() * 1000 * dealers[i].getActualPrice();
    }
    $('#converting').html(formatDrugs(weedSold));
    $('#revenue').html(formatMoneyHtml(totalEarned));
    $('#trees').html(trees);
}

function update() {
    var updateTime = new Date().getTime();
    var timeDiff = (Math.min(1000, updateTime - lastUpdate));

    if (autoMode) {
        buyTree();
        upgradeTrees();
        upgradeDealers();
    }

    var cashEarned = 0;
    var cashSpent = 0;
    var weedGrown = trees * (baseWeedPerTree * Math.pow(treeUpgradeWeedMulti, treeUpgrades)) * (timeDiff);
    var weedSold = 0;

    for (var i = 0; i < dealers.length; i++) {
        if (weed + weedGrown - weedSold >= dealers[i].getActualVolume() * timeDiff) {
            cashEarned += dealers[i].getActualPrice() * dealers[i].getActualVolume() * timeDiff;
            weedSold += dealers[i].getActualVolume() * timeDiff;
        }
    }

    weed = weed + weedGrown - weedSold;
    cash = cash + cashEarned - cashSpent;

    totalWeedGrown += weedGrown;
    totalCashEarned += cashEarned;
    lastUpdate = updateTime;
    updateUI();
    if (lastSaved < updateTime - 30000) {
        writeToCookie();
        lastSaved = updateTime;
    }
}

function resetGame() {
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

function buyTree() {
    var treeCost = treeBasePrice * Math.pow(treePriceMulti, trees);
    if (cash > treeCost) {
        cash = cash - treeCost;
        trees++;
        writeToCookie();
    }
}

function updateDealersUI() {

    $('#dealer-ui').empty();
    for (var index = 0; index < dealers.length; index++) {
        $('#dealer-ui').append('<div class="dealer" data-dealer-seed="' + dealers[index].seed + '">' + dealers[index].name + '<span class="glyphicon glyphicon-chevron-down"><span></div>');
    }
    $('#dealer-ui div.dealer').click(function () {
        var dealerClicked = $(this);
        var dealer = getDealerById(dealerClicked.data('dealer-seed'));
        if (dealerClicked.hasClass('open')) {
            $('div.dealer-content').slideUp(function () {
                $('div.dealer-content').remove();
                $('div.dealer.open > span.glyphicon').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
                $('div.dealer.open').removeClass('open');
            });
            return;
        }
        $('div.dealer.open > span.glyphicon').removeClass('glyphicon-chevron-up').addClass('glyphicon-chevron-down');
        $('div.dealer.open').removeClass('open');
        dealerClicked.addClass('open');
        $('div.dealer.open > span.glyphicon').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
        if ($('div.dealer-content').length > 0) {
            $('div.dealer-content').slideUp(function () {
                $('div.dealer-content').remove();
                dealerClicked.after('<div class="dealer-content" style="display:none"><p>Volume: <span class="volume iconyellow"></span></p><p>Price: <span class="price iconyellow"></span></p><button class="btn btn-default" onclick="fireDealer(this)"><span class="glyphicon iconred glyphicon-user"></span>Fire ' + dealer.name.split(' ')[0] + '</button></div>');
                $('div.dealer-content').slideDown();
                $('#dealer-ui div.dealer-content span.volume').html(getStars(dealer.volume, 5));
                updateToolTipText($('#dealer-ui div.dealer-content span.volume'), 'Sells up to ' + formatDrugs(dealer.getActualVolume() * 1000) + ' of weed per second');
                $('#dealer-ui div.dealer-content span.price').html(getStars(dealer.price, 5));
                updateToolTipText($('#dealer-ui div.dealer-content span.price'), 'Sells each 1g of weed for $' + formatMoney(dealer.getActualPrice()));
                $('#dealer-ui div.dealer-content button').data('dealer-seed', dealer.seed);
            });
        } else {
            dealerClicked.after('<div class="dealer-content" style="display:none"><p>Volume: <span class="volume iconyellow"></span></p><p>Price: <span class="price iconyellow"></span></p><button class="btn btn-default" onclick="fireDealer(this)"><span class="glyphicon iconred glyphicon-user"></span>Fire ' + dealer.name.split(' ')[0] + '</button></div>');
            $('div.dealer-content').slideDown();
            $('#dealer-ui div.dealer-content span.volume').html(getStars(dealer.volume, 5));
            updateToolTipText($('#dealer-ui div.dealer-content span.volume'), 'Sells up to ' + formatDrugs(dealer.getActualVolume() * 1000) + ' of weed per second');
            $('#dealer-ui div.dealer-content span.price').html(getStars(dealer.price, 5));
            updateToolTipText($('#dealer-ui div.dealer-content span.price'), 'Sells each 1g of weed for $' + formatMoney(dealer.getActualPrice()));
            $('#dealer-ui div.dealer-content button').data('dealer-seed', dealer.seed);
        }
    });
}

function upgradeTrees() {

    var upgradeCost = treeUpgradeBasePrice * Math.pow(treeUpgradePriceMulti, treeUpgrades);
    if (cash > upgradeCost) {
        cash = cash - upgradeCost;
        treeUpgrades++;
        writeToCookie();
        updateToolTipText($('#buy-tree-btn'), 'Buy a tree, increasing your weed production by ' + formatDrugs(baseWeedPerTree * Math.pow(treeUpgradeWeedMulti, treeUpgrades) * 1000) + ' per second');
    }
}


function upgradeDealers() {
    var upgradeCost = dealerUpgradeBasePrice * Math.pow(dealerUpgradePriceMulti, dealerUpgrades);
    if (cash > upgradeCost) {
        cash = cash - upgradeCost;
        dealerUpgrades++;
        writeToCookie();
    }
}

function getStars(number, max) {
    var stars = "<span class='glyphicon glyphicon-star'></span>";
    for (var i = 0; i < Math.round((number - 0.5) * (max - 1)); i++) {
        stars = stars + "<span class='glyphicon glyphicon-star'></span>";
    }
    return stars;
}

function getDealerById(dealerId) {
    for (var i = 0; i < dealers.length; i++) {
        if (dealers[i].seed == dealerId)
            return dealers[i];
    }
    return null;
}

function createDealerToHire(dealer, selector) {
    $('#hireDealerModal ' + selector + ' .name').html(dealer.name);
    $('#hireDealerModal ' + selector + ' .volume').html(getStars(dealer.volume, 5));
    updateToolTipText($('#hireDealerModal ' + selector + ' .volume'), 'Sells up to ' + formatDrugs(dealer.getActualVolume() * 1000) + ' of weed per second');
    $('#hireDealerModal ' + selector + ' .price').html(getStars(dealer.price, 5));
    updateToolTipText($('#hireDealerModal ' + selector + ' .price'), 'Sells each 1g of weed for $' + formatMoney(dealer.getActualPrice()));
    if (getDealerById(dealer.seed) != null) {
        $('#hireDealerModal ' + selector + ' button').attr('disabled', 'disabled');
        $('#hireDealerModal ' + selector + ' button').html('Hired');
    } else {
        $('#hireDealerModal ' + selector + ' button').data("dealer", dealer.seed);
        $('#hireDealerModal ' + selector + ' button').html('Hire dealer');
        $('#hireDealerModal ' + selector + ' button').removeAttr('disabled');
    }
}

function showDealerModal() {

    var seed = (new Date().getTime() / 60000).toFixed();

    createDealerToHire(new Dealer(String(seed)), '.dealer1');
    createDealerToHire(new Dealer(String(seed + 1)), '.dealer2');
    createDealerToHire(new Dealer(String(seed + 2)), '.dealer3');
    if (dealers.length >= 1 + dealerUpgrades) {
        $('#hireDealerModal .dealer-warning').html('You already have the maximum number of dealers working for you. Either fire a dealer or expand your territory to hire another.');
        $('#hireDealerModal button.btn').attr('disabled', 'disabled');
    } else {
        $('#hireDealerModal .dealer-warning').html('');
    }
    $('#hireDealerModal').modal('show');
}

function hireDealer(button) {
    if (dealers.length < 1 + dealerUpgrades) {
        dealers.push(new Dealer(String($(button).data('dealer'))));
        updateDealersUI();
        $('#hireDealerModal').modal('hide');
    } else {
        alert('You already have the maximum number of dealers working for you. Either fire a dealer or expand your territory to hire another.');
    }
}

function toggleNsfwMode() {
    $('.nsfw').toggleClass('hidden');
}

function fireDealer(button) {
    var newDealerArray = [];
    for (var i = 0; i < dealers.length; i++) {
        if (dealers[i].seed != $(button).data('dealer-seed')) {
            newDealerArray.push(dealers[i]);
        }
    }
    dealers = newDealerArray;
    writeToCookie();
    $('div.dealer-content').slideUp(function () {
        $('div.dealer-content').remove();
        $('div.dealer.open').removeClass('open').slideUp(function () {
            updateDealersUI();
        });
    });
    
}

function formatMoney(value) {
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

function formatMoneyHtml(value) {
    return '$' + formatMoney(value);
}

function formatDrugs(value) {
    if (value > 1000)
        return (value / 1000).toFixed(2) + 'kg';
    
    return value.toFixed(2) + "g";
}

$(document).ready(function () {
    readFromCookie();
    updateDealersUI();
    updateUI();
    interval = setInterval(update, 90);
    updateToolTipText($('#buy-tree-btn'), 'Buy a tree, increasing your weed production by ' + formatDrugs(baseWeedPerTree * Math.pow(treeUpgradeWeedMulti, treeUpgrades) * 1000) + ' per second');
    updateToolTipText($('#upgrade-tree-btn'), 'Upgrade your trees, increasing the amount of weed they produce by 20%');
    updateToolTipText($('#hire-dealer-button'), 'Hire a dealer to sell your weed');
    updateToolTipText($('#upgrade-dealer'), 'Expand your territory, allowing you to hire an additional dealer');
});