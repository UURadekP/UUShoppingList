Všechny listy na routě /lists
Jednotlivý list na routě /list/:id

Momentálně implementovány 2 listy:

git: https://github.com/UURadekP/UUShoppingList

ID: 1, 2

1: radek (owner listu), pepa (member listu)
2: honza (owner listu), david (member listu)

Při vytvoření listu je přihlášný uživatel nastavený jako owner listu.

Přístupy:
const users = [
    { username: 'radek', password: '1234', group: 'owners', id: '1' },
    { username: 'pepa', password: '1234', group: 'registered', id: '2' },
    { username: 'honza', password: '1234', group: 'registered', id: '3' },
    { username: 'david', password: '1234', group: 'registered', id: '4' },
    { username: 'janek', password: '1234', group: 'registered', id: '5' },
    { username: 'guest', password: '', group: 'guest', id: '6' },
];

Každý uživatel je automaticky přihlášen jako guest.