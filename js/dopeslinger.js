var maleFirstNames = ['Avon', 'Billy', 'Bobby', 'Bret', 'Cedric', 'Charles', 'Clarence', 'Clark', 'Dexter', 'Drexyl', 'Floyd', 'Frank', 'Freddy', 'Jethro', 'Jimmy', 'John', 'Kingston', 'Leeroy', 'Lester', 'Maxwell', 'Michael', 'Mike', 'Randy', 'Reggie', 'Robert', 'Roland', 'Ronnie', 'Roper', 'Ross', 'Sean', 'Snoop', 'Spencer', 'Spike', 'Steve', 'Stringer', 'Stu', 'Tommy', 'Tony', 'William'];
var femaleFirstNames = ['Alicia', 'Amanda', 'Barbara', 'Becky', 'Eve', 'Harriet', 'Jane', 'Jenny', 'Jessica', 'Joanne', 'Jodie', 'Julia', 'June', 'Kate', 'Kim', 'Kimmy', 'Laura', 'Margaret', 'Muriel', 'Nicki', 'Pam', 'Patricia', 'Rachel', 'Rhonda', 'Rose', 'Ruby', 'Samantha', 'Sarah', 'Scarlet', 'Snoop', 'Stacy', 'Stephanie', 'Susie', 'Tanya', 'Toni', 'Victoria'];
var lastNames = ['Adams', 'Barksdale', 'Baxter', 'Bell', 'Braxton', 'Bronson', 'Cray', 'Diamond', 'Ford', 'Franklin', 'French', 'Gentworth', 'George', 'Grey', 'Harrison', 'Hogan', 'Jackson', 'Jenkins', 'Jones', 'Lee', 'Lloyd', 'Marshall', 'Matrix', 'McGrath', 'Moreno', 'Murphy', 'Rhoades', 'Rico', 'Savage', 'Scott', 'Smith', 'Stewart', 'Sulley', 'Templeton', 'Thompson', 'Tull', 'Washington', 'Wilson', 'Worley', 'Young'];

function Dealer(seed) {
    this.seed = seed;
    Math.seedrandom(seed);
    this.volume = Math.random() + 0.5;
    this.price = Math.random() + 0.5;

    this.male = true;
    this.name = maleFirstNames[Math.floor(Math.random() * maleFirstNames.length)] + ' ' + lastNames[Math.floor(Math.random() * lastNames.length)];
    if (Math.random() > 0.7) {
        this.male = false;
        this.name = femaleFirstNames[Math.floor(Math.random() * femaleFirstNames.length)] + ' ' + lastNames[Math.floor(Math.random() * lastNames.length)];
    }
}
Dealer.prototype.getActualVolume = function () {
    return this.volume * dealerConversion;
}
Dealer.prototype.getActualPrice = function () {
    return this.price * dealerMulti * Math.pow(dealerUpgradeMulti, dealerUpgrades);
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

var treePriceMulti = 1.07;

var treeUpgradeBasePrice = 1000;

var treeUpgradePriceMulti = 1.95;

var treeUpgradeWeedMulti = 1.2;

var dealers = [];

var dealerUpgrades = 0;

var dealerUpgradePriceMulti = 2.95;

var dealerUpgradeMulti = 1.15;

var dealerUpgradeBasePrice = 500;
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
            dealers[index] = new Dealer(Number(dealerSeeds[index]));
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
    $('#tree-progress').css('width', Math.min(100, (cash / (treeBasePrice * Math.pow(treePriceMulti, trees)) * 100)).toFixed(2) + '%');
    $('#upgrade-progress').css('width', Math.min(100, (cash / (treeUpgradeBasePrice * Math.pow(treeUpgradePriceMulti, treeUpgrades)) * 100)).toFixed(2) + '%');
    $('#upgrade-dealer-progress').css('width', Math.min(100, (cash / (dealerUpgradeBasePrice * Math.pow(dealerUpgradePriceMulti, dealerUpgrades)) * 100)).toFixed(2) + '%');
    $('#upgrades').html(treeUpgrades);
    $('#dealers').html(dealers.length);
    var weedSold = 0;
    var totalEarned = 0;
    for (var i = 0; i < dealers.length; i++) {
        weedSold += dealers[i].getActualVolume() * 1000;
        totalEarned += dealers[i].getActualVolume() * 1000 * dealers[i].getActualPrice();
    }
    $('#converting').html(formatDrugs(weedSold));
    $('#revenue').html(formatMoneyHtml(totalEarned));
    $('#trees').html(trees);
    $('#dealer-upgrades').html(dealerUpgrades);
    $('#dealer-upgrade-income').html(formatMoneyHtml(dealerMulti * Math.pow(dealerUpgradeMulti, dealerUpgrades)));
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
        $('#dealer-ui').append('<div class="dealer" data-dealer-seed="' + dealers[index].seed + '">' + dealers[index].name + '</div>');
    }
    $('#dealer-ui div.dealer').click(function () {
        var dealerClicked = $(this);
        var dealer = getDealerById(dealerClicked.data('dealer-seed'));
        if (dealerClicked.hasClass('open')) {
            $('div.dealer-content').slideUp(function () {
                $('div.dealer-content').remove();
                $('div.dealer.open').removeClass('open');
            });
            return;
        }
        $('div.dealer.open').removeClass('open');
        dealerClicked.addClass('open');
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

    createDealerToHire(new Dealer(seed), '.dealer1');
    createDealerToHire(new Dealer(seed + 1), '.dealer2');
    createDealerToHire(new Dealer(seed + 2), '.dealer3');

    $('#hireDealerModal').modal('show');
}

function hireDealer(button) {
    console.log($(button).data('dealer'));
    dealers[dealers.length] = new Dealer($(button).data('dealer'));
    updateDealersUI();
    $('#hireDealerModal').modal('hide');
    $('#fire-dealer').removeAttr('disabled');
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

    if (value < 0.01)
        return (value * 1000).toFixed(2) + 'mg'

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
    updateToolTipText($('#fire-dealer'), 'Fire a dealer to reduce your costs by $1 per second');
    updateToolTipText($('#upgrade-dealer'), 'Upgrade your dealers, increasing the amount of money they earn by 15%');
});