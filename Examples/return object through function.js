function makeGamePlayer(name, totalScore, gamesPlayed) {
    // Define desired object
    var obj = {
        name: name,
        totalScore: totalScore,
        gamesPlayed: gamesPlayed,
    };
    // Return it
    return obj;
}
var player = makeGamePlayer('John Smith', 15, 3);
console.log(player);

if (player.totalScore === 15) {
    console.log('true');
} else {
    console.log('false');
}{}
