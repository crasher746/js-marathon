//#1
console.log("%cЗадание 1", "color: #FFFF00; background-color: #5394EC; padding: 4px; font-size: 16px;");
const firstRow = 'мама мыла раму';
const secondRow = 'собака друг человека';

function getRow (firstRow, secondRow) {
    let counterFirstRow = 0;
    let counterSecondRow = 0;
    let maxRowLength;

    maxRowLength = (firstRow.length > secondRow.length) ? firstRow.length : secondRow.length;
    console.log('maxRowLength = ', maxRowLength);

    for (let i = 0; i < maxRowLength; i++) {
        if (firstRow.charAt(i) === 'а' || firstRow.charAt(i) === 'a') {
            counterFirstRow++;
        }
        if (secondRow.charAt(i) === 'а' || secondRow.charAt(i) === 'а') {
            counterSecondRow++;
        }
    }
    console.log('lengthFirstRow = ' + counterFirstRow + ' ' + 'lengthSecondRow = ' +  counterSecondRow);
    return (counterFirstRow > counterSecondRow) ? firstRow : secondRow;
}

console.log(getRow(firstRow, secondRow));

//#1*
console.log("%cЗадание 1*", "color: #FFFF00; background-color: #5394EC; padding: 4px; font-size: 16px;");
function getRowWithAnyLetter (firstRow, secondRow, letter) {
    let counterFirstRow = 0;
    let counterSecondRow = 0;
    let maxRowLength;

    maxRowLength = (firstRow.length > secondRow.length) ? firstRow.length : secondRow.length;
    console.log('maxRowLength = ', maxRowLength);

    for (let i = 0; i < maxRowLength; i++) {
        if (firstRow.charAt(i) === letter) {
            counterFirstRow++;
        }
        if (secondRow.charAt(i) === letter) {
            counterSecondRow++;
        }
    }
    console.log('lengthFirstRow = ' + counterFirstRow + ' ' + 'lengthSecondRow = ' +  counterSecondRow);
    return (counterFirstRow > counterSecondRow) ? firstRow : secondRow;
}
let userInput = prompt('Enter a letter:');
console.log(getRowWithAnyLetter(firstRow, secondRow, userInput));

// #2
console.log("%cЗадание 2", "color: #FFFF00; background-color: #5394EC; padding: 4px; font-size: 16px;");
const phoneNumber = '+71234567890';

function formattedPhone (phone) {
    let result = '';
    for (let i = 0; i < phone.length; i++) {
        result += phone.charAt(i);
        if (phone.charAt(i) === '7' && i === 1) result += ' (';
        if (i === 4) result += ') ';
        if (i === 7 || i === 9) result += '-';
    }
    return result;
}

console.log(formattedPhone(phoneNumber));

// #2*
console.log("%cЗадание 2*", "color: #FFFF00; background-color: #5394EC; padding: 4px; font-size: 16px;");
let userPhone = prompt('Input your phone number');

function formattedPhoneUser (phone) {
    let result = '';
    if ((phone != '+79211234567') && (phone != '79211234567')
        && (phone != '89211234567') && (phone != '9211234567')) {
        alert('Bad format');
        return 'Bad format';
    }
    switch (phone.charAt(0)) {
        case '+':
            for (let i = 0; i < phone.length; i++) {
                result += phone.charAt(i);
                if (phone.charAt(i) === '7' && i === 1) result += ' (';
                if (i === 4) result += ') ';
                if (i === 7 || i === 9) result += '-';
            }
            break;
        case '7':
            for (let i = 0; i < phone.length; i++) {
                if (phone.charAt(i) === '7' && i === 0) result += '+';
                result += phone.charAt(i);
                if (phone.charAt(i) === '7' && i === 0) result += ' (';
                if (i === 3) result += ') ';
                if (i === 6 || i === 8) result += '-';
            }
            break;
        case '8':
            for (let i = 0; i < phone.length; i++) {
                result += phone.charAt(i);
                if (phone.charAt(i) === '8' && i === 0) result = '+7 (';
                if (i === 3) result += ') ';
                if (i === 6 || i === 8) result += '-';
            }
            break;
        case '9':
            for (let i = 0; i < phone.length; i++) {
                if (phone.charAt(i) === '9' && i === 0) result += '+7 (';
                result += phone.charAt(i);
                if (i === 2) result += ') ';
                if (i === 5 || i === 7) result += '-';
            }
            break;
        default:
            break;
    }

    return result;
}

console.log(formattedPhoneUser(userPhone));