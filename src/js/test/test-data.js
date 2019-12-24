
var contestant = {
    username: 'contestant',
    password: 'contestant'
}

var admin = {
    username: 'admin',
    password: 'admin'
}

challenges = [
    {
        title: 'The First Challenge',
        category: 'crypto',
        author: 'ad4m',
        body: 'The answer is CECTF{1}',
        solution: 'CECTF{1}'
    },
    {
        title: 'The Second Challenge',
        category: 'reversing',
        author: 'ev3',
        body: 'The answer is CECTF{2}',
        solution: 'CECTF{2}'
    },
    {
        title: 'The Third Challenge',
        category: 'web',
        author:'c4rl0s',
        body: 'The answer is CECTF{3}',
        solution: 'CECTF{3}',
        previousChallenge: 2
    },
    {
        title: 'The Fourth Challenge',
        category: 'binary',
        author:'d4ni3l',
        body: 'The answer is CECTF{4}',
        solution: 'CECTF{4}'
    }
]


module.exports = {
    users: { contestant, admin },
    challenges
}