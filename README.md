Spuštění aplikace probíha na route /list/:id 

Momentálně implementovány 2 listy:

ID: abc, def

abc: radek (owner listu), pepa (member listu)
def: honza (owner listu), david (member listu)

Přístupy:
const users = [
    { username: 'radek', password: '1234', group: 'owners', id: '1' },
    { username: 'pepa', password: '1234', group: 'registered', id: '2' },
    { username: 'honza', password: '1234', group: 'registered', id: '3' },
    { username: 'david', password: '1234', group: 'registered', id: '4' },
    { username: 'janek', password: '1234', group: 'registered', id: '5' },
    { username: 'guest', password: '', group: 'guest', id: '6' },
];


user janek němá žádné přístupy, je tu jen kvůli testování funkčnosti přidání usera do listu.

Každý uživatel je automaticky přihlášen jako guest.