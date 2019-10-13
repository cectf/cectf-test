
var contestant = {
    username: 'a',
    password: 'b'
}

var admin = {
    username: 'abc',
    password: '123'
}

var challenge1 = {
    title: 'The First Challenge',
    category: 'crypto',
    body: 'Just think really hard!',
    hint: 'CTF{l0l}',
    solution: 'CTF{l0l}'
}

var challenge2 = {
    title: 'The Second Challenge',
    category: 'reversing',
    body: 'Just think really harder!',
    hint: 'no cheatin',
    solution: 'CTF{1337}'
}

module.exports = {
    users: { contestant, admin },
    challenges: [challenge1, challenge2]
}